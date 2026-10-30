import { css, html, nothing } from "lit";
import { GlideBase } from "../core/base-card";
import type { ClockCardConfig } from "../core/types";

/** A large clock with the weekday and date, plus an optional entity line. No surface, sits on the background. */
export class GlideClock extends GlideBase<ClockCardConfig> {
  protected readonly cardType = "clock" as const;
  private timer?: ReturnType<typeof setTimeout>;

  protected watched() {
    return [this.config?.secondary_entity];
  }

  connectedCallback() {
    super.connectedCallback();
    this.tick();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.timer);
  }

  /** Re-render on the next second or minute boundary, so the clock never runs late. */
  private tick = () => {
    this.requestUpdate();
    const ms = this.config?.seconds ? 1000 - (Date.now() % 1000) : 60_000 - (Date.now() % 60_000);
    this.timer = setTimeout(this.tick, ms + 20);
  };

  getGridOptions() {
    return { columns: 12 };
  }

  getCardSize() {
    return 3;
  }

  protected render() {
    const c = this.config;
    if (!c) return nothing;
    const lang = this.hass?.language ?? navigator.language;
    const now = new Date();
    const time = now.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit", second: c.seconds ? "2-digit" : undefined, hourCycle: "h23" });
    const date = now.toLocaleDateString(lang, { weekday: "long", day: "numeric", month: "long" });
    const s = c.secondary_entity ? this.hass?.states[c.secondary_entity]?.state : undefined;
    const second = s && s !== "unknown" && s !== "unavailable" ? s : "";
    return html`
      <div class="wrap">
        <div class="time">${time}</div>
        <div class="date">${date}${second ? html`<span class="dot">·</span><span>${second}</span>` : nothing}</div>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; font-family: var(--gc-font); color: var(--gc-text); }
    .wrap { padding: 16px 4px 4px; text-align: center; }
    .time {
      font-size: clamp(56px, 14vw, 104px);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      direction: ltr;
    }
    .date { margin-top: 10px; font-size: clamp(15px, 3.6vw, 19px); color: var(--gc-text-dim); }
    .dot { margin: 0 8px; }
    :host([size="compact"]) .time { font-size: clamp(44px, 11vw, 80px); }
    :host([size="slim"]) .time { font-size: clamp(34px, 8vw, 56px); }
  `;
}

customElements.define("glide-clock", GlideClock);
