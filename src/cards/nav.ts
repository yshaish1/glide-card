import { css, html, nothing, type PropertyValues } from "lit";
import { navigate } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { isActive } from "../core/entity";
import { haptic } from "../core/fire";
import { reducedMotion, springEasing } from "../core/spring";
import type { NavCardConfig, NavItem, NavMenuItem } from "../core/types";

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

/** The bar's own scroll animation; native smooth scrolling is unreliable on iOS with scroll-snap. */
const GLIDE_MS = 450;
const easeOut = (p: number) => 1 - (1 - p) ** 3;

/** Edge padding while the bar scrolls, so a clamped end item clears the fade mask. */
const EDGE = 12;

const usable = (r?: DOMRect): r is DOMRect => !!r && r.width > 0 && r.height > 0;

/** Gap between the bar and its menu, and the menu's minimum distance from the screen edge. */
const MENU_GAP = 8;
const MENU_OPEN = CSS.supports?.("animation-timing-function", "linear(0, 1)")
  ? springEasing(320, 28)
  : { easing: "cubic-bezier(.2,.9,.25,1.1)", duration: 320 };

const isCurrentPath = (p: string) => {
  if (p.startsWith("#")) return decodeURIComponent(location.hash) === p;
  return !location.hash && (location.pathname === p || location.pathname === p.replace(/\/$/, ""));
};

/**
 * Floating pill navigation bar with a sliding active indicator.
 * Items that don't fit scroll sideways (the active one is centred); `pinned` items stay at the end.
 *
 * The indicator lives inside the active button, so where it rests never depends on scroll
 * offsets, text direction or layout timing; moves between items are animated FLIP style.
 */
export class GlideNav extends GlideBase<NavCardConfig> {
  protected readonly cardType = "nav" as const;
  private onRoute = () => {
    this.closeMenu();
    this.requestUpdate();
  };
  /** Route of the last render; HA re-attaches cached views, which miss route events while detached. */
  private rendered?: string;
  private stale = false;
  private from?: DOMRect;
  private centred?: string;
  /**
   * Watches the bar and its items: HA often renders a view's nav before it's laid out, and the bar
   * keeps settling (pinned items, icons) after the first reveal. Any size change re-reveals.
   */
  private resizer?: ResizeObserver;
  /** The user touched the bar since the last reveal: leave their scrolling alone. */
  private touched = false;
  /** Frame of the scroll animation in flight; resizes retarget it instead of jumping. */
  private glide?: number;
  /** The route changed before the bar was laid out: the slide (scroll + indicator) runs once it is. */
  private pending?: { scroll?: number; rect?: DOMRect };
  /** The item whose menu is open. */
  private menuFor?: NavItem;
  /** The button that opened it, which the menu sits above. */
  private menuAnchor?: HTMLElement;

  setConfig(config: NavCardConfig) {
    if (!Array.isArray(config.items) || !config.items.length) throw new Error("Nav needs an `items` list");
    for (const i of config.items) {
      if (i.items ? !Array.isArray(i.items) || !i.items.length : !i.navigation_path)
        throw new Error(`Nav item "${i.name}" needs a \`navigation_path\` or an \`items\` list`);
    }
    super.setConfig(config);
  }

  protected watched() {
    return this.config.items.flatMap((i) => [i.entity, ...(i.items ?? []).map((c) => c.entity)]);
  }

  private openMenu(item: NavItem, anchor: HTMLElement, keyboard: boolean) {
    this.menuFor = item;
    this.menuAnchor = anchor;
    window.addEventListener("pointerdown", this.onOutside, true);
    window.addEventListener("keydown", this.onKey);
    window.addEventListener("resize", this.closeMenu);
    this.requestUpdate();
    this.updateComplete.then(() => {
      const menu = this.renderRoot.querySelector<HTMLElement>(".menu");
      if (!menu) return;
      if (keyboard) menu.querySelector<HTMLElement>("button")?.focus();
      if (reducedMotion()) return;
      menu.animate(
        [
          { opacity: 0, transform: `translateY(${MENU_GAP}px) scale(.92)` },
          { opacity: 1, transform: "none" },
        ],
        MENU_OPEN,
      );
    });
  }

  private closeMenu = () => {
    if (!this.menuFor) return;
    this.menuFor = this.menuAnchor = undefined;
    window.removeEventListener("pointerdown", this.onOutside, true);
    window.removeEventListener("keydown", this.onKey);
    window.removeEventListener("resize", this.closeMenu);
    this.requestUpdate();
  };

