import { css, html, nothing } from "lit";
import { navigate } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { isActive } from "../core/entity";
import { haptic } from "../core/fire";
import type { NavCardConfig, NavItem } from "../core/types";

const ROUTE_EVENTS = ["popstate", "location-changed", "glide-hash"];

/**
 * Floating pill navigation bar with a sliding active indicator.
 * Items that don't fit scroll sideways (the active one is centred); `pinned` items stay at the end.
 */
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

  private centred?: string;

  protected updated() {
    const scroller = this.renderRoot.querySelector<HTMLElement>(".scroller");
    const ind = this.renderRoot.querySelector<HTMLElement>(".indicator");
    if (!scroller || !ind) return;
    scroller.classList.toggle("overflow", scroller.scrollWidth > scroller.clientWidth + 1);
    const active = scroller.querySelector<HTMLElement>("button.active");
    if (!active) return void (ind.style.opacity = "0");
    // Centre the active item once per route, so state updates don't undo the user's own scrolling.
    // Rect deltas work the same in LTR and RTL (where scrollLeft is negative).
    let s = scroller.getBoundingClientRect(), a = active.getBoundingClientRect();
    const route = location.pathname + location.hash;
    if (this.centred !== route) {
      scroller.scrollBy({ left: a.left + a.width / 2 - (s.left + s.width / 2), behavior: this.centred ? "smooth" : "instant" });
      this.centred = route;
      s = scroller.getBoundingClientRect();
      a = active.getBoundingClientRect();
    }
    // Slide the indicator under it, in the scroller's content coordinates.
    ind.style.opacity = "1";
    ind.style.width = `${a.width}px`;
    ind.style.transform = `translateX(${a.left - s.left + scroller.scrollLeft}px)`;
  }

  private item(item: NavItem) {
    const current = this.isCurrent(item);
    return html`
      <button
        class=${current ? "active" : ""}
        aria-current=${current ? "page" : "false"}
        @click=${(e: Event) => {
          haptic("selection");
          navigate(item.navigation_path, e.currentTarget as Element);
        }}
      >
        <ha-icon .icon=${item.icon}></ha-icon>
        <span class="meta">${item.name}</span>
        ${item.entity && isActive(this.stateOf(item.entity)) ? html`<i class="dot"></i>` : nothing}
      </button>
    `;
  }

  protected render() {
    const pinned = this.config.items.filter((i) => i.pinned);
    return html`
      <nav class="surface ${this.editMode ? "inline" : "floating"}">
        <div class="scroller">
          <div class="indicator"></div>
          ${this.config.items.filter((i) => !i.pinned).map((i) => this.item(i))}
        </div>
        ${pinned.length ? html`<div class="pinned">${pinned.map((i) => this.item(i))}</div>` : nothing}
      </nav>
    `;
  }

  static styles = [
    surface,
    css`
      nav {
        display: flex;
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
      .scroller {
        position: relative;
        display: flex;
        gap: 4px;
        min-width: 0;
        overflow-x: auto;
        scroll-snap-type: x proximity;
        scrollbar-width: none;
        overscroll-behavior-x: contain;
      }
      .scroller::-webkit-scrollbar { display: none; }
      .scroller.overflow {
        mask-image: linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent);
      }
      .pinned {
        display: flex;
        gap: 4px;
        flex: none;
        margin-inline-start: 4px;
        padding-inline-start: 4px;
        border-inline-start: 1px solid var(--gc-border);
      }
      .pinned button.active {
        background: color-mix(in srgb, var(--gc-accent) 22%, transparent);
      }
      .indicator {
        position: absolute;
        top: 0;
        bottom: 0;
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
        flex: none;
        scroll-snap-align: center;
        min-width: 64px;
        padding: 8px 14px;
        border-radius: var(--gc-radius-control);
        color: var(--gc-text-dim);
        cursor: pointer;
        transition: color 0.2s;
      }
      @media (max-width: 600px) {
        button { min-width: 52px; padding: 8px 6px; }
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
