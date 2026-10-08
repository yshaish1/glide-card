import { css, html, nothing, svg, type PropertyValues } from "lit";
import { GlideBase, surface } from "../core/base-card";
import { entityName } from "../core/entity";
import { haptic } from "../core/fire";
import { t } from "../core/i18n";
import type { ClimateCardConfig } from "../core/types";

const MODE_ICONS: Record<string, string> = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power",
};
const SWEEP = 270;
const START = 135; // degrees, measured clockwise from 3 o'clock
const R = 80;
const SEND_DELAY = 700;

const polar = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [100 + R * Math.cos(rad), 100 + R * Math.sin(rad)];
};
const arc = (from: number, to: number) => {
  const [x1, y1] = polar(from);
  const [x2, y2] = polar(to);
  return `M ${x1} ${y1} A ${R} ${R} 0 ${to - from > 180 ? 1 : 0} 1 ${x2} ${y2}`;
};

export class GlideClimate extends GlideBase<ClimateCardConfig> {
  static properties = { ...GlideBase.properties, pending: { state: true } };
  protected readonly cardType = "climate" as const;
  pending?: number;
  private timer = 0;

  setConfig(config: ClimateCardConfig) {
    if (!config.entity?.startsWith("climate.")) throw new Error("Climate card needs a climate.* entity");
    super.setConfig(config);
  }

  getGridOptions() {
    return { columns: 12, rows: 7, min_columns: 6 };
  }

  getCardSize() {
    return 7;
  }

  private get s() {
    return this.stateOf(this.config.entity);
  }

  private get range() {
    const a = this.s?.attributes ?? {};
    return { min: a.min_temp ?? 7, max: a.max_temp ?? 35, step: a.target_temp_step ?? 0.5 };
  }

