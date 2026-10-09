import { css, html, nothing, svg, type PropertyValues } from "lit";
import { GlideBase, surface } from "../core/base-card";
import { entityName } from "../core/entity";
import { haptic } from "../core/fire";
import { t } from "../core/i18n";
import type { ClimateCardConfig } from "../core/types";

const MODE_ICONS: Record<string, string> = {
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:alpha-a-circle-outline",
  auto: "mdi:alpha-a-circle-outline",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power",
};
const SWEEP = 270;
const START = 135; // degrees, measured clockwise from 3 o'clock
const R = 80;
const SEND_DELAY = 700;
/** A temperature as an isolated LTR run, so "°" stays after the number inside Hebrew text. */
const deg = (v: number | string) => `\u2066${v}°\u2069`;

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
    return { columns: 12, rows: 8, min_columns: 6 };
  }

  getCardSize() {
    return 8;
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
    const off = s.state === "off";
    const color = this.modeColor(s.state);
    const pct = target === undefined ? 0 : (target - min) / (max - min);
    const end = START + pct * SWEEP;
    const [sx, sy] = polar(START);
    const [kx, ky] = polar(end);
    const action: string | undefined = a.hvac_action;
    const digits = step < 1 ? 1 : 0;
    const temp = target !== undefined ? deg(target.toFixed(digits)) : "";
    const lead = (label: string) => (/[-־]$/.test(label) ? label : `${label} `);
    const subtitle =
      off || action === "off" ? t(this.hass, "off")
      : action === "heating" ? lead(t(this.hass, "heating")) + temp
      : action === "cooling" ? lead(t(this.hass, "cooling")) + temp
      : [t(this.hass, (action === "idle" ? "idle" : s.state) as never) ?? s.state, temp].filter(Boolean).join(" · ");
    const running = !off && ["heating", "cooling", "drying", "fan"].includes(action ?? "");
    return html`
      <div class="surface ${off ? "off" : ""}" style="--mode:${color}">
        <header>
          <div class="icon"><ha-icon .icon=${MODE_ICONS[s.state] ?? "mdi:thermostat"}></ha-icon></div>
          <div class="titles">
            <div class="name">${entityName(s, this.config.name)}</div>
            <div class="meta mode-text">${subtitle}</div>
          </div>
          ${running ? html`<div class="chip meta"><i></i>${t(this.hass, "active")}</div>` : nothing}
        </header>

        <div class="dial">
          <div class="ring">
            <svg viewBox="0 0 200 200" @pointerdown=${(e: PointerEvent) => this.onDial(e)} role="slider"
              aria-valuemin=${min} aria-valuemax=${max} aria-valuenow=${target ?? ""} aria-label=${t(this.hass, "target")}>
              ${svg`
                <defs>
                  <linearGradient id="arc" gradientUnits="userSpaceOnUse" x1=${sx} y1=${sy} x2=${kx} y2=${ky}>
                    <stop offset="0" style="stop-color:var(--mode);stop-opacity:.45" />
                    <stop offset="1" style="stop-color:var(--mode)" />
                  </linearGradient>
                </defs>
                <path class="track" d=${arc(START, START + SWEEP)} />`}
              ${target !== undefined && !off
                ? svg`<path class="value" d=${arc(START, Math.max(START + 0.5, end))} /><circle class="knob" cx=${kx} cy=${ky} r="9" />`
                : nothing}
            </svg>
            <div class="readout">
              <div class="target">${target !== undefined ? target.toFixed(digits) : "--"}<sup>°</sup></div>
              <div class="meta label">${t(this.hass, "target")}</div>
              ${a.current_temperature !== undefined ? html`<div class="meta current">${t(this.hass, "current")} ${deg(typeof a.current_temperature === "number" ? a.current_temperature.toFixed(digits) : a.current_temperature)}</div>` : nothing}
            </div>
          </div>
        </div>

        <div class="steppers">
          <button class="round" aria-label="-" @click=${() => target !== undefined && this.setTarget(target - step)}><ha-icon icon="mdi:minus" .icon=${"mdi:minus"}></ha-icon></button>
          <span class="meta">${t(this.hass, "step")}: ${deg(step)}</span>
          <button class="round" aria-label="+" @click=${() => target !== undefined && this.setTarget(target + step)}><ha-icon icon="mdi:plus" .icon=${"mdi:plus"}></ha-icon></button>
        </div>

        <div class="modes">
          ${(a.hvac_modes ?? []).map(
            (m: string) => html`
              <button class=${m === s.state ? "on" : ""} style="--c:${this.modeColor(m)}" aria-pressed=${m === s.state ? "true" : "false"}
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
      .surface {
        position: relative; overflow: hidden; box-sizing: border-box;
        height: 100%; padding: 20px 18px 18px; display: flex; flex-direction: column; gap: 10px;
        --soft: color-mix(in srgb, var(--gc-text) 6%, transparent);
        --line: color-mix(in srgb, var(--gc-text) 10%, transparent);
      }
      /* Accent strip along the top edge: theme accent into the mode colour */
      .surface::before {
        content: ""; position: absolute; inset: 0 0 auto; height: 4px;
        background: linear-gradient(to var(--strip-dir, right), var(--gc-accent), var(--mode));
      }
      .surface:dir(rtl)::before { --strip-dir: left; }
      .surface.off::before { opacity: 0.3; }
      header { display: flex; align-items: center; gap: 12px; }
      .icon {
        display: grid; place-items: center; flex: none; width: 42px; height: 42px; border-radius: 12px;
        background: color-mix(in srgb, var(--mode) 18%, transparent); color: var(--mode); --mdc-icon-size: 22px;
      }
      .titles { flex: 1; min-width: 0; }
      .name { font-size: 17px; font-weight: 650; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .mode-text { color: var(--mode); font-size: 13px; }
      .chip {
        display: flex; align-items: center; gap: 6px; flex: none; padding: 5px 11px; border-radius: 999px;
        background: color-mix(in srgb, var(--mode) 16%, transparent); color: var(--mode);
        text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px; font-weight: 600;
      }
      .chip i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
      .dial { position: relative; flex: 1; min-height: 190px; display: grid; place-items: center; }
      /* The ring holds the arc and the readout, so the number stays centred on the arc however tall the card is */
      .ring { position: relative; width: min(100%, 240px); aspect-ratio: 1; }
      svg { display: block; width: 100%; height: 100%; touch-action: none; cursor: pointer; overflow: visible; }
      .track { fill: none; stroke: var(--line); stroke-width: 14; stroke-linecap: round; }
      .value { fill: none; stroke: url(#arc); stroke-width: 14; stroke-linecap: round; }
      .knob { fill: #fff; stroke: var(--mode); stroke-width: 4; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2)); }
      .readout { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; pointer-events: none; }
      .target { font-size: 54px; font-weight: 750; line-height: 1; letter-spacing: -0.03em; }
      .target sup { font-size: 20px; font-weight: 700; color: var(--mode); vertical-align: 0.9em; margin-inline-start: 2px; }
      .label { text-transform: uppercase; letter-spacing: 0.1em; font-size: 11px; color: var(--gc-text-dim); }
      .current { padding: 3px 10px; border-radius: 999px; background: var(--soft); font-size: 12px; color: var(--gc-text-dim); }
      .steppers { display: flex; align-items: center; justify-content: center; gap: 24px; }
      .steppers .meta { min-width: 72px; text-align: center; font-size: 13px; color: var(--gc-text-dim); }
      button {
        all: unset; box-sizing: border-box; cursor: pointer; display: grid; place-items: center;
        border: 1px solid var(--line); background: var(--soft); color: var(--gc-text);
        transition: transform 0.15s, background 0.2s, color 0.2s;
      }
      button:active { transform: scale(0.94); }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      .round { width: 52px; height: 52px; border-radius: 50%; }
      .modes {
        display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 8px;
        margin-top: 4px; padding-top: 14px; border-top: 1px solid var(--line);
      }
      .modes button { gap: 5px; padding: 11px 2px; border-radius: 16px; color: var(--gc-text-dim); --mdc-icon-size: 20px; }
      .modes .meta { color: inherit; font-size: 11px; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .modes button.on {
        color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent);
        border-color: color-mix(in srgb, var(--c) 50%, transparent);
      }
      .empty { padding: 18px; color: var(--gc-text-dim); }
    `,
  ];
}

customElements.define("glide-climate", GlideClimate);
