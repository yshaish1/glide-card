import type { GlideTheme } from "../types";

// Refined Bubble: solid carbon surfaces, full-width pill rows, one electric accent. Fast on tablets.
export const bubble: GlideTheme = {
  id: "bubble",
  name: "Refined Bubble",
  version: "1.0.0",
  description: "Compact solid pills with a neon accent, no blur",
  preview: { background: "#0a0a0c", surface: "#16161a", accent: "#d4ff00" },
  tokens: {
    base: {
      "--gc-font": "'Inter Tight', Inter, system-ui, sans-serif",
      "--gc-font-meta": "ui-monospace, 'JetBrains Mono', monospace",
      "--gc-meta-spacing": "0.06em",
      "--gc-radius": "26px",
      "--gc-gap": "10px",
    },
    dark: {
      "--gc-text": "#f2f2f2",
      "--gc-text-dim": "#8b8b93",
      "--gc-accent": "#d4ff00",
      "--gc-on-accent": "#0a0a0c",
      "--gc-surface": "#16161a",
      "--gc-surface-on": "#2a3300",
      "--gc-fill-strength": "22%",
      "--gc-border": "rgba(255,255,255,.08)",
      "--gc-sheet-bg": "#111114",
      "--gc-scrim": "rgba(0,0,0,.6)",
      "--gc-light": "#d4ff00",
      "--gc-fan": "#d4ff00",
      "--gc-heat": "#d4ff00",
      "--gc-cover": "#d4ff00",
    },
    light: {
      "--gc-text": "#0a0a0c",
      "--gc-text-dim": "#6b6b73",
      "--gc-accent": "#c6f000",
      "--gc-on-accent": "#0a0a0c",
      "--gc-accent-text": "#4d6b00",
      "--gc-surface": "#ffffff",
      "--gc-surface-on": "#efffb3",
      "--gc-border": "rgba(0,0,0,.08)",
      "--gc-sheet-bg": "#f6f6f8",
      "--gc-scrim": "rgba(0,0,0,.3)",
      "--gc-light": "#c6f000",
      "--gc-fan": "#c6f000",
      "--gc-heat": "#c6f000",
      "--gc-cover": "#c6f000",
    },
  },
  styles: {
    // Active fills end in a hard accent edge, like the mockup.
    button: `.fill{box-shadow:inset -2px 0 0 var(--gc-accent)}.cover .fill{box-shadow:inset 0 2px 0 var(--gc-accent);border-top-color:transparent}`,
  },
  defaults: { buttonLayout: "pill" },
};
