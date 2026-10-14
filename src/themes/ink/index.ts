import type { GlideTheme } from "../types";

// E-Ink: paper and ink only. Serif names, hairlines, no colour, blur or shadow; light on slow wall tablets.
export const ink: GlideTheme = {
  id: "ink",
  name: "E-Ink",
  version: "1.0.0",
  description: "Monochrome paper and serif type, inverted when on",
  preview: { background: "#efede6", surface: "#efede6", accent: "#161616" },
  tokens: {
    base: {
      "--gc-font": "Newsreader, 'Source Serif 4', 'Iowan Old Style', Georgia, serif",
      "--gc-font-meta": "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
      "--gc-meta-transform": "uppercase",
      "--gc-meta-spacing": "0.12em",
      "--gc-radius": "4px",
      "--gc-radius-control": "4px",
      "--gc-fill-strength": "100%",
    },
    dark: {
      "--gc-text": "#e9e6dc",
      "--gc-text-dim": "#8f8c84",
      "--gc-accent": "#e9e6dc",
      "--gc-on-accent": "#141414",
      "--gc-accent-text": "#e9e6dc",
      "--gc-surface": "#161616",
      "--gc-surface-on": "#e9e6dc",
      "--gc-surface-solid": "#262626",
      "--gc-border": "rgba(233,230,220,.28)",
      "--gc-sheet-bg": "#141414",
      "--gc-scrim": "rgba(0,0,0,.6)",
      "--gc-hatch": "rgba(233,230,220,.35)",
      "--gc-light": "#e9e6dc",
      "--gc-fan": "#e9e6dc",
      "--gc-heat": "#e9e6dc",
      "--gc-cool": "#a9a69e",
      "--gc-cover": "#e9e6dc",
      "--gc-media": "#e9e6dc",
    },
    light: {
      "--gc-text": "#161616",
      "--gc-text-dim": "#6b6862",
      "--gc-accent": "#161616",
      "--gc-on-accent": "#efede6",
      "--gc-surface": "#efede6",
      "--gc-surface-on": "#161616",
      "--gc-surface-solid": "#e4e1d8",
      "--gc-border": "rgba(22,22,22,.28)",
      "--gc-sheet-bg": "#efede6",
      "--gc-scrim": "rgba(0,0,0,.2)",
      "--gc-hatch": "rgba(22,22,22,.35)",
      "--gc-light": "#161616",
      "--gc-fan": "#161616",
      "--gc-heat": "#161616",
      "--gc-cool": "#55524c",
      "--gc-cover": "#161616",
      "--gc-media": "#161616",
    },
  },
  styles: {
    all: `.name,.title{font-weight:500;letter-spacing:-.005em}`,
    // On: the whole tile inverts. Partial fills are hatched instead of coloured.
    button:
      `.surface.on:not(.cover){color:var(--gc-on-accent)}` +
      `.surface.on:not(.cover) .meta,.surface.on:not(.cover) .icon{color:var(--gc-on-accent)}` +
      `.surface.on:not(.cover) .icon{background:transparent;border-color:var(--gc-on-accent)}` +
      `.surface.on:not(.cover) .badge{border-color:var(--gc-on-accent)}` +
      `.fill{background:repeating-linear-gradient(-45deg,var(--gc-hatch) 0 1px,transparent 1px 6px)}` +
      `.surface.on:not(.cover) .fill{background:repeating-linear-gradient(-45deg,color-mix(in srgb,var(--gc-on-accent) 30%,transparent) 0 1px,transparent 1px 6px)}` +
      `.icon{border-radius:4px}.cover .fill{border-top-color:var(--gc-text)}`,
    nav: `.ind{background:transparent;border:0;border-bottom:2px solid var(--gc-text);border-radius:0}`,
    climate: `.value{stroke:var(--gc-text)}`,
  },
  defaults: { buttonLayout: "tile" },
};