  /** A tap anywhere but the menu or its own button closes it (the button toggles it itself). */
  private onOutside = (e: Event) => {
    const path = e.composedPath();
    const menu = this.renderRoot.querySelector(".menu");
    if ((menu && path.includes(menu)) || (this.menuAnchor && path.includes(this.menuAnchor))) return;
    this.closeMenu();
  };

  private onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    const anchor = this.menuAnchor;
    this.closeMenu();
    anchor?.focus();
  };

  /** Above the button, lined up with its outer edge (the one nearer the screen edge) and kept on screen. */
  private menuPosition() {
    const r = this.menuAnchor?.getBoundingClientRect();
    if (!r) return "";
    const bottom = `bottom: ${Math.max(MENU_GAP, innerHeight - r.top + MENU_GAP)}px;`;
    return r.left + r.width / 2 > innerWidth / 2
      ? `${bottom} right: ${Math.max(MENU_GAP, innerWidth - r.right)}px; transform-origin: bottom right;`
      : `${bottom} left: ${Math.max(MENU_GAP, r.left)}px; transform-origin: bottom left;`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.observe();
    ROUTE_EVENTS.forEach((e) => window.addEventListener(e, this.onRoute));
    if (this.rendered !== undefined && this.rendered !== route()) {
      this.stale = true; // its own indicator is on an old item: don't slide from there
      this.requestUpdate();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.closeMenu();
    this.resizer?.disconnect();
    const scroller = this.scroller();
    if (scroller) this.stopGlide(scroller);
    ROUTE_EVENTS.forEach((e) => window.removeEventListener(e, this.onRoute));
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return 1;
  }

  /** A menu item is current when any of its entries is. */
  private isCurrent(item: NavItem) {
    return item.items ? item.items.some((c) => isCurrentPath(c.navigation_path)) : isCurrentPath(item.navigation_path!);
  }

  private indRect() {
    return this.renderRoot.querySelector(".ind")?.getBoundingClientRect();
  }

  private scroller() {
    return this.renderRoot.querySelector<HTMLElement>(".scroller") ?? undefined;
  }

  /** Overflow measured without the edge padding that `.overflow` adds, so the class can't flip-flop. */
  private markOverflow(scroller: HTMLElement) {
    const pad = scroller.classList.contains("overflow") ? 2 * EDGE : 0;
    scroller.classList.toggle("overflow", scroller.scrollWidth - pad > scroller.clientWidth + 1);
  }

  /** The active item is fully inside the bar, clear of the edge fade (or the bar doesn't scroll). */
  private inView(scroller: HTMLElement) {
    const active = scroller.querySelector<HTMLElement>("button.active");
    if (!active || !scroller.classList.contains("overflow")) return true;
    const s = scroller.getBoundingClientRect(), a = active.getBoundingClientRect();
    return a.left >= s.left + EDGE - 2 && a.right <= s.right - EDGE + 2;
  }

  /**
   * Centre the active item. Near either end the browser clamps the scroll, so it lands fully in view
   * at that end instead. Rect deltas work the same in LTR and RTL (where scrollLeft is negative).
   * Done once per route, so state updates don't undo the user's own scrolling.
   */
  private reveal(smooth: boolean) {
    const scroller = this.scroller();
    if (!scroller || scroller.clientWidth <= 0) return; // not laid out yet: the ResizeObserver retries
    this.markOverflow(scroller);
    if (this.pending) {
      // Late layout: start from where the tapped bar was and animate from there, same as an on-time one
      if (this.pending.scroll !== undefined) scroller.scrollLeft = this.pending.scroll;
      this.slide(this.pending.rect);
      this.pending = undefined;
      smooth = true;
    }
    smooth &&= !reducedMotion();
    this.centred = route();
    this.touched = false;
    this.stopGlide(scroller);
    const active = scroller.querySelector<HTMLElement>("button.active");
    if (!active) return;
    const s = scroller.getBoundingClientRect(), a = active.getBoundingClientRect();
    const start = scroller.scrollLeft;
    scroller.scrollLeft = start + a.left + a.width / 2 - (s.left + s.width / 2);
    const end = scroller.scrollLeft; // read back: the browser clamps it to the scroll range
    if (!smooth || Math.abs(end - start) < 1) return;

    // Animated by hand, frame by frame. Snapping is off meanwhile so it can't pull the bar elsewhere.
    scroller.scrollLeft = start;
    scroller.style.scrollSnapType = "none";
    const t0 = performance.now();
    const step = (t: number) => {
      if (this.touched) return this.stopGlide(scroller);
      const p = Math.min(1, (t - t0) / GLIDE_MS);
      scroller.scrollLeft = start + (end - start) * easeOut(p);
      if (p < 1) this.glide = requestAnimationFrame(step);
      else {
        this.stopGlide(scroller);
        this.recheck(); // layout may have moved the target meanwhile
      }
    };
    this.glide = requestAnimationFrame(step);
  }

  private stopGlide(scroller: HTMLElement) {
    if (this.glide !== undefined) cancelAnimationFrame(this.glide);
    this.glide = undefined;
    scroller.style.scrollSnapType = "";
  }

  private recheck() {
    const scroller = this.scroller();
    if (!scroller) return;
    this.markOverflow(scroller);
    if (this.centred !== route()) this.reveal(false);
    else if (!this.touched && (this.glide !== undefined || !this.inView(scroller))) this.reveal(true);
  }

  /** FLIP the indicator from where it was (`from`, viewport coords) to where it is now. */
  private slide(from?: DOMRect) {
    const ind = this.renderRoot.querySelector<HTMLElement>(".ind");
    const to = ind?.getBoundingClientRect();
    if (!ind || !usable(from) || !usable(to) || reducedMotion()) return;
    if (Math.abs(from.left - to.left) + Math.abs(from.width - to.width) <= 1) return;
    ind.animate(
      [
        { transform: `translateX(${from.left - to.left}px)`, width: `${from.width}px` },
        { transform: "none", width: "100%" },
      ],
      SLIDE,
    );
  }

  private observe() {
    const scroller = this.scroller();
    if (!scroller || !this.resizer) return;
    this.resizer.observe(scroller);
    scroller.querySelectorAll("button").forEach((b) => this.resizer!.observe(b));
  }

  protected firstUpdated() {
    const scroller = this.scroller();
    if (!scroller) return;
    const touch = () => (this.touched = true);
    for (const e of ["touchstart", "pointerdown", "wheel"]) scroller.addEventListener(e, touch, { passive: true });
    if (typeof ResizeObserver === "undefined") return;
    this.resizer = new ResizeObserver(() => this.recheck());
    this.observe();
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
    const scroller = this.scroller();
    if (!scroller) return;
    this.markOverflow(scroller);

    // Slide in from the old spot. Only when the route changed, so a state update mid-slide doesn't
    // restart it. A card that didn't show the old spot (another view's nav, or a cached view coming
    // back) takes the tapped one's position and scroll, so it carries on exactly where that one was.
    const h = handoff && performance.now() - handoff.at < HANDOFF_MS ? handoff : undefined;
    const own = moved ? this.from : undefined;
    const inherit = !own && (moved || first) ? h : undefined;
    const from = own ?? inherit?.rect;
    if (moved || first) {
      // Not laid out yet (HA renders a view's nav before showing it): hold the slide until it is
      const laidOut = scroller.clientWidth > 0;
      this.pending = laidOut || (!from && !inherit) ? undefined : { scroll: inherit?.scroll, rect: from };
      if (laidOut) {
        if (inherit) scroller.scrollLeft = inherit.scroll;
        this.slide(from);
      }
    }

    this.observe(); // items may have changed
    if (this.centred !== now) this.reveal(!!this.centred || !!inherit);
  }

  /** Navigate, leaving the indicator's spot for the next view's nav to slide on from. */
  private go(path: string, from: Element) {
    const rect = this.indRect();
    const scroll = this.scroller()?.scrollLeft ?? 0;
    handoff = usable(rect) ? { rect, scroll, at: performance.now() } : undefined;
    navigate(path, from);
  }

  private tapFx(e: Event) {
    haptic("selection");
    const btn = e.currentTarget as HTMLElement;
    this.playTapFx(btn, e instanceof MouseEvent && e.detail ? { x: e.clientX, y: e.clientY } : undefined, { icon: btn.querySelector("ha-icon") });
  }

  private on = (entity?: string) => !!entity && isActive(this.stateOf(entity));

  private item(item: NavItem) {
    const current = this.isCurrent(item);
    const open = this.menuFor === item;
    return html`
      <button
        class="${current ? "active" : ""} ${open ? "open" : ""}"
        aria-current=${current ? "page" : "false"}
        aria-haspopup=${item.items ? "menu" : nothing}
        aria-expanded=${item.items ? String(open) : nothing}
        @click=${(e: Event) => {
          this.tapFx(e);
          const btn = e.currentTarget as HTMLElement;
          if (!item.items) return this.go(item.navigation_path!, btn);
          if (open) this.closeMenu();
          else this.openMenu(item, btn, e instanceof MouseEvent && !e.detail);
        }}
      >
        ${current ? html`<span class="ind"></span>` : nothing}
        <ha-icon .icon=${item.icon}></ha-icon>
        <span class="meta">${item.name}</span>
        ${this.on(item.entity) || item.items?.some((c) => this.on(c.entity)) ? html`<i class="dot"></i>` : nothing}
      </button>
    `;
  }

  private menuItem(item: NavMenuItem) {
    const current = isCurrentPath(item.navigation_path);
    return html`
      <button
        role="menuitem"
        class=${current ? "active" : ""}
        aria-current=${current ? "page" : "false"}
        @click=${(e: Event) => {
          this.tapFx(e);
          const anchor = this.menuAnchor;
          this.closeMenu();
          // From the menu button, so a pop-up morphs out of the bar rather than a row that's gone
          if (!current) this.go(item.navigation_path, anchor ?? (e.currentTarget as Element));
        }}
      >
        <ha-icon .icon=${item.icon}></ha-icon>
        <span class="label">${item.name}</span>
        ${this.on(item.entity) ? html`<i class="dot"></i>` : nothing}
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
      ${this.menuFor?.items
        ? html`<div class="menu surface" role="menu" aria-label=${this.menuFor.name} style=${this.menuPosition()}>
            ${this.menuFor.items.map((i) => this.menuItem(i))}
          </div>`
        : nothing}
    `;
  }

  static styles = [
    surface,
    css`
      nav {
        display: flex;
        padding: 4px;
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
        padding-inline: ${EDGE}px;
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
        flex: none;
        scroll-snap-align: center;
        min-width: 64px;
        padding: 4px 14px;
        border-radius: var(--gc-radius-control);
        color: var(--gc-text-dim);
        cursor: pointer;
        transition: color 0.2s;
      }
      @media (max-width: 600px) {
        button { min-width: 52px; padding: 4px 6px; }
      }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      button.active { color: var(--gc-accent-text); }
      button ha-icon { --mdc-icon-size: 20px; }
      button .meta { font-size: 10px; line-height: 1.25; color: inherit; }
      .dot {
        position: absolute;
        top: 3px;
        inset-inline-end: 14px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--gc-accent);
      }
      /* Slim: icons only; the active item shows its name beside the icon. Compact is the same as full. */
      :host([size="slim"]) nav button { flex-direction: row; gap: 6px; min-width: 40px; padding: 7px 9px; }
      :host([size="slim"]) nav button:not(.active) .meta { display: none; }
      :host([size="slim"]) nav button.active { padding-inline: 12px 14px; }
      :host([size="slim"]) nav button .meta { font-size: 12px; }
      :host([size="slim"]) nav .dot { top: 4px; inset-inline-end: 6px; }
      button.open:not(.active) { color: var(--gc-text); }

      /* The menu is the bar's sibling: inside it, the bar's clipping and backdrop would cut it off. */
      .menu {
        position: fixed;
        z-index: 6;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 180px;
        max-width: calc(100vw - ${2 * MENU_GAP}px);
        max-height: 60vh;
        overflow-y: auto;
        padding: 4px;
        border-radius: var(--gc-radius);
        background: var(--gc-sheet-bg);
      }
      .menu button {
        flex-direction: row;
        gap: 12px;
        min-width: 0;
        padding: 10px 14px;
        border-radius: max(6px, calc(var(--gc-radius) - 4px));
        color: var(--gc-text);
        scroll-snap-align: none;
        transition: background 0.15s;
      }
      .menu button:hover { background: color-mix(in srgb, var(--gc-text) 7%, transparent); }
      .menu button.active {
        color: var(--gc-accent-text);
        background: color-mix(in srgb, var(--gc-accent) 22%, transparent);
      }
      .menu button ha-icon { flex: none; color: var(--gc-text-dim); }
      .menu button.active ha-icon { color: inherit; }
      .menu .label { flex: 1; font-size: 14px; line-height: 1.3; }
      .menu .dot { position: static; flex: none; }
    `,
  ];
}

customElements.define("glide-nav", GlideNav);
