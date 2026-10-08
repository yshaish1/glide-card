import type { GlideTheme } from "../types";

// iOS 26 "Liquid Glass": frosted translucent surfaces, specular edge, warm accents.
export const glass: GlideTheme = {
  id: "glass",
  name: "Liquid Glass",
  version: "1.0.0",
  description: "Frosted translucent tiles with a warm glow",
  preview: { background: "linear-gradient(135deg,#2a1d14,#14121c)", surface: "rgba(255,255,255,.1)", accent: "#ff9f43" },
  tokens: {
    base: {
      "--gc-font": "-apple-system, 'SF Pro Display', Inter, system-ui, sans-serif",
      "--gc-font-meta": "ui-monospace, 'SF Mono', 'JetBrains Mono', monospace",
      "--gc-meta-spacing": "0.08em",
      "--gc-backdrop": "blur(24px) saturate(1.6)",
      "--gc-radius": "28px",
    },
    dark: {
      "--gc-text": "#f5f5f7",
      "--gc-text-dim": "rgba(235,235,245,.55)",
      "--gc-accent": "#ff9f43",
      "--gc-on-accent": "#1c1206",
      "--gc-surface": "rgba(255,255,255,.06)",
      "--gc-surface-on": "rgba(255,255,255,.1)",
      "--gc-border": "rgba(255,255,255,.12)",
      "--gc-highlight": "rgba(255,255,255,.08)",
      "--gc-shadow": "0 10px 30px rgba(0,0,0,.35)",
      "--gc-sheet-bg": "rgba(28,26,32,.72)",
    },
    light: {
      "--gc-text": "#1c1c1e",
      "--gc-text-dim": "rgba(60,60,67,.6)",
      "--gc-accent": "#f08a1c",
      "--gc-on-accent": "#ffffff",
      "--gc-accent-text": "#b35f00",
      "--gc-surface": "rgba(255,255,255,.55)",
      "--gc-surface-on": "rgba(255,255,255,.8)",
      "--gc-border": "rgba(255,255,255,.75)",
      "--gc-highlight": "rgba(255,255,255,.9)",
      "--gc-shadow": "0 8px 24px rgba(30,20,10,.1)",
      "--gc-sheet-bg": "rgba(250,248,245,.78)",
      "--gc-scrim": "rgba(0,0,0,.2)",
    },
  },
  defaults: { buttonLayout: "tile" },
};
