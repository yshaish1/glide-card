import { css, html, nothing } from "lit";
import { GlideBase } from "../core/base-card";
import type { TitleCardConfig } from "../core/types";

/** Page heading: large title with an optional subtitle. No surface, sits on the dashboard background. */
export class GlideTitle extends GlideBase<TitleCardConfig> {
  protected readonly cardType = "title" as const;

  setConfig(config: TitleCardConfig) {
    if (!config.title && !config.subtitle) throw new Error("Title card needs a `title` or `subtitle`");
    super.setConfig(config);
  }

  protected watched() {
    return [];
  }

  getGridOptions() {
    return { columns: 12 };
  }

  getCardSize() {
    return this.size === "full" ? 2 : 1;
  }

  protected render() {
    const c = this.config;
    return html`
      <div class="wrap ${c.align === "start" ? "start" : ""}">
        ${c.title
          ? html`<h1>${c.icon ? html`<ha-icon .icon=${c.icon}></ha-icon>` : nothing}${c.title}</h1>`
          : nothing}
        ${c.subtitle ? html`<p>${c.subtitle}</p>` : nothing}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; font-family: var(--gc-font); color: var(--gc-text); }
    .wrap { padding: 12px 4px 4px; text-align: center; }
    .wrap.start { text-align: start; }
    h1 {
      margin: 0;
      font-size: clamp(26px, 6vw, 36px);
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }
    h1 ha-icon { --mdc-icon-size: 0.9em; margin-inline-end: 10px; vertical-align: -0.08em; color: var(--gc-accent-text); }
    p { margin: 8px 0 0; font-size: 15px; color: var(--gc-text-dim); }
    :host([size="compact"]) .wrap { padding: 8px 4px 2px; }
    :host([size="compact"]) h1 { font-size: clamp(22px, 5vw, 30px); }
    :host([size="compact"]) p { margin-top: 6px; font-size: 14px; }
    :host([size="slim"]) .wrap { padding: 4px 4px 0; }
    :host([size="slim"]) h1 { font-size: clamp(18px, 4.2vw, 24px); font-weight: 750; }
    :host([size="slim"]) h1 ha-icon { margin-inline-end: 8px; }
    :host([size="slim"]) p { margin-top: 4px; font-size: 13px; }
  `;
}

customElements.define("glide-title", GlideTitle);
