import { css, html, nothing, type PropertyValues } from "lit";
import { popupOrigin } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { entityIcon } from "../core/entity";
import { haptic } from "../core/fire";
import { formatState, t } from "../core/i18n";
import { reducedMotion, springEasing } from "../core/spring";
import type { HomeAssistant, PopupCardConfig } from "../core/types";

const WIDE = "(min-width: 768px)";
const DISMISS_PX = 120;
const DISMISS_VELOCITY = 0.6; // px per ms
// Events HA handles on its root element; the sheet lives in <body>, so we forward them.
const FORWARD = ["hass-more-info", "show-dialog", "hass-notification", "hass-action", "ll-custom"];

const supportsLinear = CSS.supports?.("animation-timing-function", "linear(0, 1)");
const spring = (stiffness?: number, damping?: number) =>
  supportsLinear ? springEasing(stiffness, damping) : { easing: "cubic-bezier(.2,.9,.25,1)", duration: 420 };

let openCount = 0;
const lockScroll = (on: boolean) => {
  openCount = Math.max(0, openCount + (on ? 1 : -1));
  document.documentElement.style.overflow = openCount ? "hidden" : "";
};

/** One full-screen sheet per popup hash, mounted in <body> so it escapes dashboard stacking. */
export class GlideSheet extends GlideBase<PopupCardConfig> {
  static properties = { ...GlideBase.properties, open: { type: Boolean, reflect: true } };
  protected readonly cardType = "popup" as const;
  open = false;
  private children_: HTMLElement[] = [];
  private built = false;
  private origin?: DOMRect;

  constructor() {
    super();
    for (const type of FORWARD) this.addEventListener(type, this.forward);
    this.addEventListener("keydown", (e) => e.key === "Escape" && this.requestClose());
  }

  private forward = (e: Event) => {
    const root = document.querySelector("home-assistant");
    if (!root || (e as any).__glideForwarded) return;
    e.stopPropagation();
    const copy = new CustomEvent(e.type, { detail: (e as CustomEvent).detail, bubbles: true, composed: true });
    (copy as any).__glideForwarded = true;
    root.dispatchEvent(copy);
  };

  setHass(hass: HomeAssistant) {
    this.hass = hass;
    for (const c of this.children_) (c as any).hass = hass;
  }

  private async build() {
    if (this.built) return;
    this.built = true;
    const helpers = await (window as any).loadCardHelpers?.();
    if (!helpers) return;
    this.children_ = (this.config.cards ?? []).map((cfg) => {
      // Glide children inherit the popup's theme unless they set their own.
      const conf = cfg.type === "custom:glide-card" && !cfg.theme && this.config.theme ? { ...cfg, theme: this.config.theme } : cfg;
      const el = helpers.createCardElement(conf) as HTMLElement & Record<string, any>;
      if (this.hass) el.hass = this.hass;
      const g = el.getGridOptions?.() ?? {};
      el.style.setProperty("--cols", String(typeof g.columns === "number" ? g.columns : 12));
      if (typeof g.rows === "number") el.style.setProperty("--rows", String(g.rows));
      return el;
    });
    this.requestUpdate();
  }

  requestClose() {
    if (!this.open) return;
    haptic("light");
    if (history.state?.glidePopup) history.back();
    else {
      history.replaceState(history.state, "", location.pathname + location.search);
      window.dispatchEvent(new CustomEvent("glide-hash"));
    }
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (!changed.has("open") || (changed.get("open") === undefined && !this.open)) return;
    if (this.open) {
      this.build();
      this.origin = popupOrigin;
      lockScroll(true);
      this.animateOpen();
    } else {
      lockScroll(false);
      this.animateClose();
    }
  }

  private get panel() {
    return this.renderRoot.querySelector<HTMLElement>(".panel")!;
  }
  private get scrim() {
    return this.renderRoot.querySelector<HTMLElement>(".scrim")!;
  }

