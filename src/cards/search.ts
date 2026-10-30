import { css, html, nothing, type PropertyValues } from "lit";
import { GlideBase, surface } from "../core/base-card";
import { t } from "../core/i18n";
import {
  collectDashboard, collectExtras, dashboardOf, frequent, rank,
  type ResultGroup, type SearchEntry, type SearchLabels,
} from "../core/search-index";
import type { HomeAssistant, PopupCardConfig, SearchCardConfig } from "../core/types";
import { usageOf } from "../core/usage";
import { GlidePopup } from "./popup";

type Cfg = Record<string, any>;
const DEFAULT_HASH = "#search";
const DEBOUNCE_MS = 80;
const REFETCH_MS = 5 * 60_000;

/** Search cards on the page; the open sheet reads the dashboard config through whichever is attached. */
const placeholders = new Set<HTMLElement>();

/** The dashboard config, from the nearest ancestor that holds HA's `lovelace` object. */
function lovelaceOf(el: Node): Cfg | undefined {
  let n: any = el;
  while (n) {
    const cfg = n.lovelace?.config;
    if (cfg?.views) return cfg;
    n = n.parentNode ?? n.host;
  }
  return undefined;
}

function liveLovelace(): Cfg | undefined {
  for (const el of placeholders) {
    const cfg = el.isConnected ? lovelaceOf(el) : undefined;
    if (cfg) return cfg;
  }
  return undefined;
}

const popupFor = (c: SearchCardConfig, hass?: HomeAssistant): PopupCardConfig => ({
  type: c.type,
  card_type: "popup",
  hash: c.hash ?? DEFAULT_HASH,
  title: c.title ?? t(hass, "search"),
  icon: "mdi:magnify",
  theme: c.theme,
  mode: c.mode,
  size: c.size,
  tap_animation: c.tap_animation,
  lite: c.lite,
  cards: [{ ...c, type: "custom:glide-search-panel" }],
});

/**
 * `card_type: search`: a pop-up (invisible on the dashboard) whose sheet searches the dashboard's own
 * buttons, places and other entities. Open it with a nav item or button going to `#search`.
 */
export class GlideSearch extends GlidePopup {
  private raw?: SearchCardConfig;
  private titleLang?: string;

  setConfig(config: any) {
    this.raw = config as SearchCardConfig;
    this.titleLang = this.hass?.language;
    super.setConfig(popupFor(this.raw, this.hass));
  }

  protected willUpdate(changed: PropertyValues<this>) {
    // The default title is in the user's language, known once hass arrives.
    if (this.raw && this.hass && this.hass.language !== this.titleLang) this.setConfig(this.raw);
    super.willUpdate(changed);
  }

  connectedCallback() {
    super.connectedCallback();
    placeholders.add(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    setTimeout(() => !this.isConnected && placeholders.delete(this), 1000);
  }
}

customElements.define("glide-search", GlideSearch);

/** The sheet's content: the search field and the results, built from the dashboard's own card configs. */
export class GlideSearchPanel extends GlideBase<SearchCardConfig> {
  static properties = { ...GlideBase.properties, query: { state: true } };
  protected readonly cardType = "popup" as const;
  query = "";
  private shown = "";
  private timer?: ReturnType<typeof setTimeout>;
  private helpers?: { createCardElement(c: Cfg): HTMLElement & Record<string, any> };
  private els = new Map<string, HTMLElement & Record<string, any>>();
  private index: { lovelace?: Cfg; states?: number; entries: SearchEntry[] } = { entries: [] };
  /** Fetched over the websocket when no dashboard element is around (the card playground, for one). */
  private fetched?: Cfg;
  private fetchedAt = 0;

  setConfig(config: SearchCardConfig) {
    if (config.source !== this.config?.source) (this.fetched = undefined), (this.fetchedAt = 0);
    super.setConfig(config);
    this.index = { entries: [] };
    this.toggleAttribute("inline", !!config.inline);
  }

