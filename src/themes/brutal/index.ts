import type { GlideTheme } from "../types";

// Brutalist: paper, thick black outlines, hard offset shadows and flat poster colours.
export const brutal: GlideTheme = {
  id: "brutal",
  name: "Brutalist",
  version: "1.0.0",
  description: "Thick black outlines, hard shadows, flat yellow",
  preview: { background: "#f4f0e8", surface: "#ffffff", accent: "#ffd400" },
  tokens: {
    base: {
      "--gc-font": "'Space Grotesk', 'Archivo', 'Arial Black', system-ui, sans-serif",
      "--gc-font-meta": "'Space Mono', ui-monospace, monospace",
      "--gc-meta-transform": "uppercase",
      "--gc-meta-spacing": "0.04em",
      "--gc-radius": "10px",
      "--gc-radius-control": "6px",
      "--gc-gap": "14px",
      "--gc-fill-strength": "100%",
    },
    dark: {
      "--gc-ink": "#f4f0e8",
      "--gc-pale": "#f4f0e8",
      "--gc-text": "#f4f0e8",
      "--gc-text-dim": "#b8b2a6",
      "--gc-accent": "#ffd400",
      "--gc-on-accent": "#111111",
      "--gc-surface": "#1b1b1b",
      "--gc-surface-on": "#ffd400",
      "--gc-surface-solid": "#2a2a2a",
      "--gc-border": "#f4f0e8",
      "--gc-shadow": "5px 5px 0 #f4f0e8",
      "--gc-sheet-bg": "#161616",
      "--gc-scrim": "rgba(0,0,0,.6)",
      "--gc-light": "#ffd400",
      "--gc-fan": "#00f0ff",
      "--gc-heat": "#ff2a5f",
      "--gc-cool": "#2563eb",
      "--gc-cover": "#b18cff",
      "--gc-media": "#ff2a5f",
    },
    light: {
      "--gc-ink": "#111111",
      "--gc-pale": "#ffffff",
      "--gc-text": "#111111",
      "--gc-text-dim": "#55524c",
      "--gc-accent": "#ffd400",
      "--gc-on-accent": "#111111",
      "--gc-accent-text": "#111111",
      "--gc-surface": "#ffffff",
      "--gc-surface-on": "#ffd400",
      "--gc-surface-solid": "#ffffff",
      "--gc-border": "#111111",
      "--gc-shadow": "5px 5px 0 #111111",
      "--gc-sheet-bg": "#f4f0e8",
      "--gc-scrim": "rgba(0,0,0,.35)",
      "--gc-light": "#ffd400",
      "--gc-fan": "#00f0ff",
      "--gc-heat": "#ff2a5f",
      "--gc-cool": "#2563eb",
      "--gc-cover": "#b18cff",
      "--gc-media": "#ff2a5f",
    },
  },
  styles: {
    all: `.surface{border-width:3px}.name,.title{font-weight:700;text-transform:uppercase;letter-spacing:.01em}.name{font-size:14px}`,
    // On = solid flat domain colour with black ink, outlines everywhere.
    button:
      `.surface.on:not(.cover){background:color-mix(in srgb,var(--domain) 45%,var(--gc-pale));color:#111}` +
      `.surface.on:not(.cover) .meta{color:#111}` +
      `.surface:active{transform:translate(3px,3px);box-shadow:2px 2px 0 var(--gc-ink)}` +
      `.icon{border:2px solid var(--gc-ink);border-radius:8px;color:var(--gc-text)}` +
      `.on .icon,.surface.on:not(.cover) .icon{background:#fff;border-color:#111;color:#111}` +
      `.badge{border:2px solid currentColor;border-radius:4px;font-weight:700}` +
      `.fill{border-inline-end:3px solid #111}.surface.on.nofill{background:var(--domain)}.cover .fill{border-top:3px solid var(--gc-ink);border-radius:0}`,
    chips: `.chip{border:2px solid var(--gc-ink);box-shadow:3px 3px 0 var(--gc-ink)}`,
    climate: `.round,.modes button{border:2px solid var(--gc-ink);border-radius:6px;box-shadow:2px 2px 0 var(--gc-ink)}`,
    nav: `.ind{background:var(--gc-accent);border:2px solid var(--gc-ink)}button.active:has(.ind){color:#111}`,
  },
  defaults: { buttonLayout: "tile" },
};