  private animateOpen() {
    this.style.visibility = "visible";
    const panel = this.panel;
    panel.getAnimations().forEach((a) => a.cancel());
    panel.style.transform = "";
    panel.focus({ preventScroll: true });
    this.scrim.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "backwards" });
    if (reducedMotion()) return;
    const { easing, duration } = spring();
    const o = this.origin;
    const p = panel.getBoundingClientRect();
    if (o && o.width && o.bottom > 0 && o.top < innerHeight) {
      // FLIP morph: start exactly over the tile that opened us.
      const from = `translate(${o.left - p.left}px, ${o.top - p.top}px) scale(${o.width / p.width}, ${o.height / p.height})`;
      panel.style.transformOrigin = "0 0";
      panel
        .animate([{ transform: from, opacity: 0.5 }, { transform: "none", opacity: 1 }], { duration, easing, fill: "backwards" })
        .finished.then(() => (panel.style.transformOrigin = ""), () => (panel.style.transformOrigin = ""));
      this.renderRoot.querySelector(".content")?.animate([{ opacity: 0 }, { opacity: 0, offset: 0.35 }, { opacity: 1 }], { duration, fill: "backwards" });
    } else if (matchMedia(WIDE).matches) {
      panel.animate([{ transform: "scale(.92)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration, easing, fill: "backwards" });
    } else {
      panel.animate([{ transform: "translateY(100%)" }, { transform: "none" }], { duration, easing, fill: "backwards" });
    }
  }

  private animateClose() {
    const panel = this.panel;
    const current = panel.style.transform || "none";
    const wide = matchMedia(WIDE).matches;
    const to = wide ? { transform: "scale(.94)", opacity: 0 } : { transform: "translateY(100%)", opacity: 1 };
    const dur = reducedMotion() ? 0 : 260;
    this.scrim.animate([{ opacity: getComputedStyle(this.scrim).opacity }, { opacity: 0 }], { duration: dur, fill: "forwards" });
    const anim = panel.animate([{ transform: current, opacity: 1 }, to], { duration: dur, easing: "cubic-bezier(.4,0,.8,.4)", fill: "forwards" });
    anim.finished
      .then(() => {
        if (this.open) return;
        this.style.visibility = "hidden";
        panel.style.transform = "";
        panel.getAnimations().forEach((a) => a.cancel());
        this.scrim.getAnimations().forEach((a) => a.cancel());
      })
      .catch(() => {});
  }

  /** Drag the sheet down by its header to dismiss (phones only). */
  private onDragStart(e: PointerEvent) {
    if (matchMedia(WIDE).matches || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("button")) return;
    const panel = this.panel;
    const handle = e.currentTarget as HTMLElement;
    const y0 = e.clientY;
    let last = { y: y0, t: e.timeStamp }, v = 0, dy = 0;
    handle.setPointerCapture(e.pointerId);
    panel.getAnimations().forEach((a) => a.cancel());
    const move = (ev: PointerEvent) => {
      dy = ev.clientY - y0;
      const dt = ev.timeStamp - last.t;
      if (dt > 0) v = (ev.clientY - last.y) / dt;
      last = { y: ev.clientY, t: ev.timeStamp };
      const y = dy > 0 ? dy : dy * 0.2; // rubber band upward
      panel.style.transform = `translateY(${y}px)`;
      this.scrim.style.opacity = String(1 - Math.max(0, dy) / panel.offsetHeight);
    };
    const end = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", end);
      handle.removeEventListener("pointercancel", end);
      this.scrim.style.opacity = "";
      if (dy > DISMISS_PX || v > DISMISS_VELOCITY) return this.requestClose();
      const { easing, duration } = spring(260, 24);
      const from = panel.style.transform;
      panel.style.transform = "";
      panel.animate([{ transform: from }, { transform: "none" }], { duration, easing });
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  }

  protected render() {
    if (!this.config) return nothing;
    const c = this.config;
    const s = this.stateOf(c.entity);
    return html`
      <div class="scrim" @click=${() => this.requestClose()}></div>
      <div class="panel surface" role="dialog" aria-modal="true" aria-label=${c.title ?? ""} tabindex="-1">
        <div class="handle" @pointerdown=${(e: PointerEvent) => this.onDragStart(e)}>
          <div class="grabber"></div>
          <header>
            ${c.icon || s ? html`<div class="icon"><ha-icon .icon=${c.icon ?? entityIcon(s)}></ha-icon></div>` : nothing}
            <div class="titles">
              <div class="title">${c.title ?? ""}</div>
              ${s && this.hass ? html`<div class="meta">${formatState(this.hass, c.entity!)}</div>` : nothing}
            </div>
            <button class="close" aria-label=${t(this.hass, "close")} @click=${() => this.requestClose()}>
              <ha-icon icon="mdi:close" .icon=${"mdi:close"}></ha-icon>
            </button>
          </header>
        </div>
        <div class="content">${this.children_}</div>
      </div>
    `;
  }

  static styles = [
    surface,
    css`
      :host {
        position: fixed;
        inset: 0;
        z-index: 7;
        visibility: hidden;
        pointer-events: none;
      }
      :host([open]) { pointer-events: auto; }
      :host([lite]) .scrim { backdrop-filter: none; -webkit-backdrop-filter: none; }
      .scrim {
        position: absolute;
        inset: 0;
        background: var(--gc-scrim);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
      }
      .panel {
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        max-height: 92dvh;
        display: flex;
        flex-direction: column;
        background: var(--gc-sheet-bg);
        border-radius: var(--gc-radius) var(--gc-radius) 0 0;
        border-bottom: 0;
        transform-origin: 50% 50%;
        outline: none;
        will-change: transform;
      }
      .handle { touch-action: none; cursor: grab; flex: none; }
      .grabber {
        width: 40px;
        height: 5px;
        margin: 8px auto 2px;
        border-radius: 3px;
        background: var(--gc-text-dim);
        opacity: 0.5;
      }
      header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px 12px;
      }
      .icon {
        display: grid;
        place-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: color-mix(in srgb, var(--gc-accent) 20%, transparent);
        color: var(--gc-accent-text);
      }
      .titles { flex: 1; min-width: 0; }
      .title { font-size: 22px; font-weight: 700; }
      .close {
        all: unset;
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--gc-surface);
        border: 1px solid var(--gc-border);
        color: var(--gc-text);
        cursor: pointer;
      }
      .close:focus-visible { outline: 2px solid var(--gc-accent); }
      .content {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-auto-rows: minmax(56px, auto);
        gap: var(--gc-gap);
        padding: 4px 16px calc(20px + env(safe-area-inset-bottom));
        overflow-y: auto;
        overscroll-behavior: contain;
      }
      .content > * { grid-column: span var(--cols, 12); grid-row: span var(--rows, 1); min-width: 0; }
      @media (min-width: 768px) {
        .panel {
          inset: 50% auto auto 50%;
          bottom: auto;
          width: min(600px, 92vw);
          max-height: 85dvh;
          translate: -50% -50%;
          border-radius: var(--gc-radius);
          border-bottom: 1px solid var(--gc-border);
        }
        .grabber { visibility: hidden; height: 0; margin: 6px; }
        .handle { cursor: default; }
      }
    `,
  ];
}

customElements.define("glide-sheet", GlideSheet);

// ---- Registry: hash -> sheet, kept in sync with the URL ----

const sheets = new Map<string, GlideSheet>();
let currentHass: HomeAssistant | undefined;

const norm = (hash: string) => (hash.startsWith("#") ? hash : `#${hash}`);

export function registerPopup(config: PopupCardConfig) {
  const hash = norm(config.hash);
  let el = sheets.get(hash);
  if (!el) {
    el = document.createElement("glide-sheet") as GlideSheet;
    document.body.appendChild(el);
    sheets.set(hash, el);
  }
  el.setConfig(config);
  if (currentHass) el.setHass(currentHass);
  syncSheets();
}

export function unregisterPopup(hash: string) {
  const el = sheets.get(norm(hash));
  if (!el) return;
  el.remove();
  sheets.delete(norm(hash));
}

export function setSheetsHass(hass: HomeAssistant) {
  currentHass = hass;
  sheets.forEach((el) => el.setHass(hass));
}

export function syncSheets() {
  const h = decodeURIComponent(location.hash);
  sheets.forEach((el, hash) => (el.open = hash === h));
}

for (const ev of ["popstate", "hashchange", "glide-hash", "location-changed"]) window.addEventListener(ev, syncSheets);
