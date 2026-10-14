import { css, html, nothing, type PropertyValues } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { runAction } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { cssColor, domainColor, domainOf, entityIcon, entityName, isActive, isUnavailable, onTextColor, sliderFor } from "../core/entity";
import { haptic } from "../core/fire";
import { attachGestures } from "../core/gestures";
import { isScene, sceneSvg } from "./cover-scenes";
import { formatState, t } from "../core/i18n";
import { TemplateController } from "../core/templates";
import type { ActionConfig, ButtonCardConfig, CoverStyle, HassEntity } from "../core/types";

/** A rendered icon template only counts when it looks like an icon ("mdi:..."), e.g. not "unknown". */
const iconOrUndefined = (v?: string) => (v && /^[\w-]+:[\w-]+$/.test(v.trim()) ? v.trim() : undefined);

const STATELESS = new Set(["scene", "script", "button", "input_button"]);
/** HA's CoverEntityFeature bits for the cover buttons. */
const COVER_OPEN = 1, COVER_CLOSE = 2, COVER_STOP = 8;
/** How each cover style moves: down from the top, up from the sill, apart from the middle, or to one side. */
const COVER_MOTION: Record<CoverStyle, "down" | "up" | "split" | "side"> = {
  blind: "down", roman: "down", venetian: "down", shutter: "down", bottom_up: "up",
  curtain: "split", curtain_side: "side", vertical: "side",
};
/** Fabric styles take `color` as the fabric tint. */
const FABRIC = new Set<CoverStyle>(["curtain", "curtain_side", "roman"]);
/**
 * A moving cover reports its position every second or so. Each step glides linearly until the next
 * report is due, so the steps join into one motion; the first one is a guess, long gaps are capped.
 */
const MOVE_FIRST_MS = 1000, MOVE_MIN_MS = 250, MOVE_MAX_MS = 4000;
/**
 * Venetian slats in an 8px pitch: thin with wide gaps at half tilt (open), solid at 0 or 100 (shut).
 * Without a tilt they sit half shut.
 */
const slatPx = (tilt?: number) => {
  const shut = typeof tilt === "number" ? Math.abs(tilt - 50) / 50 : 0.5;
  return Math.round((2.5 + 5.5 * shut) * 10) / 10;
};
const isMoving = (s?: HassEntity) => s?.state === "opening" || s?.state === "closing";
const TOGGLEABLE = new Set(["light", "switch", "fan", "input_boolean", "cover", "lock", "scene", "script", "button", "input_button", "siren", "humidifier"]);

