import { css, html, nothing } from "lit";
import { runAction } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { cssColor, domainColor, entityIcon } from "../core/entity";
import { compactValue } from "../core/format";
import type { ChipConfig, HeadingCardConfig } from "../core/types";

/** Click position, or none for keyboard clicks (detail 0) so the effect starts from the centre. */
const pointOf = (e: Event) => (e instanceof MouseEvent && e.detail ? { x: e.clientX, y: e.clientY } : undefined);

/** Section heading: title with a fading divider, optional icon, subtitle, mini badges and a link chevron. */
export class GlideHeading extends GlideBase<HeadingCardConfig> {
  protected readonly cardType = "heading" as const;

  setConfig(config: HeadingCardConfig) {
    if (!config.title) throw new Error("Heading needs a `title`");
    super.setConfig(config);
  }

  protected watched() {
    return (this.config.badges ?? []).map((b) => b.entity);
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return 1;
  }

  private tap(e: Event) {
    const action = this.config.tap_action;
    const el = e.currentTarget as HTMLElement;
    this.playTapFx(el, pointOf(e), { icon: el.querySelector(".icon") });
    if (action && this.hass) runAction(e.currentTarget as HTMLElement, this.hass, action);
  }

  private badge(b: ChipConfig) {
    const s = this.stateOf(b.entity);
    const value = b.value ?? (s && this.hass ? compactValue(this.hass, s, b.attribute) : "");
    const color = cssColor(b.color) ?? (s ? domainColor(s) : "var(--gc-accent)");
    return html`
      <button
        class="badge surface"
        style="--c:${color}"
        @click=${(e: Event) => {
          e.stopPropagation();
          const el = e.currentTarget as HTMLElement;
          this.playTapFx(el, pointOf(e), { icon: el.querySelector("ha-icon") });
          if (this.hass) runAction(e.currentTarget as HTMLElement, this.hass, b.tap_action ?? { action: "more-info" }, b.entity);
        }}
      >
        ${b.icon || s ? html`<ha-icon .icon=${entityIcon(s, b.icon)}></ha-icon>` : nothing}
        <span>${value}</span>
      </button>
    `;
  }

  protected render() {
    const c = this.config;
    const linked = !!c.tap_action && c.tap_action.action !== "none";
    return html`
      <div class="row ${c.style === "subtitle" ? "small" : ""} ${linked ? "linked" : ""}" @click=${linked ? this.tap : undefined}
        role=${linked ? "link" : "heading"} tabindex=${linked ? "0" : "-1"}>
        ${c.icon ? html`<span class="icon" style="--c:${cssColor(c.color) ?? "var(--gc-accent)"}"><ha-icon .icon=${c.icon}></ha-icon></span>` : nothing}
        <span class="title">${c.title}</span>
        ${c.subtitle ? html`<span class="sub">${c.subtitle}</span>` : nothing}
        ${linked ? html`<ha-icon class="chev" icon="mdi:chevron-right" .icon=${"mdi:chevron-right"}></ha-icon>` : nothing}
        <span class="line"></span>
        ${(c.badges ?? []).map((b) => this.badge(b))}
      </div>
    `;
  }

  static styles = [
    surface,
    css`
      :host { height: 100%; }
      .row {
        height: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: flex-end;
        gap: 10px;
        padding: 0 4px 6px;
        min-height: 40px;
      }
      .row.linked { cursor: pointer; }
      .row.linked:focus-visible { outline: 2px solid var(--gc-accent); border-radius: 8px; }
      .icon {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        flex: none;
        border-radius: 50%;
        color: var(--c);
        background: color-mix(in srgb, var(--c) 18%, transparent);
        --mdc-icon-size: 18px;
      }
      .title {
        font-size: 19px;
        font-weight: 750;
        letter-spacing: -0.01em;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .small .title { font-size: 14px; font-weight: 600; color: var(--gc-text-dim); line-height: 24px; }
      .small .icon { width: 24px; height: 24px; --mdc-icon-size: 15px; }
      .sub {
        font-family: var(--gc-font-meta);
        letter-spacing: var(--gc-meta-spacing);
        font-size: 12px;
        line-height: 30px;
        color: var(--gc-text-dim);
        white-space: nowrap;
      }
      .sub:lang(he), .sub:lang(ar) { font-family: var(--gc-font); letter-spacing: 0; }
      .chev {
        --mdc-icon-size: 20px;
        color: var(--gc-text-dim);
        /* Same 30px line box as the title, bottom-aligned with it, so the chevron sits on the text's middle */
        display: flex;
        align-items: center;
        height: 30px;
        align-self: flex-end;
        flex: none;
        margin-inline-start: -6px;
      }
      .small .chev { height: 24px; --mdc-icon-size: 18px; }
      .chev:dir(rtl) { transform: scaleX(-1); }
      /* Divider fading out after the title */
      .line {
        flex: 1;
        min-width: 12px;
        height: 1px;
        margin-bottom: 14px;
        background: linear-gradient(to var(--gc-line-dir, right), color-mix(in srgb, var(--gc-text) 18%, transparent), transparent);
        opacity: 0.9;
      }
      .line:dir(rtl) { --gc-line-dir: left; }
      .badge {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        height: 28px;
        padding-inline: 8px 10px;
        border-radius: var(--gc-radius-control);
        border: 1px solid var(--gc-border);
        background: var(--gc-surface);
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        cursor: pointer;
        flex: none;
        --mdc-icon-size: 16px;
      }
      .badge ha-icon { color: var(--c); }
      .badge:focus-visible { outline: 2px solid var(--gc-accent); }

      :host([size="compact"]) .row { min-height: 34px; padding-bottom: 5px; }
      :host([size="compact"]) .icon { width: 26px; height: 26px; --mdc-icon-size: 16px; }
      :host([size="compact"]) .title { font-size: 17px; line-height: 26px; }
      :host([size="compact"]) .sub { line-height: 26px; }
      :host([size="compact"]) .chev { height: 26px; --mdc-icon-size: 18px; }
      :host([size="compact"]) .line { margin-bottom: 12px; }
      :host([size="compact"]) .badge { height: 25px; font-size: 11.5px; --mdc-icon-size: 15px; }
      :host([size="slim"]) .row { min-height: 28px; padding-bottom: 4px; gap: 8px; }
      :host([size="slim"]) .icon { width: 22px; height: 22px; --mdc-icon-size: 14px; }
      :host([size="slim"]) .title { font-size: 15px; line-height: 22px; }
      :host([size="slim"]) .sub { font-size: 11px; line-height: 22px; }
      :host([size="slim"]) .chev { height: 22px; --mdc-icon-size: 16px; }
      :host([size="slim"]) .line { margin-bottom: 10px; }
      :host([size="slim"]) .badge { height: 22px; padding-inline: 7px 8px; font-size: 11px; --mdc-icon-size: 13px; }
    `,
  ];
}

customElements.define("glide-heading", GlideHeading);
