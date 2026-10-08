import { LitElement, css, html, nothing } from "lit";
import { fire } from "../core/fire";
import type { CardType, GlideCardConfig, HomeAssistant } from "../core/types";
import { listThemes } from "../themes";

const TYPES: { id: CardType; icon: string; label: string }[] = [
  { id: "button", icon: "mdi:gesture-tap-button", label: "Button" },
  { id: "popup", icon: "mdi:card-outline", label: "Pop-up" },
  { id: "nav", icon: "mdi:dock-bottom", label: "Nav bar" },
  { id: "climate", icon: "mdi:thermostat", label: "Climate" },
  { id: "media", icon: "mdi:play-circle-outline", label: "Media" },
  { id: "chips", icon: "mdi:label-multiple-outline", label: "Chips" },
  { id: "title", icon: "mdi:format-title", label: "Title" },
];
const ACCENTS = ["#ff9f43", "#d4ff00", "#006a60", "#4aa8ff", "#a78bfa", "#ff5c8a", "#34c759", "#ffd60a"];

const actions = {
  type: "expandable",
  title: "Interactions",
  icon: "mdi:gesture-tap",
  schema: [
    { name: "tap_action", selector: { ui_action: {} } },
    { name: "hold_action", selector: { ui_action: {} } },
    { name: "double_tap_action", selector: { ui_action: {} } },
  ],
};

const ALIGN = { select: { mode: "dropdown", options: [{ value: "center", label: "Center" }, { value: "start", label: "Start" }] } };

const SCHEMAS: Record<CardType, unknown[]> = {
  chips: [
    {
      name: "chips",
      selector: {
        object: {
          multiple: true,
          label_field: "name",
          fields: {
            entity: { selector: { entity: {} } },
            name: { selector: { text: {} } },
            icon: { selector: { icon: {} } },
            color: { selector: { ui_color: {} } },
            attribute: { selector: { text: {} } },
            tap_action: { selector: { ui_action: {} } },
          },
        },
      },
    },
    { name: "align", selector: ALIGN },
  ],
  title: [
    { name: "title", selector: { text: {} } },
    { name: "subtitle", selector: { text: {} } },
    { type: "grid", name: "", schema: [{ name: "icon", selector: { icon: {} } }, { name: "align", selector: ALIGN }] },
  ],
  button: [
    { name: "entity", required: true, selector: { entity: {} } },
    {
      type: "grid",
      name: "",
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
        { name: "layout", selector: { select: { mode: "dropdown", options: [{ value: "tile", label: "Tile" }, { value: "pill", label: "Pill row" }] } } },
        { name: "slider", default: true, selector: { boolean: {} } },
        { name: "color", selector: { ui_color: {} } },
      ],
    },
    actions,
  ],
  popup: [
    { name: "hash", required: true, selector: { text: {} } },
    {
      type: "grid",
      name: "",
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "icon", selector: { icon: {} } },
      ],
    },
    { name: "entity", selector: { entity: {} } },
  ],
  nav: [
    {
      name: "items",
      selector: {
        object: {
          multiple: true,
          label_field: "name",
          fields: {
            name: { required: true, selector: { text: {} } },
            icon: { required: true, selector: { icon: {} } },
            navigation_path: { required: true, selector: { text: {} } },
            entity: { selector: { entity: {} } },
            pinned: { selector: { boolean: {} } },
          },
        },
      },
    },
  ],
  climate: [
    { name: "entity", required: true, selector: { entity: { filter: { domain: "climate" } } } },
    { name: "name", selector: { text: {} } },
  ],
  media: [
    { name: "entity", required: true, selector: { entity: { filter: { domain: "media_player" } } } },
    { name: "name", selector: { text: {} } },
  ],
};

const LABELS: Record<string, string> = {
  hash: "Hash (e.g. #living-room)",
  slider: "Swipe to adjust (brightness / position)",
  layout: "Layout (empty = theme default)",
  color: "Colour (empty = by entity type)",
  items: "Nav items (path or #popup-hash)",
  entity: "Entity",
};

/** Loads HA's lazy form components (ha-form etc.) by asking a built-in card for its editor. */
async function ensureHaForm() {
  if (customElements.get("ha-form")) return;
  const helpers = await (window as any).loadCardHelpers?.();
  const card = await helpers?.createCardElement({ type: "entities", entities: [] });
  await card?.constructor?.getConfigElement?.();
}

export class GlideCardEditor extends LitElement {
  static properties = { hass: { attribute: false }, config: { state: true }, ready: { state: true } };
  hass?: HomeAssistant;
  config!: GlideCardConfig;
  ready = false;

  setConfig(config: GlideCardConfig) {
    this.config = { ...config, card_type: config.card_type ?? "button" } as GlideCardConfig;
  }

  connectedCallback() {
    super.connectedCallback();
    ensureHaForm().finally(() => (this.ready = true));
  }

  private update_(patch: Record<string, unknown>) {
    const next: Record<string, unknown> = { ...this.config, ...patch };
    for (const [k, v] of Object.entries(next)) if (v === "" || v === undefined || v === null) delete next[k];
    this.config = next as unknown as GlideCardConfig;
    fire(this, "config-changed", { config: this.config });
  }

  private setType(type: CardType) {
    if (type === this.config.card_type) return;
    // Keep only the shared style fields when switching type.
    const { type: t, theme, mode, accent } = this.config;
    const base: Record<string, unknown> = { type: t, card_type: type, theme, mode, accent };
    if (type === "popup") Object.assign(base, { hash: "#room", title: "Room", cards: [] });
    if (type === "chips") Object.assign(base, { chips: [] });
    if (type === "title") Object.assign(base, { title: "Home" });
    if (type === "nav") Object.assign(base, { items: [{ name: "Home", icon: "mdi:home", navigation_path: "#home" }] });
    this.config = {} as GlideCardConfig;
    this.update_(base);
  }

