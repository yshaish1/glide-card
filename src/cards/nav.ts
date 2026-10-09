import { css, html, nothing, type PropertyValues } from "lit";
import { navigate } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { isActive } from "../core/entity";
import { haptic } from "../core/fire";
import { reducedMotion, springEasing } from "../core/spring";
import type { NavCardConfig, NavItem } from "../core/types";

const ROUTE_EVENTS = ["popstate", "location-changed", "glide-hash"];
const route = () => location.pathname + location.hash;
const SLIDE = CSS.supports?.("animation-timing-function", "linear(0, 1)")
  ? springEasing(260, 26)
  : { easing: "cubic-bezier(.3,1.3,.4,1)", duration: 450 };

/**
 * Where the indicator was when an item was tapped. HA gives every view its own nav card, so the
 * card on the next view picks this up and slides from the same spot.
 */
let handoff: { rect: DOMRect; scroll: number; at: number } | undefined;
const HANDOFF_MS = 1000;

const usable = (r?: DOMRect): r is DOMRect => !!r && r.width > 0 && r.height > 0;

/**
 * Floating pill navigation bar with a sliding active indicator.
 * Items that don't fit scroll sideways (the active one is centred); `pinned` items stay at the end.
 *
 * The indicator lives inside the active button, so where it rests never depends on scroll
 * offsets, text direction or layout timing; moves between items are animated FLIP style.
 */
export class GlideNav extends GlideBase<NavCardConfig> {
  protected readonly cardType = "nav" as const;
  private onRoute = () => this.requestUpdate();
  /** Route of the last render; HA re-attaches cached views, which miss route events while detached. */
  private rendered?: string;
  private stale = false;
  private from?: DOMRect;
  private centred?: string;

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
    if (this.rendered !== undefined && this.rendered !== route()) {
      this.stale = true; // its own indicator is on an old item: don't slide from there
      this.requestUpdate();
    }
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

  private indRect() {
    return this.renderRoot.querySelector(".ind")?.getBoundingClientRect();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);
    // Includes any in-flight animation, so quick taps retarget from where the indicator is now.
    this.from = this.stale ? undefined : this.indRect();
  }

  protected updated() {
    const now = route();
    const first = this.rendered === undefined;
    const moved = !first && this.rendered !== now;
    this.rendered = now;
    this.stale = false;
    const scroller = this.renderRoot.querySelector<HTMLElement>(".scroller");
    if (!scroller) return;
    scroller.classList.toggle("overflow", scroller.scrollWidth > scroller.clientWidth + 1);
    const ind = this.renderRoot.querySelector<HTMLElement>(".ind");
    if (!ind) return;

    // Slide in from the old spot. Only when the route changed, so a state update mid-slide doesn't
    // restart it. A card that didn't show the old spot (another view's nav, or a cached view coming
    // back) takes the tapped one's position and scroll, so it carries on exactly where that one was.
    const h = handoff && performance.now() - handoff.at < HANDOFF_MS ? handoff : undefined;
    const own = moved ? this.from : undefined;
    const inherit = !own && (moved || first) ? h : undefined;
    if (inherit) scroller.scrollLeft = inherit.scroll;
    const from = own ?? inherit?.rect;
    const to = ind.getBoundingClientRect();
    if (usable(from) && usable(to) && !reducedMotion() && Math.abs(from.left - to.left) + Math.abs(from.width - to.width) > 1) {
      ind.animate(
        [
          { transform: `translateX(${from.left - to.left}px)`, width: `${from.width}px` },
          { transform: "none", width: "100%" },
        ],
        SLIDE,
      );
    }

    // Centre the active item once per route, so state updates don't undo the user's own scrolling.
    // Rect deltas work the same in LTR and RTL (where scrollLeft is negative).
    const active = scroller.querySelector<HTMLElement>("button.active");
    if (active && this.centred !== now && scroller.clientWidth > 0) {
      const s = scroller.getBoundingClientRect(), a = active.getBoundingClientRect();
      const behavior = this.centred || inherit ? "smooth" : "instant";
      scroller.scrollBy({ left: a.left + a.width / 2 - (s.left + s.width / 2), behavior });
      this.centred = now;
    }
  }

  private item(item: NavItem) {
    const current = this.isCurrent(item);
    return html`
      <button
        class=${current ? "active" : ""}
        aria-current=${current ? "page" : "false"}
        @click=${(e: Event) => {
          haptic("selection");
          const rect = this.indRect();
          const scroll = this.renderRoot.querySelector(".scroller")?.scrollLeft ?? 0;
          handoff = usable(rect) ? { rect, scroll, at: performance.now() } : undefined;
          navigate(item.navigation_path, e.currentTarget as Element);
        }}
      >
        ${current ? html`<span class="ind"></span>` : nothing}
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
        <div class="scroller">${this.config.items.filter((i) => !i.pinned).map((i) => this.item(i))}</div>
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
      /* Physical left so the FLIP translateX maps 1:1 in both directions */
      .ind {
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        border-radius: var(--gc-radius-control);
        background: color-mix(in srgb, var(--gc-accent) 22%, transparent);
        border: 1px solid color-mix(in srgb, var(--gc-accent) 45%, transparent);
        pointer-events: none;
      }
      button {
        all: unset;
        position: relative;
        isolation: isolate;
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
