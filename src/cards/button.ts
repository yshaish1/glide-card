import { css, html, nothing, type PropertyValues } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { runAction } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { cssColor, domainColor, domainOf, entityIcon, entityName, isActive, isUnavailable, onTextColor, sliderFor } from "../core/entity";
import { haptic } from "../core/fire";
import { attachGestures } from "../core/gestures";
import { isScene, sceneSvg } from "./cover-scenes";
import { formatState } from "../core/i18n";
import { TemplateController } from "../core/templates";
import type { ActionConfig, ButtonCardConfig } from "../core/types";

/** A rendered icon template only counts when it looks like an icon ("mdi:..."), e.g. not "unknown". */
const iconOrUndefined = (v?: string) => (v && /^[\w-]+:[\w-]+$/.test(v.trim()) ? v.trim() : undefined);

const STATELESS = new Set(["scene", "script", "button", "input_button"]);
const TOGGLEABLE = new Set(["light", "switch", "fan", "input_boolean", "cover", "lock", "scene", "script", "button", "input_button", "siren", "humidifier"]);

export class GlideButton extends GlideBase<ButtonCardConfig> {
  static properties = { ...GlideBase.properties, dragValue: { state: true }, templateRev: { state: true } };
  protected readonly cardType = "button" as const;
  dragValue?: number;
  /** Bumped per template result, so the update isn't dropped by the hass-only update filter. */
  templateRev = 0;
  private detach?: () => void;
  private tpl = new TemplateController(
    this,
    () => {
      const c = this.config ?? {};
      return { name: c.name, secondary: c.secondary, badge: c.badge, icon: c.icon, color: c.color };
    },
    () => ({ hass: this.hass, config: this.config as unknown as Record<string, unknown>, entity: this.config?.entity }),
    () => this.templateRev++,
  );

  get layout() {
    return this.config.layout ?? this.theme.defaults?.buttonLayout ?? "tile";
  }

  /** Grid rows: a pill is always one; a slim tile lays out in one row too. */
  private get rows() {
    return this.layout === "pill" || this.size === "slim" ? 1 : 2;
  }

  getGridOptions() {
    return this.layout === "pill"
      ? { columns: 12, rows: 1, min_columns: 6 }
      : { columns: 6, rows: this.rows, min_columns: 3, min_rows: this.rows };
  }

  getCardSize() {
    return this.rows;
  }

  private action(kind: "tap" | "hold" | "double_tap"): ActionConfig | undefined {
    const cfg = this.config[`${kind}_action`];
    if (cfg) return cfg;
    const id = this.config.entity;
    if (kind === "tap") return { action: id && TOGGLEABLE.has(domainOf(id)) ? "toggle" : "more-info" };
    if (kind === "hold") return { action: "more-info" };
  }

