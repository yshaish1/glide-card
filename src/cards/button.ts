import { css, html, nothing, type PropertyValues } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { runAction } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { cssColor, domainColor, domainOf, entityIcon, entityName, isActive, isUnavailable, sliderFor } from "../core/entity";
import { haptic } from "../core/fire";
import { attachGestures } from "../core/gestures";
import { formatState } from "../core/i18n";
import type { ActionConfig, ButtonCardConfig } from "../core/types";

const STATELESS = new Set(["scene", "script", "button", "input_button"]);
const TOGGLEABLE = new Set(["light", "switch", "fan", "input_boolean", "cover", "lock", "scene", "script", "button", "input_button", "siren", "humidifier"]);

export class GlideButton extends GlideBase<ButtonCardConfig> {
  static properties = { ...GlideBase.properties, dragValue: { state: true } };
  protected readonly cardType = "button" as const;
  dragValue?: number;
  private detach?: () => void;

  get layout() {
    return this.config.layout ?? this.theme.defaults?.buttonLayout ?? "tile";
  }

  getGridOptions() {
    return this.layout === "pill" ? { columns: 12, rows: 1, min_columns: 6 } : { columns: 6, rows: 2, min_columns: 3, min_rows: 2 };
  }

  getCardSize() {
    return this.layout === "pill" ? 1 : 2;
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
      axis: () => (this.isCover ? "y" : "x"),
      arm: () => haptic("selection"),
      tap: () => this.hass && runAction(this, this.hass, this.action("tap"), this.config.entity),
      hold: () => this.hass && runAction(this, this.hass, this.action("hold"), this.config.entity),
      doubleTap: this.config.double_tap_action ? () => this.hass && runAction(this, this.hass, this.action("double_tap"), this.config.entity) : undefined,
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

  protected render() {
    const s = this.stateOf(this.config.entity);
    const slider = this.slider;
    const value = this.dragValue ?? slider?.value;
    const cover = this.isCover;
    // Covers stay neutral like the mockup; the fill alone shows how open they are.
    const on = !cover && (this.dragValue !== undefined ? this.dragValue > 0 : isActive(s));
    const stateText = this.hass && this.config.entity ? formatState(this.hass, this.config.entity) : "";
    const stateless = STATELESS.has(domainOf(this.config.entity));
    // The badge carries the state; the meta line only adds what the badge can't (e.g. brightness).
    // Covers flip it: the badge shows the position and the meta line spells it out ("40% Open").
    const badge = cover ? `${value}%` : stateText;
    const meta = cover ? `${value}% ${stateText}` : slider && on && value !== undefined ? `${value}%` : "";
    const fill = slider ? value ?? 0 : on ? 100 : 0;
    return html`
      <div
        class="surface ${this.layout} ${on ? "on" : ""} ${cover ? "cover" : ""} ${isUnavailable(s) && this.config.entity ? "unavailable" : ""}"
        style=${styleMap({ "--domain": cssColor(this.config.color) ?? domainColor(s), "--fill": `${fill}%` })}
        role="button"
        tabindex="0"
        aria-label=${entityName(s, this.config.name)}
      >
        <div class="fill ${this.dragValue !== undefined ? "dragging" : ""}"></div>
        <div class="icon"><ha-icon .icon=${entityIcon(s, this.config.icon)}></ha-icon></div>
        <div class="text">
          <div class="name">${entityName(s, this.config.name)}</div>
          ${meta ? html`<div class="meta">${meta}</div>` : nothing}
        </div>
        ${badge && !stateless ? html`<div class="badge meta">${badge}</div>` : nothing}
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
    `,
  ];
}

customElements.define("glide-button", GlideButton);
