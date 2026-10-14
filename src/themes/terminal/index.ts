import type { GlideTheme } from "../types";

// Terminal: a phosphor CRT. Monospace, square corners, scanlines; things that are on turn inverse.
export const terminal: GlideTheme = {
  id: "terminal",
  name: "Terminal",
  version: "1.0.0",
  description: "Retro CRT: phosphor green on black, monospace, inverse when on",
  preview: { background: "#05080a", surface: "#071a10", accent: "#39ff88" },
  tokens: {
    base: {
      "--gc-font": "'JetBrains Mono', 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace",
      "--gc-font-meta": "var(--gc-font)",
      "--gc-meta-transform": "uppercase",
      "--gc-meta-spacing": "0.08em",
      "--gc-radius": "3px",
      "--gc-radius-control": "2px",
      "--gc-fill-strength": "26%",
    },
    dark: {
      "--gc-text": "#39ff88",
      "--gc-text-dim": "#5fa37e",
      "--gc-accent": "#39ff88",
      "--gc-on-accent": "#03140a",
      "--gc-surface": "#0c1317",
      "--gc-surface-on": "#0b2416",
      "--gc-surface-solid": "#0a1a12",
      "--gc-border": "#1f6b43",
      "--gc-shadow": "0 0 14px rgba(57,255,136,.12)",
      "--gc-sheet-bg": "#040806",
      "--gc-scrim": "rgba(0,0,0,.7)",
      "--gc-glow": "0 0 6px rgba(57,255,136,.55)",
      "--gc-scan": "rgba(0,0,0,.28)",
      "--gc-light": "#39ff88",
      "--gc-fan": "#39ff88",
      "--gc-cover": "#39ff88",
      "--gc-media": "#39ff88",
      "--gc-heat": "#ffb000",
      "--gc-cool": "#4de8ff",
    },
    light: {
      // Green-on-paper printout for daytime.
      "--gc-text": "#0f3d22",
      "--gc-text-dim": "#4f7a5f",
      "--gc-accent": "#127a3e",
      "--gc-on-accent": "#eaf5e4",
      "--gc-surface": "#eaf2e3",
      "--gc-surface-on": "#cfe8c8",
      "--gc-surface-solid": "#dce9d3",
      "--gc-border": "rgba(18,122,62,.55)",
      "--gc-sheet-bg": "#eef5e8",
      "--gc-scrim": "rgba(10,40,20,.3)",
      "--gc-glow": "none",
      "--gc-scan": "rgba(18,122,62,.05)",
      "--gc-light": "#127a3e",
      "--gc-fan": "#127a3e",
      "--gc-cover": "#127a3e",
      "--gc-media": "#127a3e",
      "--gc-heat": "#b86e00",
      "--gc-cool": "#0f6f8a",
    },
  },
  styles: {
    all:
      `:host{text-shadow:var(--gc-glow)}.name,.title{text-transform:uppercase;letter-spacing:.12em;font-weight:700}` +
      `.surface::after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;` +
      `background:repeating-linear-gradient(to bottom,transparent 0 2px,var(--gc-scan) 2px 3px)}`,
    // Inverse video when on.
    button:
      `.surface.on:not(.cover){background:var(--domain);color:var(--gc-on-accent);text-shadow:none}` +
      `.surface.on:not(.cover) .meta,.surface.on:not(.cover) .icon{color:var(--gc-on-accent)}` +
      `.surface.on:not(.cover) .icon{background:transparent;border-color:var(--gc-on-accent)}` +
      `.surface.on:not(.cover) .badge{border-color:var(--gc-on-accent)}` +
      `.icon{border-radius:2px}` +
      `.fill{background:repeating-linear-gradient(90deg,color-mix(in srgb,var(--domain) 40%,transparent) 0 6px,transparent 6px 8px)}`,
    nav: `.ind{background:var(--gc-accent);border-color:var(--gc-accent)}button.active:has(.ind){color:var(--gc-on-accent);text-shadow:none}`,
    chips: `.chip{border:1px solid var(--gc-border)}`,
    climate: `.round,.modes button{border-radius:2px}`,
  },
  defaults: { buttonLayout: "tile" },
};
