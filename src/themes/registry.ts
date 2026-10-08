import type { CardType, ThemeMode } from "../core/types";
import type { GlideTheme, TokenMap } from "./types";

export const DEFAULT_THEME = "glass";

const themes = new Map<string, GlideTheme>();
const sheets = new Map<string, CSSStyleSheet>();

// Shared fallbacks so a theme only has to define what makes it different.
const BASE: TokenMap = {
  "--gc-font": "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  "--gc-font-meta": "var(--gc-font)",
  "--gc-meta-transform": "none",
  "--gc-meta-spacing": "0",
  "--gc-backdrop": "none",
  "--gc-fill-strength": "38%",
  "--gc-radius": "24px",
  "--gc-radius-control": "999px",
  "--gc-gap": "12px",
  "--gc-highlight": "transparent",
  "--gc-shadow": "none",
  "--gc-accent-text": "var(--gc-accent)",
  "--gc-scrim": "rgba(0, 0, 0, 0.45)",
  "--gc-light": "#ffb340",
  "--gc-fan": "#40c8e0",
  "--gc-heat": "#ff7a1a",
  "--gc-cool": "#4aa8ff",
  "--gc-cover": "#a78bfa",
  "--gc-media": "var(--gc-accent)",
};

export function registerTheme(theme: GlideTheme): void {
  themes.set(theme.id, theme);
  for (const key of sheets.keys()) if (key.startsWith(`${theme.id}|`)) sheets.delete(key);
}

export const getTheme = (id?: string): GlideTheme =>
  (id && themes.get(id)) || themes.get(DEFAULT_THEME)!;

export const listThemes = (): GlideTheme[] => [...themes.values()];

const block = (tokens: TokenMap) =>
  Object.entries(tokens).map(([k, v]) => `${k}:${v};`).join("");

export function themeCss(theme: GlideTheme, dark: boolean, part: CardType): string {
  const tokens = { ...BASE, ...theme.tokens.base, ...(dark ? theme.tokens.dark : theme.tokens.light) };
  return `:host{${block(tokens)}}${theme.styles?.all ?? ""}${theme.styles?.[part] ?? ""}`;
}

/** Cached constructable stylesheet for theme + mode + card part. */
export function themeSheet(id: string | undefined, dark: boolean, part: CardType): CSSStyleSheet {
  const theme = getTheme(id);
  const key = `${theme.id}|${dark ? "d" : "l"}|${part}`;
  let sheet = sheets.get(key);
  if (!sheet) {
    sheet = new CSSStyleSheet();
    sheet.replaceSync(themeCss(theme, dark, part));
    sheets.set(key, sheet);
  }
  return sheet;
}

/** Card config > HA theme variable `glide-theme` > default. */
export function resolveThemeId(configTheme: string | undefined, host: Element): string {
  if (configTheme && themes.has(configTheme)) return configTheme;
  const fromHa = getComputedStyle(host).getPropertyValue("--glide-theme").trim();
  return themes.has(fromHa) ? fromHa : DEFAULT_THEME;
}

export function resolveDark(mode: ThemeMode | undefined, hassDark: boolean | undefined): boolean {
  if (mode === "dark") return true;
  if (mode === "light") return false;
  return hassDark ?? matchMedia("(prefers-color-scheme: dark)").matches;
}