  protected render() {
    if (!this.config) return nothing;
    const c = this.config;
    const themes = listThemes();
    return html`
      <div class="section">
        <div class="label">Card type</div>
        <div class="types">
          ${TYPES.map(
            (t) => html`<button class=${c.card_type === t.id ? "sel" : ""} @click=${() => this.setType(t.id)}>
              <ha-icon .icon=${t.icon}></ha-icon><span>${t.label}</span>
            </button>`,
          )}
        </div>
      </div>

      <div class="section">
        <div class="label">Design</div>
        <div class="themes">
          <button class="theme ${!c.theme ? "sel" : ""}" @click=${() => this.update_({ theme: undefined })}>
            <div class="swatch auto"><ha-icon icon="mdi:auto-fix" .icon=${"mdi:auto-fix"}></ha-icon></div>
            <span>Dashboard default</span>
          </button>
          ${themes.map(
            (t) => html`<button class="theme ${c.theme === t.id ? "sel" : ""}" title=${t.description ?? ""} @click=${() => this.update_({ theme: t.id })}>
              <div class="swatch" style="background:${t.preview.background}">
                <i style="background:${t.preview.surface}"></i><b style="background:${t.preview.accent}"></b>
              </div>
              <span>${t.name}</span>
            </button>`,
          )}
        </div>
        <div class="row">
          <div class="seg">
            ${(["auto", "dark", "light"] as const).map(
              (m) => html`<button class=${(c.mode ?? "auto") === m ? "sel" : ""} @click=${() => this.update_({ mode: m === "auto" ? undefined : m })}>${m}</button>`,
            )}
          </div>
          <div class="accents">
            <button class="dot none ${!c.accent ? "sel" : ""}" title="Theme accent" @click=${() => this.update_({ accent: undefined })}></button>
            ${ACCENTS.map(
              (a) => html`<button class="dot ${c.accent === a ? "sel" : ""}" style="background:${a}" title=${a} @click=${() => this.update_({ accent: a })}></button>`,
            )}
            <label class="dot custom" title="Custom color">
              <input type="color" .value=${c.accent ?? "#ff9f43"} @input=${(e: Event) => this.update_({ accent: (e.target as HTMLInputElement).value })} />
            </label>
          </div>
        </div>
      </div>

      ${this.ready
        ? html`<ha-form
            .hass=${this.hass}
            .data=${c}
            .schema=${SCHEMAS[c.card_type]}
            .computeLabel=${(s: { name: string }) => LABELS[s.name]}
            @value-changed=${(e: CustomEvent) => {
              e.stopPropagation();
              this.update_(e.detail.value);
            }}
          ></ha-form>`
        : nothing}
      ${c.card_type === "popup" && this.ready
        ? html`<div class="section">
            <div class="label">Cards inside the pop-up (YAML)</div>
            <ha-yaml-editor
              .hass=${this.hass}
              .defaultValue=${(c as { cards?: unknown[] }).cards ?? []}
              @value-changed=${(e: CustomEvent) => {
                e.stopPropagation();
                if (e.detail.isValid !== false && Array.isArray(e.detail.value)) this.update_({ cards: e.detail.value });
              }}
            ></ha-yaml-editor>
          </div>`
        : nothing}
    `;
  }

  static styles = css`
    :host { display: block; }
    .section { margin-bottom: 16px; }
    .label { font-weight: 500; margin-bottom: 8px; color: var(--primary-text-color); }
    button { font: inherit; cursor: pointer; color: var(--primary-text-color); }
    .types { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: 6px; }
    .types button, .theme {
      display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 4px;
      border-radius: 12px; border: 1px solid var(--divider-color); background: var(--card-background-color); font-size: 12px;
    }
    .sel { border-color: var(--primary-color) !important; box-shadow: 0 0 0 1px var(--primary-color); }
    .themes { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 8px; }
    .swatch {
      position: relative; width: 100%; height: 52px; border-radius: 8px; overflow: hidden; display: grid; place-items: center;
    }
    .swatch.auto { background: var(--secondary-background-color); color: var(--secondary-text-color); }
    .swatch i { position: absolute; inset: 10px 30% 10px 10px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2); }
    .swatch b { position: absolute; right: 10px; bottom: 10px; width: 16px; height: 16px; border-radius: 50%; }
    .row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 10px; }
    .seg { display: flex; border: 1px solid var(--divider-color); border-radius: 999px; overflow: hidden; }
    .seg button { border: 0; background: none; padding: 6px 12px; text-transform: capitalize; }
    .seg button.sel { background: var(--primary-color); color: var(--text-primary-color, #fff); box-shadow: none; }
    .accents { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    .dot { width: 24px; height: 24px; border-radius: 50%; border: 2px solid transparent; padding: 0; position: relative; }
    .dot.sel { border-color: var(--primary-text-color); box-shadow: none; }
    .dot.none { background: conic-gradient(#ff9f43, #d4ff00, #006a60, #ff9f43); opacity: 0.6; }
    .dot.custom { overflow: hidden; background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red); cursor: pointer; }
    .dot.custom input { opacity: 0; width: 100%; height: 100%; cursor: pointer; }
  `;
}

customElements.define("glide-card-editor", GlideCardEditor);
