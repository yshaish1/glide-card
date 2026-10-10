import { LitElement, css, type CSSResultOrNative, type PropertyValues } from "lit";
import { resolveDark, resolveThemeId, themeSheet, getTheme } from "../themes";
import type { GlideTheme } from "../themes";
import { playTap, resolveTapEffect } from "./tap-fx";
import type { BaseCardConfig, CardSize, CardType, HomeAssistant } from "./types";

export const CARD_SIZES: CardSize[] = ["full", "compact", "slim"];
const isSize = (v: unknown): v is CardSize => CARD_SIZES.includes(v as CardSize);

/**
 * Card config > HA theme variable `glide-size` > "full". The variable is read from the card, then from
 * the page root (where HA puts theme variables), so it also works before the card is attached.
 */
export function resolveSize(configSize: string | undefined, host: Element): CardSize {
  if (isSize(configSize)) return configSize;
  for (const el of [host, document.documentElement]) {
    const v = getComputedStyle(el).getPropertyValue("--glide-size").trim();
    if (isSize(v)) return v;
  }
  return "full";
}

/** Shared look every card type builds on; values come only from theme tokens. */
export const surface = css`
  :host {
    display: block;
    font-family: var(--gc-font);
    color: var(--gc-text);
    -webkit-tap-highlight-color: transparent;
  }
  .surface {
    position: relative;
    box-sizing: border-box;
    background: var(--gc-surface);
    border: 1px solid var(--gc-border);
    border-radius: var(--gc-radius);
    box-shadow: var(--gc-shadow), inset 0 1px 0 var(--gc-highlight);
    backdrop-filter: var(--gc-backdrop);
    -webkit-backdrop-filter: var(--gc-backdrop);
    overflow: hidden;
  }
  .meta {
    font-family: var(--gc-font-meta);
    letter-spacing: var(--gc-meta-spacing);
    text-transform: var(--gc-meta-transform);
    font-size: 12px;
    color: var(--gc-text-dim);
  }
  /* Monospace + tracking reads as broken letters in Hebrew/Arabic: use the body font there. */
  .meta:lang(he),
  .meta:lang(ar),
  .meta:lang(fa) {
    font-family: var(--gc-font);
    letter-spacing: 0;
  }
  /* "none" also drops the press shrink each card sets on :active. */
  :host([tap-fx="none"]) *:active {
    transform: none !important;
  }
  ha-icon {
    --mdc-icon-size: 22px;
    display: inline-flex;
  }
  :host([lite]) .surface {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  @media (prefers-reduced-transparency: reduce) {
    .surface {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
  }
`;

/**
 * Lite mode (no backdrop blur): per-card `lite`, else a per-device override
 * (`localStorage["glide-card-lite"] = "1" | "0"`), else auto on low-memory devices.
 */
export function isLite(configLite?: boolean): boolean {
  if (configLite !== undefined) return configLite;
  try {
    const v = localStorage.getItem("glide-card-lite");
    if (v === "1" || v === "0") return v === "1";
  } catch {
    /* storage blocked */
  }
  const mem = (navigator as { deviceMemory?: number }).deviceMemory;
  return mem !== undefined && mem <= 2;
}

const GLOW_AT = ["100% 100%", "0% 100%", "100% 0%", "15% 0%", "85% 110%", "0% 30%"];

/**
 * A stable per-card seed (same on every device) that themes can paint with:
 * `--gc-tint` picks one of the theme's `--gc-tint-1..5` swatches and
 * `--gc-glow-at` a corner for its glow. Themes without those tokens ignore it.
 */
export function seedOf(config: object): { tint: number; glowAt: string } {
  const c = config as { entity?: string; name?: string; title?: string };
  const key = c.entity ?? c.name ?? c.title ?? JSON.stringify(config);
  let h = 0x811c9dc5; // FNV-1a
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 0x01000193) >>> 0;
  return { tint: (h % 5) + 1, glowAt: GLOW_AT[(h >>> 8) % GLOW_AT.length] };
}

