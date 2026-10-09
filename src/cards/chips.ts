import { css, html, nothing, type PropertyValues } from "lit";
import { runAction } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { cssColor, domainColor, entityIcon, entityName } from "../core/entity";
import { conditionEntities, conditionsMet } from "../core/conditions";
import { compactValue } from "../core/format";
import { attachGestures } from "../core/gestures";
import type { ChipConfig, ChipsCardConfig } from "../core/types";

/** A row of small info chips (icon + label + value) for the top of a page. */
export class GlideChips extends GlideBase<ChipsCardConfig> {
  protected readonly cardType = "chips" as const;
  private detachers: (() => void)[] = [];
  /** Indexes of the chips whose `visibility` passes; gestures are rebound when it changes. */
  private shown: number[] = [];
  private boundKey = "";

  setConfig(config: ChipsCardConfig) {
    if (!Array.isArray(config.chips)) throw new Error("Chips card needs a `chips` list");
    super.setConfig(config);
  }

  protected watched() {
    return this.config.chips.flatMap((c) => [c.entity, ...conditionEntities(c.visibility)]);
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return 1;
  }

  protected willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);
    this.shown = this.config.chips.flatMap((c, i) => (conditionsMet(this.hass, c.visibility) ? [i] : []));
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (changed.has("config") || this.shown.join() !== this.boundKey) this.bind();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && !this.detachers.length) this.bind();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unbind();
  }

  private unbind() {
    this.detachers.forEach((d) => d());
    this.detachers = [];
    this.boundKey = "";
  }

  private bind() {
    this.unbind();
    this.boundKey = this.shown.join();
    this.renderRoot.querySelectorAll<HTMLElement>(".chip").forEach((el, i) => {
      const chip = this.config.chips[this.shown[i]];
      const act = (kind: "tap" | "hold") => {
        const action = chip[`${kind}_action`] ?? { action: "more-info" as const };
        if (this.hass) runAction(el, this.hass, action, chip.entity);
      };
      const tap = (p?: { x: number; y: number }) => { this.playTapFx(el, p, { icon: el.querySelector("ha-icon") }); act("tap"); };
      this.detachers.push(attachGestures(el, { tap, hold: () => act("hold") }));
    });
  }

  private renderChip(chip: ChipConfig) {
    const s = this.stateOf(chip.entity);
    const value = chip.value ?? (s && this.hass ? compactValue(this.hass, s, chip.attribute) : "");
    const color = cssColor(chip.color) ?? (s ? domainColor(s) : "var(--gc-accent)");
    return html`
      <div class="chip surface" role="button" tabindex="0" style="--chip:${color}">
        <ha-icon .icon=${entityIcon(s, chip.icon)}></ha-icon>
        <div class="text">
          ${chip.name !== "" ? html`<div class="label">${entityName(s, chip.name)}</div>` : nothing}
          <div class="value">${value}</div>
        </div>
      </div>
    `;
  }

  protected render() {
    return html`<div class="row ${this.config.align === "start" ? "start" : ""}">${this.shown.map((i) => this.renderChip(this.config.chips[i]))}</div>`;
  }

  static styles = [
    surface,
    css`
      .row {
        display: flex;
        gap: 10px;
        justify-content: safe center;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        scrollbar-width: none;
        padding: 6px 4px 10px; /* room for chip shadows */
        margin: -6px -4px -10px;
      }
      .row::-webkit-scrollbar { display: none; }
      .row.start { justify-content: flex-start; }
      .chip {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-block: 7px;
        padding-inline: 12px 16px;
        border-radius: var(--gc-radius-control);
        cursor: pointer;
        user-select: none;
        touch-action: pan-x;
        scroll-snap-align: center;
        transition: transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1.2);
      }
      .chip:active { transform: scale(0.95); }
      .chip:focus-visible { outline: 2px solid var(--gc-accent); outline-offset: 2px; }
      ha-icon { --mdc-icon-size: 22px; color: var(--gc-chip-icon, var(--chip)); }
      .text { display: flex; flex-direction: column; line-height: 1.2; }
      .label { font-size: 11px; color: var(--gc-text-dim); white-space: nowrap; }
      .value { font-size: 14px; font-weight: 600; white-space: nowrap; font-variant-numeric: tabular-nums; }
    `,
  ];
}

customElements.define("glide-chips", GlideChips);
