import { LitElement, css, type CSSResultOrNative, type PropertyValues } from "lit";
import { resolveDark, resolveThemeId, themeSheet, getTheme } from "../themes";
import type { GlideTheme } from "../themes";
import type { BaseCardConfig, CardType, HomeAssistant } from "./types";

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
    const key = `${id}|${dark}|${this.config.accent ?? ""}|${this.config.lite}`;
    if (key === this.themeKey) return;
    this.themeKey = key;
    this.theme = getTheme(id);
    this.toggleAttribute("dark", dark);
    this.toggleAttribute("lite", isLite(this.config.lite));
    this.dataset.theme = id;
    if (this.config.accent) this.style.setProperty("--gc-accent", this.config.accent);
    else this.style.removeProperty("--gc-accent");
    const base = (this.constructor as typeof LitElement).elementStyles.map((s: CSSResultOrNative) =>
      s instanceof CSSStyleSheet ? s : s.styleSheet!,
    );
    // Theme last so its per-card `styles` can override the card's defaults.
    (this.renderRoot as ShadowRoot).adoptedStyleSheets = [...base, themeSheet(id, dark, this.cardType)];
  }

  protected stateOf(id?: string) {
    return id ? this.hass?.states[id] : undefined;
  }
}