/**
 * Base for all Glide cards:
 * - applies the active theme as an adopted stylesheet (cached per theme/mode/part)
 * - re-renders on `hass` changes only when a watched entity actually changed
 */
export abstract class GlideBase<C extends BaseCardConfig = BaseCardConfig> extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    editMode: { type: Boolean, attribute: "edit-mode" },
  };

  hass?: HomeAssistant;
  config!: C;
  editMode = false;
  protected abstract readonly cardType: CardType;
  protected theme: GlideTheme = getTheme();
  private themeKey = "";

  /** Entity ids whose changes should trigger a re-render. */
  protected watched(): (string | undefined)[] {
    return [(this.config as { entity?: string }).entity];
  }

  setConfig(config: C) {
    this.config = config;
    const seed = seedOf(config);
    this.style.setProperty("--gc-tint", `var(--gc-tint-${seed.tint})`);
    this.style.setProperty("--gc-glow-at", seed.glowAt);
    this.theme = getTheme(config.theme); // early guess so layout getters work before first render
  }

  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    if (changed.size > 1 || !changed.has("hass")) return true;
    const old = changed.get("hass") as HomeAssistant | undefined;
    if (!old || !this.hass) return true;
    if (old.themes?.darkMode !== this.hass.themes?.darkMode || old.language !== this.hass.language) return true;
    return this.watched().some((id) => id && old.states[id] !== this.hass!.states[id]);
  }

  protected willUpdate(changed: PropertyValues<this>) {
    super.willUpdate(changed);
    this.applyTheme();
  }

  protected applyTheme() {
    if (!this.config) return;
    const id = resolveThemeId(this.config.theme, this);
    const dark = resolveDark(this.config.mode, this.hass?.themes?.darkMode);
    const key = `${id}|${dark}|${this.config.accent ?? ""}|${this.config.lite}|${this.config.tap_animation ?? ""}|${this.config.size ?? ""}`;
    if (key === this.themeKey) return;
    this.themeKey = key;
    this.theme = getTheme(id);
    this.toggleAttribute("dark", dark);
    this.toggleAttribute("lite", isLite(this.config.lite));
    this.dataset.theme = id;
    this.setAttribute("tap-fx", resolveTapEffect(this.config.tap_animation, this));
    this.setAttribute("size", this.size);
    if (this.config.accent) this.style.setProperty("--gc-accent", this.config.accent);
    else this.style.removeProperty("--gc-accent");
    const base = (this.constructor as typeof LitElement).elementStyles.map((s: CSSResultOrNative) =>
      s instanceof CSSStyleSheet ? s : s.styleSheet!,
    );
    // Theme last so its per-card `styles` can override the card's defaults.
    (this.renderRoot as ShadowRoot).adoptedStyleSheets = [...base, themeSheet(id, dark, this.cardType)];
  }

  /**
   * Plays the card's tap animation on `el`. `point` is in client coordinates (centre if absent);
   * the colour comes from the element's --domain / --chip / --c, else the accent.
   */
  protected playTapFx(el: HTMLElement, point?: { x: number; y: number }, parts: { icon?: Element | null; badge?: Element | null } = {}) {
    const effect = resolveTapEffect(this.config.tap_animation, this);
    const box = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const color = ["--domain", "--chip", "--c", "--gc-accent"].map((v) => cs.getPropertyValue(v).trim()).find(Boolean) ?? "#ff9f43";
    playTap(el, effect, { x: point && point.x - box.left, y: point && point.y - box.top, color, ...parts });
  }

  /** Full / compact / slim; cards style themselves with `:host([size="…"])`. */
  get size(): CardSize {
    return resolveSize(this.config?.size, this);
  }

  protected stateOf(id?: string) {
    return id ? this.hass?.states[id] : undefined;
  }
}