  connectedCallback() {
    super.connectedCallback();
    for (const ev of ["popstate", "hashchange", "glide-hash", "location-changed"]) window.addEventListener(ev, this.onRoute);
    this.onRoute();
    // Inline: ready to type on a desktop; phones and tablets wait for a tap so the keyboard stays down.
    if (this.config?.inline && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setTimeout(() => this.renderRoot.querySelector("input")?.focus({ preventScroll: true }), 300);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const ev of ["popstate", "hashchange", "glide-hash", "location-changed"]) window.removeEventListener(ev, this.onRoute);
  }

  private get hash() {
    return this.config?.hash ?? DEFAULT_HASH;
  }

  private onRoute = () => {
    if (this.config?.inline || decodeURIComponent(location.hash) !== this.hash) return;
    this.index.lovelace = undefined; // pick up dashboard edits
    this.requestUpdate();
    // After the sheet starts sliding in; typing replaces the last search.
    setTimeout(() => {
      const input = this.renderRoot.querySelector("input");
      input?.focus({ preventScroll: true });
      input?.select();
    }, 60);
  };

  private get labels(): SearchLabels {
    return { places: t(this.hass, "search_places"), extras: t(this.hass, "search_extras"), sensors: t(this.hass, "search_sensors") };
  }

  private entries(): SearchEntry[] {
    const hass = this.hass;
    if (!hass) return [];
    const here = dashboardOf(location.pathname);
    const source = this.config.source;
    const remote = !!source && source !== here;
    const lovelace = remote ? this.fetched : (this.config.inline ? lovelaceOf(this) : undefined) ?? liveLovelace() ?? this.fetched;
    // Another dashboard's config is fetched, and fetched again when it's older than REFETCH_MS (edits there).
    const stale = remote ? Date.now() - this.fetchedAt > REFETCH_MS : !lovelace && !this.fetched;
    if (stale && hass.callWS) {
      const url_path = source ?? here;
      this.fetchedAt = Date.now();
      hass
        .callWS<Cfg>({ type: "lovelace/config", url_path: url_path === "lovelace" ? null : url_path })
        .then((cfg) => ((this.fetched = cfg), this.requestUpdate()))
        .catch(() => (this.fetchedAt = 0));
    }
    const count = Object.keys(hass.states).length;
    if (this.index.lovelace === lovelace && this.index.states === count && this.index.entries.length) return this.index.entries;
    const cards = collectDashboard(lovelace, source ?? here, hass, { remote });
    const known = new Set(cards.map((e) => e.config.entity).filter(Boolean));
    const extras = collectExtras(hass, known, {
      domains: this.config.extra_domains,
      sensors: this.config.include_sensors,
      exclude: this.config.exclude,
      labels: this.labels,
    });
    this.index = { lovelace, states: count, entries: [...cards, ...extras] };
    return this.index.entries;
  }

  protected shouldUpdate(changed: PropertyValues<this>) {
    if (changed.size === 1 && changed.has("hass") && this.hass) {
      for (const el of this.els.values()) el.hass = this.hass;
      const old = changed.get("hass") as HomeAssistant | undefined;
      return !old || old.language !== this.hass.language || old.themes?.darkMode !== this.hass.themes?.darkMode;
    }
    return super.shouldUpdate(changed);
  }

  private onInput(e: Event) {
    this.query = (e.target as HTMLInputElement).value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => ((this.shown = this.query), this.requestUpdate()), DEBOUNCE_MS);
  }