  protected willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);
    if (this.pending !== undefined && !this.timer && this.s?.attributes.temperature === this.pending) this.pending = undefined;
  }

  private setTarget(v: number) {
    const { min, max, step } = this.range;
    const next = Math.min(max, Math.max(min, Math.round(v / step) * step));
    if (next === this.target) return;
    this.pending = next;
    haptic("selection");
    clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      this.timer = 0;
      this.hass?.callService("climate", "set_temperature", { entity_id: this.config.entity, temperature: this.pending });
    }, SEND_DELAY);
  }

  private get target(): number | undefined {
    return this.pending ?? this.s?.attributes.temperature;
  }

  private onDial(e: PointerEvent) {
    const svgEl = e.currentTarget as SVGSVGElement;
    if (this.target === undefined) return;
    svgEl.setPointerCapture(e.pointerId);
    const update = (ev: PointerEvent) => {
      const r = svgEl.getBoundingClientRect();
      const deg = (Math.atan2(ev.clientY - (r.top + r.height / 2), ev.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
      let rel = (deg - START + 720) % 360;
      if (rel > SWEEP) rel = rel - SWEEP < (360 - SWEEP) / 2 ? SWEEP : 0; // snap to nearest end in the gap
      const { min, max } = this.range;
      this.setTarget(min + (rel / SWEEP) * (max - min));
    };
    update(e);
    const up = () => {
      svgEl.removeEventListener("pointermove", update);
      svgEl.removeEventListener("pointerup", up);
      svgEl.removeEventListener("pointercancel", up);
    };
    svgEl.addEventListener("pointermove", update);
    svgEl.addEventListener("pointerup", up);
    svgEl.addEventListener("pointercancel", up);
  }

  private modeColor(mode: string) {
    return mode === "cool" ? "var(--gc-cool)" : mode === "heat" ? "var(--gc-heat)" : mode === "off" ? "var(--gc-text-dim)" : "var(--gc-accent)";
  }

  protected render() {
    const s = this.s;
    if (!s) return html`<div class="surface empty">${this.config.entity}</div>`;
    const a = s.attributes;
    const { min, max, step } = this.range;
    const target = this.target;
    const color = this.modeColor(s.state);
    const pct = target === undefined ? 0 : (target - min) / (max - min);
    const end = START + pct * SWEEP;
    const [kx, ky] = polar(end);
    const action: string | undefined = a.hvac_action;
    const subtitle =
      action === "heating" ? `${t(this.hass, "heating")} ${target}°` : action === "cooling" ? `${t(this.hass, "cooling")} ${target}°` : action === "off" || s.state === "off" ? t(this.hass, "off") : t(this.hass, "idle");
    const digits = step < 1 ? 1 : 0;
    return html`
      <div class="surface" style="--mode:${color}">
        <header>
          <div class="icon"><ha-icon .icon=${MODE_ICONS[s.state] ?? "mdi:thermostat"}></ha-icon></div>
          <div class="titles">
            <div class="name">${entityName(s, this.config.name)}</div>
            <div class="meta mode-text">${subtitle}</div>
          </div>
          ${action && action !== "idle" && action !== "off" ? html`<div class="chip meta"><i></i>${(this.hass as any)?.formatEntityAttributeValue?.(s, "hvac_action") ?? action}</div>` : nothing}
        </header>

        <div class="dial">
          <svg viewBox="0 0 200 200" @pointerdown=${(e: PointerEvent) => this.onDial(e)} role="slider"
            aria-valuemin=${min} aria-valuemax=${max} aria-valuenow=${target ?? ""} aria-label=${t(this.hass, "target")}>
            ${svg`<path class="track" d=${arc(START, START + SWEEP)} />`}
            ${target !== undefined && s.state !== "off"
              ? svg`<path class="value" d=${arc(START, Math.max(START + 0.5, end))} /><circle class="knob" cx=${kx} cy=${ky} r="9" />`
              : nothing}
          </svg>
          <div class="readout">
            <div class="target">${target !== undefined ? target.toFixed(digits) : "--"}<sup>°</sup></div>
            <div class="meta">${t(this.hass, "target")}</div>
            ${a.current_temperature !== undefined ? html`<div class="meta current">${t(this.hass, "current")} ${a.current_temperature}°</div>` : nothing}
          </div>
        </div>

        <div class="steppers">
          <button class="round" aria-label="-" @click=${() => target !== undefined && this.setTarget(target - step)}><ha-icon icon="mdi:minus" .icon=${"mdi:minus"}></ha-icon></button>
          <span class="meta">${step}°</span>
          <button class="round" aria-label="+" @click=${() => target !== undefined && this.setTarget(target + step)}><ha-icon icon="mdi:plus" .icon=${"mdi:plus"}></ha-icon></button>
        </div>

        <div class="modes">
          ${(a.hvac_modes ?? []).map(
            (m: string) => html`
              <button class=${m === s.state ? "on" : ""} style="--c:${this.modeColor(m)}"
                @click=${() => { haptic("light"); this.hass?.callService("climate", "set_hvac_mode", { entity_id: s.entity_id, hvac_mode: m }); }}>
                <ha-icon .icon=${MODE_ICONS[m] ?? "mdi:thermostat"}></ha-icon>
                <span class="meta">${t(this.hass, m as never) ?? m}</span>
              </button>
            `,
          )}
        </div>
      </div>
    `;
  }

  static styles = [
    surface,
    css`
      :host { height: 100%; }
      .surface { height: 100%; padding: 18px; display: flex; flex-direction: column; gap: 8px; }
      header { display: flex; align-items: center; gap: 12px; }
      .icon {
        display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%;
        background: color-mix(in srgb, var(--mode) 20%, transparent); color: var(--mode);
      }
      .titles { flex: 1; min-width: 0; }
      .name { font-size: 17px; font-weight: 600; }
      .mode-text { color: var(--mode); }
      .chip {
        display: flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: var(--gc-radius-control);
        border: 1px solid color-mix(in srgb, var(--mode) 50%, transparent); color: var(--mode); text-transform: uppercase; font-size: 11px;
      }
      .chip i { width: 7px; height: 7px; border-radius: 50%; background: var(--mode); }
      .dial { position: relative; flex: 1; min-height: 180px; display: grid; place-items: center; }
      svg { width: min(100%, 240px); aspect-ratio: 1; touch-action: none; cursor: pointer; overflow: visible; }
      .track { fill: none; stroke: color-mix(in srgb, var(--gc-text) 12%, transparent); stroke-width: 14; stroke-linecap: round; }
      .value {
        fill: none; stroke: var(--mode); stroke-width: 14; stroke-linecap: round;
        filter: drop-shadow(0 0 8px color-mix(in srgb, var(--mode) 60%, transparent));
      }
      .knob { fill: #fff; stroke: var(--mode); stroke-width: 4; }
      .readout { position: absolute; text-align: center; pointer-events: none; }
      .target { font-size: 52px; font-weight: 700; line-height: 1; letter-spacing: -0.02em; }
      .target sup { font-size: 22px; color: var(--mode); }
      .steppers { display: flex; align-items: center; justify-content: center; gap: 28px; }
      button {
        all: unset; box-sizing: border-box; cursor: pointer; display: grid; place-items: center;
        border: 1px solid var(--gc-border); background: var(--gc-surface); color: var(--gc-text);
        transition: transform 0.15s, background 0.2s;
      }
      button:active { transform: scale(0.94); }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      .round { width: 46px; height: 46px; border-radius: 50%; }
      .modes {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(64px, 1fr)); gap: 8px;
        padding-top: 12px; border-top: 1px solid var(--gc-border);
      }
      .modes button { gap: 4px; padding: 10px 4px; border-radius: calc(var(--gc-radius) * 0.6); color: var(--gc-text-dim); }
      .modes .meta { color: inherit; font-size: 11px; }
      .modes button.on {
        color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent);
        border-color: color-mix(in srgb, var(--c) 55%, transparent);
      }
      .empty { padding: 18px; color: var(--gc-text-dim); }
    `,
  ];
}

customElements.define("glide-climate", GlideClimate);
