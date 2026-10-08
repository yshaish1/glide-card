import { css, html, nothing } from "lit";
import { navigate } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { isActive } from "../core/entity";
import { haptic } from "../core/fire";
import type { NavCardConfig, NavItem } from "../core/types";

const ROUTE_EVENTS = ["popstate", "location-changed", "glide-hash"];

/** Floating pill navigation bar with a sliding active indicator. */
export class GlideNav extends GlideBase<NavCardConfig> {
  protected readonly cardType = "nav" as const;
  private onRoute = () => this.requestUpdate();

  setConfig(config: NavCardConfig) {
    if (!Array.isArray(config.items) || !config.items.length) throw new Error("Nav needs an `items` list");
    super.setConfig(config);
  }

  protected watched() {
    return this.config.items.map((i) => i.entity);
  }

  connectedCallback() {
    super.connectedCallback();
    ROUTE_EVENTS.forEach((e) => window.addEventListener(e, this.onRoute));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    ROUTE_EVENTS.forEach((e) => window.removeEventListener(e, this.onRoute));
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return 1;
  }

  private isCurrent(item: NavItem) {
    const p = item.navigation_path;
    if (p.startsWith("#")) return decodeURIComponent(location.hash) === p;
    return !location.hash && (location.pathname === p || location.pathname === p.replace(/\/$/, ""));
  }

  protected updated() {
    // Slide the indicator under the active item.
    const active = this.renderRoot.querySelector<HTMLElement>("button.active");
    const ind = this.renderRoot.querySelector<HTMLElement>(".indicator");
    if (!ind) return;
    if (!active) return void (ind.style.opacity = "0");
    ind.style.opacity = "1";
    ind.style.width = `${active.offsetWidth}px`;
    ind.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  protected render() {
    return html`
      <nav class="surface ${this.editMode ? "inline" : "floating"}">
        <div class="indicator"></div>
        ${this.config.items.map(
          (item) => html`
            <button
              class=${this.isCurrent(item) ? "active" : ""}
              aria-current=${this.isCurrent(item) ? "page" : "false"}
              @click=${(e: Event) => {
                haptic("selection");
                navigate(item.navigation_path, e.currentTarget as Element);
              }}
            >
              <ha-icon .icon=${item.icon}></ha-icon>
              <span class="meta">${item.name}</span>
              ${item.entity && isActive(this.stateOf(item.entity)) ? html`<i class="dot"></i>` : nothing}
            </button>
          `,
        )}
      </nav>
    `;
  }

  static styles = [
    surface,
    css`
      nav {
        display: flex;
        gap: 4px;
        padding: 6px;
        border-radius: var(--gc-radius-control);
        background: var(--gc-sheet-bg);
      }
      nav.floating {
        position: fixed;
        z-index: 5;
        inset-inline: 0;
        bottom: calc(14px + env(safe-area-inset-bottom));
        margin: 0 auto;
        width: max-content;
        max-width: calc(100vw - 24px);
      }
      .indicator {
        position: absolute;
        top: 6px;
        bottom: 6px;
        left: 0;
        border-radius: var(--gc-radius-control);
        background: color-mix(in srgb, var(--gc-accent) 22%, transparent);
        border: 1px solid color-mix(in srgb, var(--gc-accent) 45%, transparent);
        box-sizing: border-box;
        transition: transform 0.45s cubic-bezier(0.3, 1.3, 0.4, 1), width 0.45s cubic-bezier(0.3, 1.3, 0.4, 1), opacity 0.2s;
        pointer-events: none;
      }
      button {
        all: unset;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        min-width: 64px;
        padding: 8px 14px;
        border-radius: var(--gc-radius-control);
        color: var(--gc-text-dim);
        cursor: pointer;
        transition: color 0.2s;
      }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      button.active { color: var(--gc-accent-text); }
      button .meta { font-size: 11px; color: inherit; }
      .dot {
        position: absolute;
        top: 6px;
        inset-inline-end: 14px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--gc-accent);
      }
    `,
  ];
}

customElements.define("glide-nav", GlideNav);
