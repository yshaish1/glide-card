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
      // Soft pastels; each card picks one by its seed (see seedOf).
      "--gc-tint-1": "#bfe6da",
      "--gc-tint-2": "#c8ddf3",
      "--gc-tint-3": "#dcd4f2",
      "--gc-tint-4": "#f6dac6",
      "--gc-tint-5": "#ebe0c4",
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
      "--gc-tint-strength": "16%",
      "--gc-wash-strength": "6%",
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
      "--gc-tint-strength": "60%",
      "--gc-wash-strength": "30%",
    },
  },
  styles: {
    // Every card gets its own tinted glass: a faint wash plus one soft corner glow.
    all:
      `.surface{background-image:` +
      `radial-gradient(130% 100% at var(--gc-glow-at,100% 100%),color-mix(in srgb,var(--gc-tint,transparent) var(--gc-tint-strength),transparent),transparent 70%),` +
      `linear-gradient(160deg,color-mix(in srgb,var(--gc-tint,transparent) var(--gc-wash-strength),transparent),transparent 65%)}`,
    // Things that are on glow in their own color instead of the palette.
    button: `.surface.on{--gc-tint:var(--domain)}`,
    // Glass keeps a soft glow under the dial's value arc.
    // Climate already carries its mode color (strip, arc, chip), so it keeps a calm palette tint.
    climate: `.surface{--gc-tint-strength:var(--gc-wash-strength)}.value{filter:drop-shadow(0 0 6px color-mix(in srgb,var(--mode) 45%,transparent))}`,
    media: `.surface.playing{--gc-tint:var(--gc-media)}`,
    chips: `.chip{--gc-tint-strength:var(--gc-wash-strength)}`,
  },
  defaults: { buttonLayout: "tile" },
};
