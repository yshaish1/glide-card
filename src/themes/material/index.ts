import type { GlideTheme } from "../types";

// Material You: tonal teal surfaces, soft expressive shapes, terracotta heat.
export const material: GlideTheme = {
  id: "material",
  name: "Material You",
  version: "1.0.0",
  description: "Soft tonal surfaces from a teal seed",
  preview: { background: "#e6f4ef", surface: "#ffffff", accent: "#006a60" },
  tokens: {
    base: {
      "--gc-font": "'Google Sans', 'Google Sans Text', Roboto, system-ui, sans-serif",
      "--gc-radius": "28px",
      "--gc-heat": "#c8553d",
    },
    dark: {
      "--gc-text": "#dfe9e5",
      "--gc-text-dim": "#8fa39d",
      "--gc-accent": "#5ddbc9",
      "--gc-on-accent": "#00382f",
      "--gc-surface": "#1a2421",
      "--gc-surface-on": "#24413a",
      "--gc-border": "transparent",
      "--gc-sheet-bg": "#16201d",
      "--gc-light": "#ffcf8a",
      "--gc-heat": "#ff9b82",
    },
    light: {
      "--gc-text": "#171d1b",
      "--gc-text-dim": "#5b6b66",
      "--gc-accent": "#006a60",
      "--gc-on-accent": "#ffffff",
      "--gc-surface": "#ffffff",
      "--gc-surface-on": "#d4efe9",
      "--gc-fill-strength": "100%",
      "--gc-icon-on": "#3b4a45",
      "--gc-border": "transparent",
      "--gc-shadow": "0 1px 3px rgba(0,40,30,.08)",
      "--gc-sheet-bg": "#f4faf7",
      "--gc-scrim": "rgba(0,30,25,.25)",
      "--gc-light": "#ffe2b8",
      "--gc-fan": "#9ff0e2",
      "--gc-cover": "#cfe4ff",
    },
  },
  styles: {
    button: `:host(:not([dark])) .on .icon{background:rgba(255,255,255,.55);border-color:transparent}`,
    climate: `.round,.modes button{background:var(--gc-surface-on)}`,
  },
  defaults: { buttonLayout: "tile" },
};
