import { getTheme, listThemes, resolveDark } from "../themes";
import { isLite } from "./base-card";
import { pickBackground, resolveBackdrop, viewIndexFor, type Backdrop } from "./backdrops";
import type { BackgroundCardConfig, HomeAssistant } from "./types";

/*
 * Paints the dashboard background behind HA's views. One fixed layer sits right after HA's own
 * `hui-view-background` inside `hui-view-container` (same stacking, painted on top of it), so cards,
 * popups and the nav bar are untouched. A watcher picks the background card for the current view
 * from the dashboard config, so it also works on views without any Glide card.
 */

const LAYER_CLASS = "glide-backdrop";
let layer: HTMLDivElement | undefined;
let drift: Animation | undefined;
let lastKey = "";
let preview: BackgroundCardConfig | undefined;
let rootCache: HTMLElement | undefined;

/** Finds the first element matching `tag`, descending through open shadow roots. */
function findDeep(start: ParentNode, tag: string, depth = 0): HTMLElement | undefined {
  const hit = start.querySelector?.(tag) as HTMLElement | null;
  if (hit) return hit;
  if (depth > 12) return undefined;
  for (const el of start.querySelectorAll?.("*") ?? []) {
    if (el.shadowRoot) {
      const found = findDeep(el.shadowRoot, tag, depth + 1);
      if (found) return found;
    }
  }
  return undefined;
}

let lastSearch = 0;
/** The dashboard root. The deep search is throttled on other panels (Settings etc.) unless forced by navigation. */
function huiRoot(force = false): HTMLElement | undefined {
  if (rootCache?.isConnected) return rootCache;
  rootCache = undefined;
  if (!force && Date.now() - lastSearch < 10000) return undefined;
  lastSearch = Date.now();
  rootCache = findDeep(document, "hui-root");
  return rootCache;
}

/** Where the layer goes: after HA's view background, or the page itself outside HA (playground). */
function mountPoint(root?: HTMLElement): { parent: Node; after?: Element } | undefined {
  if (!root) return { parent: document.body };
  const container = root.shadowRoot?.querySelector("hui-view-container");
  if (!container) return undefined;
  const haBg = container.querySelector(":scope > hui-view-background") ?? undefined;
  return { parent: container, after: haBg };
}

function stillMotion(): boolean {
  return isLite() || matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function draw(b: Backdrop, at: { parent: Node; after?: Element }) {
  if (!layer) {
    layer = document.createElement("div");
    layer.className = LAYER_CLASS;
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;";
  }
  const placed = at.after ? at.after.nextSibling === layer : layer.parentNode === at.parent;
  if (!placed) {
    if (at.after) at.after.after(layer);
    else at.parent.insertBefore(layer, at.parent.firstChild);
  }
  const pad = b.image ? b.blur * 2 : 0;
  const scene = document.createElement("div");
  scene.style.cssText =
    `position:absolute;inset:${b.animate ? "-12%" : `-${pad}px`};background:${b.background};` +
    (b.image ? `background:url("${b.image.replace(/"/g, "%22")}") center/cover no-repeat,${b.background};filter:blur(${b.blur}px);` : "");
  const veil = document.createElement("div");
  veil.style.cssText = `position:absolute;inset:0;background:${b.dark ? "#000" : "#fff"};opacity:${b.dim};`;
  drift?.cancel();
  layer.replaceChildren(scene, ...(b.dim ? [veil] : []));
  drift = b.animate
    ? scene.animate(
        [{ transform: "translate(-4%,-3%) rotate(0deg) scale(1)" }, { transform: "translate(4%,3%) rotate(4deg) scale(1.08)" }],
        { duration: 45000, iterations: Infinity, direction: "alternate", easing: "ease-in-out" },
      )
    : undefined;
}

export function clearBackdrop() {
  drift?.cancel();
  drift = undefined;
  layer?.remove();
  lastKey = "";
}

/** Paints one background card's config now (used directly by the playground and the editor preview). */
export function paintBackdrop(config: BackgroundCardConfig, hass?: HomeAssistant, mount?: { parent: Node; after?: Element }) {
  const at = mount ?? mountPoint(huiRoot(true));
  if (!at) return;
  const themes = new Set(listThemes().map((t) => t.id));
  const fromHa = getComputedStyle(document.documentElement).getPropertyValue("--glide-theme").trim();
  const themeId = config.theme && themes.has(config.theme) ? config.theme : themes.has(fromHa) ? fromHa : undefined;
  const dark = resolveDark(config.mode, hass?.themes?.darkMode);
  const night = hass?.states?.["sun.sun"]?.state === "below_horizon";
  const b = resolveBackdrop(config, { dark, night, themeBackground: getTheme(themeId).background, still: stillMotion() });
  const key = JSON.stringify(b);
  if (key === lastKey && layer?.isConnected && (at.after ? at.after.nextSibling === layer : layer.parentNode === at.parent)) return;
  lastKey = key;
  draw(b, at);
}

/** While a background card is being edited, its live config wins over the saved one. */
export function setBackdropPreview(config: BackgroundCardConfig | undefined) {
  preview = config;
  tick(true);
}

function tick(force = false) {
  const root = huiRoot(force) as (HTMLElement & { lovelace?: { config?: { views?: any[] } }; hass?: HomeAssistant }) | undefined;
  if (!root) {
    if (layer?.isConnected && layer.parentNode !== document.body) clearBackdrop();
    return;
  }
  const views = root.lovelace?.config?.views;
  const config = preview ?? pickBackground(views, viewIndexFor(views, location.pathname));
  if (!config) {
    if (layer?.isConnected) clearBackdrop();
    return;
  }
  paintBackdrop(config, root.hass);
}

let started = false;
/** Installs the watcher once: on navigation, plus a light poll for dark mode, sun and re-rendered views. */
export function startBackdropWatcher() {
  if (started || typeof window === "undefined") return;
  started = true;
  const later = () => setTimeout(() => tick(true), 50);
  window.addEventListener("location-changed", later);
  window.addEventListener("popstate", later);
  setInterval(() => tick(), 2000);
  later();
}