export class GlideButton extends GlideBase<ButtonCardConfig> {
  static properties = { ...GlideBase.properties, dragValue: { state: true }, templateRev: { state: true } };
  protected readonly cardType = "button" as const;
  dragValue?: number;
  /** Bumped per template result, so the update isn't dropped by the hass-only update filter. */
  templateRev = 0;
  private detach?: () => void;
  /** When the last position report came in, and whether the cover was moving then. */
  private lastPos?: { value: number; at: number; moving: boolean };
  /** How long each step glides while moving: the time between the last two reports. */
  private moveMs = MOVE_FIRST_MS;
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
    if (changed.has("hass")) this.trackMotion();
  }

  private trackMotion() {
    const s = this.stateOf(this.config.entity);
    const value = s?.attributes.current_position;
    if (typeof value !== "number" || value === this.lastPos?.value) return;
    const at = performance.now(), moving = isMoving(s);
    if (moving) {
      this.moveMs = this.lastPos?.moving
        ? Math.min(MOVE_MAX_MS, Math.max(MOVE_MIN_MS, at - this.lastPos.at))
        : MOVE_FIRST_MS;
    }
    this.lastPos = { value, at, moving };
  }

  protected firstUpdated() {
    const el = this.renderRoot.querySelector<HTMLElement>(".surface")!;
    let lastStep = -1;
    this.detach = attachGestures(el, {
      axis: () => this.dragAxis,
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

  /** How the window opens: `cover_style`, or the device class (curtain and shutter have their own look). */
  private get coverStyle(): CoverStyle | undefined {
    if (!this.isCover) return undefined;
    const style = this.config.cover_style;
    if (style && style in COVER_MOTION) return style;
    const dc = this.stateOf(this.config.entity)?.attributes.device_class;
    return dc === "curtain" ? "curtain" : dc === "shutter" ? "shutter" : "blind";
  }

  private get motion() {
    const style = this.coverStyle;
    return style ? COVER_MOTION[style] : undefined;
  }

  /** Curtains and vertical blinds open sideways. */
  private get horizontal() {
    return this.motion === "split" || this.motion === "side";
  }

  private get side() {
    return this.config.cover_side === "end" ? "end" : "start";
  }

  /** Dragging the way the cover opens raises the position. */
  private get dragAxis(): "x" | "-x" | "y" | "-y" {
    switch (this.motion) {
      case "down": return "y";
      case "up": return "-y";
      case "split": return "x";
      case "side": return this.side === "start" ? "-x" : "x";
      default: return "x";
    }
  }

  /** Covers look like a window: an outdoor view (built-in scene or the user's photo) behind a blind; `view: color` keeps the plain fill. */
  private get view(): "scene" | "image" | undefined {
    if (!this.isCover) return undefined;
    const v = this.config.view;
    if (v === "color") return undefined;
    if (v === undefined && this.config.view_image) return "image";
    return "scene";
  }

  /** Open / stop / close buttons, opt-in with `cover_buttons`; also for covers without a position. */
  private get coverButtons() {
    return domainOf(this.config.entity) === "cover" && !!this.config.cover_buttons;
  }

  private renderCoverButtons(s?: HassEntity) {
    const id = this.config.entity!;
    const a = s?.attributes ?? ({} as HassEntity["attributes"]);
    const feat: number = a.supported_features ?? COVER_OPEN | COVER_CLOSE | COVER_STOP;
    const pos: number | undefined = a.current_position;
    const moving = isMoving(s);
    const off = !s || isUnavailable(s);
    // Fully open or closed greys out the button that would do nothing; while moving both stay live.
    const opened = !moving && (pos !== undefined ? pos >= 100 : s?.state === "open");
    const closed = !moving && (pos !== undefined ? pos <= 0 : s?.state === "closed");
    // Icons point the way the cover moves; sideways ones are drawn for LTR and mirrored in RTL.
    const icons: Record<string, [string, string]> = {
      down: ["mdi:arrow-up", "mdi:arrow-down"],
      up: ["mdi:arrow-down", "mdi:arrow-up"],
      split: ["mdi:arrow-split-vertical", "mdi:arrow-collapse-horizontal"],
      side: this.side === "start" ? ["mdi:arrow-left", "mdi:arrow-right"] : ["mdi:arrow-right", "mdi:arrow-left"],
    };
    const [openIcon, closeIcon] = icons[this.motion ?? "down"];
    const mirror = this.motion === "side" ? "mirror" : "";
    const btn = (service: string, icon: string, label: string, disabled: boolean, cls = "") => html`
      <button class="round ${cls}" aria-label=${label} title=${label} ?disabled=${off || disabled}
        @click=${(e: Event) => { e.stopPropagation(); haptic("light"); this.hass?.callService("cover", service, { entity_id: id }); }}>
        <ha-icon .icon=${icon}></ha-icon>
      </button>`;
    return html`
      <div class="cover-btns" data-no-gesture>
        ${feat & COVER_OPEN ? btn("open_cover", openIcon, t(this.hass, "open_cover"), opened, mirror) : nothing}
        ${feat & COVER_STOP ? btn("stop_cover", "mdi:stop", t(this.hass, "stop_cover"), !moving, moving ? "stop live" : "stop") : nothing}
        ${feat & COVER_CLOSE ? btn("close_cover", closeIcon, t(this.hass, "close_cover"), closed, mirror) : nothing}
      </div>
    `;
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
    `;
  }

  /** What covers the window: a blind or shade from the top or sill, or drapes and slats on a rail. */
  private renderPanel(style: CoverStyle) {
    const dragging = this.dragValue !== undefined ? "dragging" : "";
    switch (COVER_MOTION[style]) {
      case "split":
        return html`<div class="rod"></div>${["start", "end"].map((side) => html`<div class="drape ${side} ${dragging}"></div>`)}`;
      case "side":
        return html`<div class="rod"></div><div class="drape single ${this.side} ${dragging}"></div>`;
      default:
        return html`<div class="fill ${dragging}"></div>${style === "shutter" ? html`<div class="box"></div>` : nothing}`;
    }
  }

  protected render() {
    const s = this.stateOf(this.config.entity);
    const slider = this.slider;
    const value = this.dragValue ?? slider?.value;
    const cover = this.isCover;
    const view = this.view;
    const style = this.coverStyle;
    const horizontal = this.horizontal;
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
      : cover ? `${value}% ${stateText}` : this.coverButtons ? stateText : slider && on && value !== undefined ? `${value}%` : "";
    // In the window look the fill is the blind, so it covers what is closed.
    const fill = view && !horizontal ? 100 - (value ?? 0) : slider ? value ?? 0 : on ? 100 : 0;
    const color = this.tpl.get("color")?.trim();
    const buttons = this.coverButtons;
    const moving = cover && this.dragValue === undefined && isMoving(s);
    return html`
      <div
        class="surface ${this.layout} ${on ? "on" : ""} ${cover ? "cover" : ""} ${view ? "window" : ""} ${style ? `style-${style} side-${this.side}` : ""} ${style === "curtain" ? "curtain" : ""} ${style && FABRIC.has(style) ? "fabric" : ""} ${moving ? "moving" : ""} ${buttons ? "has-btns" : ""} ${this.config.fill === false ? "nofill" : ""} ${isUnavailable(s) && this.config.entity ? "unavailable" : ""}"
        style=${styleMap({ "--domain": cssColor(color) ?? domainColor(s), "--gc-icon-on": onTextColor(color), "--fill": `${fill}%`,
          "--closed": `${(100 - (value ?? 0)) / 100}`,
          "--gc-fabric": style && FABRIC.has(style) ? cssColor(color) : undefined,
          "--slat": style === "venetian" ? `${slatPx(s?.attributes.current_tilt_position)}px` : undefined,
          "--gc-move": moving ? `${Math.round(this.moveMs)}ms` : undefined,
        })}
        role="button"
        tabindex="0"
        aria-label=${name}
      >
        ${view ? this.renderView() : nothing}
        ${view ? this.renderPanel(style!) : html`<div class="fill ${this.dragValue !== undefined ? "dragging" : ""}"></div>`}
        <div class="icon"><ha-icon .icon=${entityIcon(s, iconOrUndefined(this.tpl.get("icon")))}></ha-icon></div>
        <div class="text">
          <div class="name">${name}</div>
          ${meta ? html`<div class="meta">${meta}</div>` : nothing}
        </div>
        ${badge && !buttons ? html`<div class="badge meta">${badge}</div>` : nothing}
        ${buttons ? this.renderCoverButtons(s) : nothing}
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
      .view { position: absolute; inset: 0; pointer-events: none; }
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
      .cover { --fabric: var(--gc-fabric, var(--gc-surface-solid, var(--gc-surface))); }
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
        /* Sheer like real fabric: the creases are dense, the crests let the view through, and what shows is softened. */
        background: repeating-linear-gradient(
          to right,
          color-mix(in srgb, color-mix(in srgb, var(--fabric), black 16%) 92%, transparent) 0,
          color-mix(in srgb, var(--fabric) 80%, transparent) 25%,
          color-mix(in srgb, color-mix(in srgb, var(--fabric), white 14%) 66%, transparent) 50%,
          color-mix(in srgb, var(--fabric) 80%, transparent) 75%,
          color-mix(in srgb, color-mix(in srgb, var(--fabric), black 16%) 92%, transparent) 100%
        );
        background-size: 25% 100%;
        backdrop-filter: blur(1.5px) saturate(0.85);
        -webkit-backdrop-filter: blur(1.5px) saturate(0.85);
        border-bottom: 3px solid color-mix(in srgb, var(--fabric), black 22%);
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
        pointer-events: none;
      }
      .drape.dragging { transition: none; }
      .drape.start { inset-inline-start: 0; }
      .drape.end { inset-inline-end: 0; }
      .drape.start:dir(ltr), .drape.end:dir(rtl) { box-shadow: 3px 0 6px rgba(0, 0, 0, 0.22); }
      .drape.end:dir(ltr), .drape.start:dir(rtl) { box-shadow: -3px 0 6px rgba(0, 0, 0, 0.22); }
      /* One drape or a stack of vertical slats on the rail, gathered at one side when open. */
      .drape.single { width: calc(7% + 93% * var(--closed)); }
      .style-vertical .drape {
        background: repeating-linear-gradient(
          to right,
          color-mix(in srgb, var(--fabric), black 14%) 0 1px,
          color-mix(in srgb, var(--fabric), white 8%) 1px 45%,
          var(--fabric) 45% 92%,
          color-mix(in srgb, var(--fabric), black 8%) 92% 100%
        );
        background-size: 14px 100%;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        border-bottom: none;
      }

      /* Shade from the sill: the same panel, anchored at the bottom with its bar on top. */
      .style-bottom_up.window .fill {
        inset-block: auto 0;
        border-bottom: none;
        border-top: 3px solid color-mix(in srgb, var(--gc-text) 22%, var(--gc-surface-solid, var(--gc-surface)));
        box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.18);
      }
      /* Roman shade: soft horizontal folds in the fabric and a heavier hem. */
      .style-roman.window .fill {
        background: repeating-linear-gradient(
          to bottom,
          color-mix(in srgb, var(--fabric), white 10%) 0,
          var(--fabric) 55%,
          color-mix(in srgb, var(--fabric), black 18%) 100%
        );
        background-size: 100% 16px;
        border-bottom: 5px solid color-mix(in srgb, var(--fabric), black 24%);
      }
      /* Venetian: slats over the view; --slat (from the tilt) sets how much of each 8px pitch is slat. */
      .style-venetian.window .fill {
        background: repeating-linear-gradient(
          to bottom,
          color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)), white 12%) 0,
          var(--gc-surface-solid, var(--gc-surface)) calc(var(--slat, 5px) * 0.6),
          color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)), black 14%) var(--slat, 5px),
          transparent var(--slat, 5px) 8px
        );
        border-bottom: 3px solid color-mix(in srgb, var(--gc-text) 25%, var(--gc-surface-solid, var(--gc-surface)));
      }
      /* Outdoor roller shutter: opaque aluminium slats under a box that stays at the top. */
      .style-shutter.window .fill {
        --metal: color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)) 55%, #9aa3ad);
        background: repeating-linear-gradient(
          to bottom,
          color-mix(in srgb, var(--metal), white 22%) 0,
          var(--metal) 45%,
          color-mix(in srgb, var(--metal), black 22%) 85%,
          color-mix(in srgb, var(--metal), black 40%) 100%
        );
        background-size: 100% 7px;
        border-bottom: 3px solid color-mix(in srgb, var(--metal), black 35%);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
      }
      .box {
        position: absolute;
        inset-inline: 0;
        top: 0;
        height: 8px;
        background: linear-gradient(to bottom, color-mix(in srgb, #9aa3ad, white 20%), color-mix(in srgb, #9aa3ad, black 25%));
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        pointer-events: none;
      }

      /* Plain fill (no view): it grows the way the cover opens. From the top for a shade from the sill, */
      .style-bottom_up:not(.window) .fill {
        inset-block: 0 auto;
        border-top: none;
        border-bottom: 1.5px solid color-mix(in srgb, var(--domain) 35%, transparent);
        border-radius: 0 0 6px 6px;
      }
      /* sideways for curtains and vertical blinds: from the middle out, or away from the stacking side. */
      .cover.style-curtain:not(.window) .fill,
      .cover.style-curtain_side:not(.window) .fill,
      .cover.style-vertical:not(.window) .fill {
        inset-block: 0;
        width: var(--fill);
        height: auto;
        border-top: none;
        border-radius: 0;
        transition: width 0.45s cubic-bezier(0.2, 0.9, 0.25, 1);
      }
      .cover.style-curtain:not(.window) .fill { inset-inline: calc((100% - var(--fill)) / 2) auto; }
      .cover.side-start:not(.window):is(.style-curtain_side, .style-vertical) .fill { inset-inline: auto 0; }
      .cover.side-end:not(.window):is(.style-curtain_side, .style-vertical) .fill { inset-inline: 0 auto; }
      /* While the motor runs, each reported step glides at a steady speed into the next. */
      @media (prefers-reduced-motion: no-preference) {
        .surface.moving .fill:not(.dragging),
        .surface.moving .drape:not(.dragging) {
          transition-duration: var(--gc-move, 1s);
          transition-timing-function: linear;
        }
      }

      .window .icon, .window .badge { background: var(--gc-surface-solid, var(--gc-surface)); }
      /* Keeps the name readable over the view, blind or drapes: a frosted chip that hugs the text.
         Its corner is concentric with the card's (card radius minus card padding). */
      .window .text {
        padding: 4px 12px;
        margin-inline-start: -4px;
        border-radius: 12px;
        box-shadow: inset 0 0 0 1px var(--gc-border);
        background: color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)) 55%, transparent);
        backdrop-filter: blur(10px) saturate(1.2);
        -webkit-backdrop-filter: blur(10px) saturate(1.2);
      }
      .tile.window .text { justify-self: start; max-width: 100%; }
      .pill.window .text, :host([size="slim"]) .tile.window .text { flex: 0 1 auto; min-width: 0; margin-inline-end: auto; }
      :host([size="compact"]) .window .text { padding: 2px 11px; border-radius: 11px; }
      /* Slim keeps tight sides so "40% Open" stays on its line. */
      :host([size="slim"]) .window .text { padding: 0 8px; border-radius: 10px; }
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

      /* Cover buttons: small round controls at the end, solid so they read over the view. */
      .cover-btns {
        position: relative;
        display: flex;
        gap: 6px;
        cursor: default;
      }
      .cover-btns .round {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        padding: 0;
        border-radius: 50%;
        border: 1px solid var(--gc-border);
        background: var(--gc-surface-solid, var(--gc-surface));
        color: var(--gc-text);
        --mdc-icon-size: 18px;
        cursor: pointer;
        font: inherit;
        transition: opacity 0.2s, background 0.2s, color 0.2s;
      }
      .cover-btns .round:active:not(:disabled) { transform: scale(0.92); }
      .cover-btns .round:disabled { opacity: 0.4; cursor: default; }
      .cover-btns .round.mirror:dir(rtl) ha-icon { transform: scaleX(-1); }
      .cover-btns .round.live {
        background: color-mix(in srgb, var(--domain) 22%, var(--gc-surface-solid, var(--gc-surface)));
        border-color: color-mix(in srgb, var(--domain) 45%, transparent);
        color: var(--domain);
      }
      /* They take the badge's place (the meta line still says "40% Open"), so the name keeps the full width. */
      .tile .cover-btns { grid-area: badge; align-self: start; }
      .pill .cover-btns { flex: none; }
      .pill.has-btns { padding-inline-end: 6px; }
      /* Short of room, stop only shows while the cover moves. */
      @container (max-width: 260px) {
        :host([size="slim"]) .cover-btns .stop:disabled, .pill .cover-btns .stop:disabled { display: none; }
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
      :host([size="compact"]) .cover-btns .round, :host([size="slim"]) .cover-btns .round { width: 28px; height: 28px; --mdc-icon-size: 16px; }
      :host([size="compact"]) .cover-btns, :host([size="slim"]) .cover-btns { gap: 4px; }

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
      :host([size="slim"]) .tile .cover-btns { align-self: center; }
      :host([size="slim"]) .tile.has-btns, :host([size="slim"]) .pill.has-btns { padding-inline-end: 8px; }
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