  private clear() {
    this.query = this.shown = "";
    const input = this.renderRoot.querySelector("input");
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  /** One card element per result, kept between searches so typing doesn't rebuild them. */
  private card(e: SearchEntry) {
    const id = `${e.kind}|${e.key}`;
    let el = this.els.get(id);
    if (!el && this.helpers) {
      const c = this.config;
      const conf = e.config.type === "custom:glide-card"
        ? { ...e.config, theme: e.config.theme ?? c.theme, tap_animation: e.config.tap_animation ?? c.tap_animation, size: e.config.size ?? c.size }
        : e.config;
      el = this.helpers.createCardElement(conf);
      const g = el.getGridOptions?.() ?? {};
      const cols = typeof g.columns === "number" ? g.columns : 12;
      el.style.setProperty("--cols", String(e.kind === "place" ? 6 : cols));
      if (typeof g.rows === "number") el.style.setProperty("--rows", String(g.rows));
      this.els.set(id, el);
    }
    if (el && this.hass) el.hass = this.hass;
    return el;
  }

  private group(g: ResultGroup) {
    return html`
      <section>
        ${g.title ? html`<div class="gtitle">${g.title}</div>` : nothing}
        <div class="grid">${g.entries.map((e) => this.card(e))}</div>
      </section>
    `;
  }

  protected render() {
    if (!this.config || !this.hass) return nothing;
    if (!this.helpers) {
      (window as any).loadCardHelpers?.().then((h: any) => ((this.helpers = h), this.requestUpdate()));
    }
    const entries = this.entries();
    const q = this.shown.trim();
    let body;
    if (!q) {
      const inline = !!this.config.inline;
      const count = this.config.frequent ?? (inline ? 0 : 8);
      const top = count === 0 ? [] : frequent(entries, (k) => usageOf(k), count);
      body = top.length
        ? this.group({ title: t(this.hass, "search_frequent"), kind: "card", entries: top })
        : inline ? nothing : html`<div class="note">${t(this.hass, "search_hint")}</div>`;
    } else {
      const { groups, more } = rank(entries, q, (k) => usageOf(k), this.labels);
      body = groups.length
        ? html`${groups.map((g) => this.group(g))}${more ? html`<div class="note">+${more} ${t(this.hass, "search_more")}</div>` : nothing}`
        : html`<div class="note">${t(this.hass, "search_none")} “${q}”</div>`;
    }
    return html`
      <div class="bar surface">
        <ha-icon icon="mdi:magnify" .icon=${"mdi:magnify"}></ha-icon>
        <input
          type="search"
          dir="auto"
          enterkeyhint="search"
          autocomplete="off"
          spellcheck="false"
          .value=${this.query}
          placeholder=${this.config.placeholder ?? t(this.hass, "search_placeholder")}
          @input=${this.onInput}
          @keydown=${(e: KeyboardEvent) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        />
        ${this.query
          ? html`<button class="clear" aria-label=${t(this.hass, "clear")} @click=${() => this.clear()}>
              <ha-icon icon="mdi:close-circle" .icon=${"mdi:close-circle"}></ha-icon>
            </button>`
          : nothing}
      </div>
      <div class="results">${body}</div>
    `;
  }

  getGridOptions() {
    return { columns: 12 };
  }

  static styles = [
    surface,
    css`
      :host { display: block; }
      .bar {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 14px;
        height: 48px;
        border-radius: var(--gc-radius-control, 14px);
        background: var(--gc-sheet-bg, var(--gc-surface));
        color: var(--gc-text-dim);
      }
      input {
        flex: 1;
        min-width: 0;
        height: 100%;
        border: 0;
        outline: none;
        background: none;
        font: inherit;
        font-size: 17px;
        color: var(--gc-text);
      }
      input::placeholder { color: var(--gc-text-dim); }
      input::-webkit-search-cancel-button { display: none; }
      .clear {
        all: unset;
        display: grid;
        place-items: center;
        cursor: pointer;
        color: var(--gc-text-dim);
      }
      .results { padding-top: 6px; }
      :host([inline]) .bar {
        position: static;
        max-width: 640px;
        margin: 0 auto;
        height: 60px;
        padding: 0 20px;
        border-radius: 999px;
      }
      :host([inline]) .bar ha-icon { --mdc-icon-size: 26px; }
      :host([inline]) input { font-size: 20px; }
      :host([inline]) .results { padding-top: 14px; }
      :host([inline]) .results:empty { display: none; }
      section { margin-top: 10px; }
      .gtitle {
        font-size: 13px;
        font-weight: 600;
        color: var(--gc-text-dim);
        padding: 4px 4px 6px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-auto-rows: minmax(56px, auto);
        gap: var(--gc-gap, 8px);
      }
      .grid > * { grid-column: span var(--cols, 6); grid-row: span var(--rows, 1); min-width: 0; }
      .note {
        padding: 28px 8px;
        text-align: center;
        color: var(--gc-text-dim);
        font-size: 14px;
      }
    `,
  ];
}

customElements.define("glide-search-panel", GlideSearchPanel);
