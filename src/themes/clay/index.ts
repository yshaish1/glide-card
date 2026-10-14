import type { GlideTheme } from "../types";

// Soft Clay: neumorphic tiles pressed out of one matte colour; things that are on sink in.
export const clay: GlideTheme = {
  id: "clay",
  name: "Soft Clay",
  version: "1.0.0",
  description: "Neumorphic tiles from one matte colour, pressed in when on",
  preview: { background: "#e4e0db", surface: "#e4e0db", accent: "#f2734e" },
  tokens: {
    base: {
      "--gc-font": "'Nunito Sans', Nunito, 'Varela Round', 'SF Pro Rounded', ui-rounded, system-ui, sans-serif",
      "--gc-radius": "24px",
      "--gc-fill-strength": "18%",
    },
    dark: {
      "--gc-clay": "#2b2d33",
      "--gc-clay-lit": "rgba(255,255,255,.07)",
      "--gc-clay-dark": "rgba(0,0,0,.55)",
      "--gc-text": "#e6e3de",
      "--gc-text-dim": "#8e8c94",
      "--gc-accent": "#ff8a65",
      "--gc-on-accent": "#2b1810",
      "--gc-surface": "#2b2d33",
      "--gc-surface-on": "#2b2d33",
      "--gc-surface-solid": "#33353c",
      "--gc-border": "transparent",
      "--gc-shadow": "10px 10px 24px var(--gc-clay-dark), -8px -8px 18px var(--gc-clay-lit)",
      "--gc-sheet-bg": "#2b2d33",
      "--gc-scrim": "rgba(10,10,14,.55)",
      "--gc-light": "#ffb36b",
      "--gc-fan": "#6fd3c5",
      "--gc-heat": "#ff8a65",
      "--gc-cool": "#7fb2ff",
      "--gc-cover": "#c7a8ff",
    },
    light: {
      "--gc-clay": "#e4e0db",
      "--gc-clay-lit": "rgba(255,255,255,.85)",
      "--gc-clay-dark": "rgba(150,135,120,.38)",
      "--gc-text": "#3c3733",
      "--gc-text-dim": "#8d847c",
      "--gc-accent": "#f2734e",
      "--gc-on-accent": "#ffffff",
      "--gc-accent-text": "#c04f2c",
      "--gc-surface": "#e4e0db",
      "--gc-surface-on": "#e4e0db",
      "--gc-surface-solid": "#ece8e3",
      "--gc-border": "transparent",
      "--gc-shadow": "7px 7px 15px var(--gc-clay-dark), -7px -7px 15px var(--gc-clay-lit)",
      "--gc-sheet-bg": "#e4e0db",
      "--gc-scrim": "rgba(60,50,40,.25)",
      "--gc-light": "#f59e3d",
      "--gc-fan": "#2fa999",
      "--gc-heat": "#f2734e",
      "--gc-cool": "#4f8fe6",
      "--gc-cover": "#9c7ae6",
    },
  },
  styles: {
    // Pressed in: the twin shadows flip inside.
    all: `.surface.on,.surface.playing{border-color:color-mix(in srgb,var(--domain,var(--gc-accent)) 40%,transparent);box-shadow:inset 6px 6px 12px var(--gc-clay-dark),inset -6px -6px 12px var(--gc-clay-lit)}`,
    button:
      `.icon{border-color:transparent;box-shadow:4px 4px 9px var(--gc-clay-dark),-4px -4px 9px var(--gc-clay-lit)}` +
      `.on .icon{background:var(--gc-clay);border-color:transparent;box-shadow:inset 3px 3px 7px var(--gc-clay-dark),inset -3px -3px 7px var(--gc-clay-lit);filter:drop-shadow(0 0 6px color-mix(in srgb,var(--domain) 40%,transparent))}` +
      `.badge{border-color:transparent;box-shadow:inset 2px 2px 4px var(--gc-clay-dark),inset -2px -2px 4px var(--gc-clay-lit)}`,
    climate: `.round,.modes button{border-color:transparent;box-shadow:4px 4px 9px var(--gc-clay-dark),-4px -4px 9px var(--gc-clay-lit)}`,
    chips: `.chip{box-shadow:4px 4px 9px var(--gc-clay-dark),-4px -4px 9px var(--gc-clay-lit)}`,
    nav: `.ind{background:var(--gc-clay);border-color:transparent;box-shadow:inset 3px 3px 7px var(--gc-clay-dark),inset -3px -3px 7px var(--gc-clay-lit)}`,
  },
  defaults: { buttonLayout: "tile" },
};