  protected willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);
    // Drop the optimistic drag value once HA reports the new state.
    if (changed.has("hass") && this.dragValue !== undefined && changed.get("hass")) {
      const id = this.config.entity!;
      if ((changed.get("hass") as any).states[id] !== this.hass?.states[id]) this.dragValue = undefined;
    }
  }

  protected firstUpdated() {
    const el = this.renderRoot.querySelector<HTMLElement>(".surface")!;
    let lastStep = -1;
    this.detach = attachGestures(el, {
      axis: () => (this.isCover && !this.isCurtain ? "y" : "x"),
      arm: () => haptic("selection"),
      tap: (p) => {
        this.playTapFx(el, p, { icon: el.querySelector(".icon"), badge: el.querySelector(".badge") });
        if (this.hass) runAction(this, this.hass, this.action("tap"), this.config.entity);
      },
      hold: () => this.hass && runAction(this, this.hass, this.action("hold"), this.config.entity),
      doubleTap: this.config.double_tap_action
        ? (p) => {
            this.playTapFx(el, p, { icon: el.querySelector(".icon"), badge: el.querySelector(".badge") });
            if (this.hass) runAction(this, this.hass, this.action("double_tap"), this.config.entity);
          }
        : undefined,
      dragStart: () => {
        const spec = this.slider;
        lastStep = -1;
        return spec ? spec.value : NaN;
      },
      drag: (v) => {
        if (!this.slider) return;
        this.dragValue = v;
        const step = Math.floor(v / 10);
        if (step !== lastStep) { lastStep = step; haptic("selection"); }
      },
      dragEnd: (v) => {
        const spec = this.slider;
        if (spec && this.hass) spec.set(this.hass, v);
      },
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.detach?.();
    this.detach = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && !this.detach) this.firstUpdated();
  }

  private get slider() {
    return this.config.slider === false ? undefined : sliderFor(this.stateOf(this.config.entity));
  }

  /** Covers with a position get the blind look: fill rises from the bottom, dragged vertically. */
  private get isCover() {
    return domainOf(this.config.entity) === "cover" && !!this.slider;
  }

  /** Curtains part from the centre and drag sideways: HA's `curtain` device class, or `cover_style` to force either look. */
  private get isCurtain() {
    if (!this.isCover) return false;
    const style = this.config.cover_style;
    return style === "curtain" || (style !== "blind" && this.stateOf(this.config.entity)?.attributes.device_class === "curtain");
  }

  /** Covers look like a window: an outdoor view (built-in scene or the user's photo) behind a blind; `view: color` keeps the plain fill. */
  private get view(): "scene" | "image" | undefined {
    if (!this.isCover) return undefined;
    const v = this.config.view;
    if (v === "color") return undefined;
    if (v === undefined && this.config.view_image) return "image";
    return "scene";
  }

  protected watched() {
    // Day/night of the cover view follows the sun.
    return this.view ? [...super.watched(), "sun.sun"] : super.watched();
  }

  private renderView() {
    const night = this.hass?.states["sun.sun"]?.state === "below_horizon";
    const scene = isScene(this.config.view) ? this.config.view : "garden";
    return html`
      <div class="view ${night ? "night" : "day"} ${this.view === "image" ? "photo" : scene}">
        ${this.view === "image" ? html`<img src=${this.config.view_image!} alt="" draggable="false" />` : sceneSvg(scene, night)}
      </div>
      <div class="scrim"></div>
    `;
  }

  protected render() {
    const s = this.stateOf(this.config.entity);
    const slider = this.slider;
    const value = this.dragValue ?? slider?.value;
    const cover = this.isCover;
    const view = this.view;
    const curtain = this.isCurtain;
    // Covers stay neutral like the mockup; the fill alone shows how open they are.
    const on = !cover && (this.dragValue !== undefined ? this.dragValue > 0 : isActive(s));
    const stateText = this.hass && this.config.entity && s ? formatState(this.hass, this.config.entity) : "";
    const stateless = STATELESS.has(domainOf(this.config.entity));
    const name = entityName(s, this.tpl.get("name") || undefined);
    // The badge carries the state; the meta line only adds what the badge can't (e.g. brightness).
    // Covers flip it: the badge shows the position and the meta line spells it out ("40% Open").
    // A `badge` / `secondary` (text or template) replaces either.
    const customBadge = this.config.badge !== undefined ? this.tpl.get("badge") ?? "" : undefined;
    const badge = customBadge ?? (stateless ? "" : cover ? `${value}%` : stateText);
    const meta = this.config.secondary !== undefined
      ? this.tpl.get("secondary") ?? ""
      : cover ? `${value}% ${stateText}` : slider && on && value !== undefined ? `${value}%` : "";
    // In the window look the fill is the blind, so it covers what is closed.
    const fill = view && !curtain ? 100 - (value ?? 0) : slider ? value ?? 0 : on ? 100 : 0;
    const color = this.tpl.get("color")?.trim();
    return html`
      <div
        class="surface ${this.layout} ${on ? "on" : ""} ${cover ? "cover" : ""} ${view ? "window" : ""} ${curtain ? "curtain" : ""} ${this.config.fill === false ? "nofill" : ""} ${isUnavailable(s) && this.config.entity ? "unavailable" : ""}"
        style=${styleMap({ "--domain": cssColor(color) ?? domainColor(s), "--gc-icon-on": onTextColor(color), "--fill": `${fill}%`,
          "--closed": `${(100 - (value ?? 0)) / 100}`,
          "--gc-fabric": curtain ? cssColor(color) : undefined,
        })}
        role="button"
        tabindex="0"
        aria-label=${name}
      >
        ${view ? this.renderView() : nothing}
        ${view && curtain
          ? html`<div class="rod"></div>${["start", "end"].map((side) => html`<div class="drape ${side} ${this.dragValue !== undefined ? "dragging" : ""}"></div>`)}`
          : html`<div class="fill ${this.dragValue !== undefined ? "dragging" : ""}"></div>`}
        <div class="icon"><ha-icon .icon=${entityIcon(s, iconOrUndefined(this.tpl.get("icon")))}></ha-icon></div>
        <div class="text">
          <div class="name">${name}</div>
          ${meta ? html`<div class="meta">${meta}</div>` : nothing}
        </div>
        ${badge ? html`<div class="badge meta">${badge}</div>` : nothing}
      </div>
    `;
  }

  static styles = [
    surface,
    css`
      :host { height: 100%; container-type: inline-size; }
      .surface {
        height: 100%;
        cursor: pointer;
        user-select: none;
        touch-action: pan-y;
        transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.2), background-color 0.3s;
      }
      .surface:active { transform: scale(0.97); }
      .surface:focus-visible { outline: 2px solid var(--gc-accent); outline-offset: 2px; }
      .surface.on { background-color: var(--gc-surface-on); }
      .surface.unavailable { opacity: 0.5; }
      .fill {
        position: absolute;
        inset-block: 0;
        inset-inline-start: 0;
        width: var(--fill);
        background: color-mix(in srgb, var(--domain) var(--gc-fill-strength), transparent);
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
        pointer-events: none;
      }
      .fill.dragging { transition: none; }
      .nofill .fill { display: none; }
      .cover .fill {
        inset-block: auto 0;
        inset-inline: 0;
        width: auto;
        height: var(--fill);
        border-top: 1.5px solid color-mix(in srgb, var(--domain) 35%, transparent);
        border-start-start-radius: 6px;
        border-start-end-radius: 6px;
        box-shadow: none;
        transition: height 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
      }
      .cover .fill.dragging { transition: none; }
      .cover .badge {
        background: color-mix(in srgb, var(--gc-text) 7%, transparent);
        border-color: transparent;
        color: var(--gc-text);
      }
      .cover .meta:not(.badge) { color: var(--gc-text-dim); }

      /* Window: the outdoor view sits behind a blind that drops from the top. */
      .view, .scrim { position: absolute; inset: 0; pointer-events: none; }
      .view svg, .view img { display: block; width: 100%; height: 100%; object-fit: cover; }
      .view.day { background: linear-gradient(to bottom, #7cc0ef, #cfe9fb 75%); }
      .view.night { background: linear-gradient(to bottom, #0d1630, #23305a 80%); }
      .view.photo.night img { filter: brightness(0.6) saturate(0.8); }
      .view .sun { fill: #ffd65a; }
      .view .halo { fill: #fff2b0; opacity: 0.45; }
      .view .cloud { fill: #fff; opacity: 0.92; }
      .view .moon { fill: #f3efd8; }
      .view .moon-cut { fill: #13204a; }
      .view .star { fill: #fff; }
      .view .hill-back { fill: #a3d48c; }
      .view .hill { fill: #6cb257; }
      .view .leaf { fill: #4f9a45; }
      .view .pine { fill: #2f7d4a; }
      .view .trunk { fill: #8a6243; }
      .view .bld-back { fill: #a9bdd6; }
      .view .bld { fill: #7a93b5; }
      .view .win { fill: #ffd56b; }
      .view .water { fill: #3d9bd6; }
      .view .wave { fill: none; stroke: #fff; stroke-width: 1.2; stroke-linecap: round; opacity: 0.55; }
      .view .sail { fill: #fff; }
      .view .hull { fill: #c8553d; }
      .view.night .cloud { fill: #8a96b8; opacity: 0.35; }
      .view.night .hill-back { fill: #22402f; }
      .view.night .hill { fill: #16301f; }
      .view.night .leaf, .view.night .pine { fill: #10261a; }
      .view.night .trunk { fill: #1d1a17; }
      .view.night .bld-back { fill: #26345a; }
      .view.night .bld { fill: #1a2442; }
      .view.night .water { fill: #172a52; }
      .view.night .wave { opacity: 0.25; }
      .view.night .sail { fill: #9aa5c4; }
      .view.night .hull { fill: #5a2a22; }
      @media (prefers-reduced-motion: no-preference) {
        .view .cloud { animation: gc-drift 80s ease-in-out infinite alternate; }
        .view .cloud.c2 { animation-duration: 110s; animation-direction: alternate-reverse; }
        .view .cloud.c3 { animation-duration: 95s; }
        .view .star { animation: gc-twinkle 4s ease-in-out infinite; }
      }
      @keyframes gc-drift { from { translate: -14px 0; } to { translate: 14px 0; } }
      @keyframes gc-twinkle { 50% { opacity: 0.3; } }
      /* Keeps the name readable over the view. */
      .scrim { background: linear-gradient(to top, color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)) 75%, transparent), transparent 55%); }
      .pill .scrim, :host([size="slim"]) .scrim { background: color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)) 55%, transparent); }
      .surface.window .fill {
        inset-block: 0 auto;
        border-top: none;
        border-radius: 0;
        border-bottom: 3px solid color-mix(in srgb, var(--gc-text) 22%, var(--gc-surface-solid, var(--gc-surface)));
        background:
          repeating-linear-gradient(to bottom, transparent 0 8px, color-mix(in srgb, var(--gc-text) 10%, transparent) 8px 9px),
          var(--gc-surface-solid, var(--gc-surface));
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
      }
      /* Curtains: two folded drapes under a rod, parting from the centre; a bunched panel stays at each side when open. */
      .curtain { --fabric: var(--gc-fabric, var(--gc-surface-solid, var(--gc-surface))); }
      .rod {
        position: absolute;
        inset-inline: 0;
        top: 0;
        height: 4px;
        background: color-mix(in srgb, var(--gc-text) 30%, var(--fabric));
        pointer-events: none;
      }
      .drape {
        position: absolute;
        top: 4px;
        bottom: 0;
        width: calc(7% + 44% * var(--closed));
        background: repeating-linear-gradient(
          to right,
          color-mix(in srgb, var(--fabric), black 16%) 0,
          var(--fabric) 25%,
          color-mix(in srgb, var(--fabric), white 14%) 50%,
          var(--fabric) 75%,
          color-mix(in srgb, var(--fabric), black 16%) 100%
        );
        background-size: 25% 100%;
        border-bottom: 3px solid color-mix(in srgb, var(--fabric), black 22%);
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
        pointer-events: none;
      }
      .drape.dragging { transition: none; }
      .drape.start { inset-inline-start: 0; }
      .drape.end { inset-inline-end: 0; }
      .drape.start:dir(ltr), .drape.end:dir(rtl) { box-shadow: 3px 0 6px rgba(0, 0, 0, 0.22); }
      .drape.end:dir(ltr), .drape.start:dir(rtl) { box-shadow: -3px 0 6px rgba(0, 0, 0, 0.22); }
      /* With the plain fill, a curtain fills start to end like the drag. */
      .cover.curtain:not(.window) .fill {
        inset-block: 0;
        inset-inline: 0 auto;
        width: var(--fill);
        height: auto;
        border-top: none;
        border-radius: 0;
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
      }

      .window .icon, .window .badge { background: var(--gc-surface-solid, var(--gc-surface)); }
      .icon {
        position: relative;
        display: grid;
        place-items: center;
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 50%;
        background: var(--gc-surface);
        border: 1px solid var(--gc-border);
        color: var(--gc-text-dim);
        transition: background 0.3s, color 0.3s;
      }
      .on .icon {
        background: color-mix(in srgb, var(--domain) 22%, transparent);
        border-color: color-mix(in srgb, var(--domain) 45%, transparent);
        color: var(--gc-icon-on, var(--domain));
      }
      .text { position: relative; min-width: 0; }
      /* Each line orders its words by its own language ("7 of 12 on" stays readable on a Hebrew dashboard) but keeps the card's alignment. */
      .text > *, .badge { unicode-bidi: plaintext; }
      .text > *:dir(rtl) { text-align: right; }
      .text > *:dir(ltr) { text-align: left; }
      .name {
        font-size: 16px;
        font-weight: 600;
      }
      .on .meta { color: var(--gc-icon-on, var(--domain)); }
      .badge {
        position: relative;
        padding: 3px 10px;
        border-radius: var(--gc-radius-control);
        border: 1px solid var(--gc-border);
        font-size: 11px;
        text-transform: uppercase;
        white-space: nowrap;
      }
      .on .badge { color: var(--gc-on-accent); background: var(--gc-accent); border-color: transparent; }

      /* Tile: icon top-start, badge top-end, text bottom */
      .tile {
        display: grid;
        grid-template: "icon badge" auto "text text" 1fr / 1fr auto;
        padding: 16px;
        min-height: 120px;
      }
      .tile .icon { grid-area: icon; }
      .tile .badge { grid-area: badge; align-self: start; }
      .tile .text { grid-area: text; align-self: end; min-height: 0; }
      /* Long names wrap to two lines instead of hiding behind an ellipsis. */
      .tile .name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
        line-height: 1.2;
        overflow-wrap: anywhere;
        text-wrap: balance;
      }
      /* Narrow tiles give back a little room so two lines plus the meta line fit in 2 rows. */
      @container (max-width: 260px) {
        .tile { padding: 12px; }
        .tile .icon { width: 38px; height: 38px; }
        .tile .name { font-size: 14px; }
      }

      /* Pill: one row */
      .pill {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 6px;
        padding-inline-end: 14px;
        min-height: 56px;
        border-radius: var(--gc-radius-control);
      }
      .pill .text { flex: 1; }
      .pill .name { font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

      /* Compact: same layouts, tighter */
      :host([size="compact"]) .icon { width: 38px; height: 38px; --mdc-icon-size: 20px; }
      :host([size="compact"]) .badge { padding: 2px 8px; }
      :host([size="compact"]) .tile { padding: 12px; min-height: 96px; }
      :host([size="compact"]) .tile .name { font-size: 15px; }
      :host([size="compact"]) .pill { padding: 5px; padding-inline-end: 12px; gap: 10px; min-height: 48px; }
      :host([size="compact"]) .pill .name { font-size: 14.5px; }

      /* Slim: the tile becomes one row (icon beside the name); the pill puts name and meta on one line */
      :host([size="slim"]) .badge { padding: 2px 7px; }
      :host([size="slim"]) .tile {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px;
        padding-inline-end: 12px;
        min-height: 56px;
      }
      :host([size="slim"]) .tile .icon { width: 36px; height: 36px; --mdc-icon-size: 19px; }
      :host([size="slim"]) .tile .text { flex: 1; align-self: center; }
      :host([size="slim"]) .tile .badge { align-self: center; }
      :host([size="slim"]) .tile .name { font-size: 14px; -webkit-line-clamp: 1; line-clamp: 1; }
      :host([size="slim"]) .tile .meta { font-size: 11.5px; }
      :host([size="slim"]) .pill { padding: 4px; padding-inline-end: 12px; gap: 8px; min-height: 40px; }
      :host([size="slim"]) .pill .icon { width: 32px; height: 32px; --mdc-icon-size: 18px; }
      :host([size="slim"]) .pill .text { display: flex; align-items: baseline; gap: 8px; }
      :host([size="slim"]) .pill .name { font-size: 14px; flex: 0 1 auto; min-width: 0; }
      :host([size="slim"]) .pill .meta { flex: none; font-size: 11px; }
    `,
  ];
}

customElements.define("glide-button", GlideButton);
