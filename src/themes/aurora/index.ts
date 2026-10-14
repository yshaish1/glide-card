import type { GlideTheme } from "../types";

// Aurora: deep night glass lit by violet, teal and pink glows; things that are on burn in a gradient.
export const aurora: GlideTheme = {
  id: "aurora",
  name: "Aurora",
  version: "1.0.0",
  description: "Night glass with vivid violet, teal and pink gradients",
  preview: { background: "linear-gradient(135deg,#2b1a6b,#0b0820 55%,#0d3b3a)", surface: "rgba(30,24,70,.7)", accent: "#c084fc" },
  tokens: {
    base: {
      "--gc-font": "Outfit, 'Poppins', system-ui, sans-serif",
      "--gc-backdrop": "blur(20px) saturate(1.4)",
      "--gc-radius": "24px",
      "--gc-fill-strength": "55%",
      "--gc-a1": "#8b5cf6",
      "--gc-a2": "#2dd4bf",
      "--gc-a3": "#f472b6",
    },
    dark: {
      "--gc-text": "#f3f0ff",
      "--gc-text-dim": "rgba(214,206,255,.6)",
      "--gc-accent": "#c084fc",
      "--gc-on-accent": "#ffffff",
      "--gc-surface": "rgba(20,16,48,.62)",
      "--gc-surface-on": "rgba(36,24,80,.7)",
      "--gc-surface-solid": "#1a1540",
      "--gc-border": "rgba(167,139,250,.28)",
      "--gc-highlight": "rgba(255,255,255,.06)",
      "--gc-shadow": "0 12px 32px rgba(5,2,20,.5)",
      "--gc-sheet-bg": "rgba(16,12,40,.82)",
      "--gc-scrim": "rgba(5,2,20,.55)",
      "--gc-light": "#f472b6",
      "--gc-fan": "#2dd4bf",
      "--gc-heat": "#fb7185",
      "--gc-cool": "#60a5fa",
      "--gc-cover": "#a78bfa",
      "--gc-media": "#c084fc",
    },
    light: {
      "--gc-text": "#1e1640",
      "--gc-text-dim": "rgba(50,40,100,.6)",
      "--gc-accent": "#8b5cf6",
      "--gc-on-accent": "#ffffff",
      "--gc-accent-text": "#6d3fe0",
      "--gc-surface": "rgba(255,255,255,.6)",
      "--gc-surface-on": "rgba(255,255,255,.75)",
      "--gc-surface-solid": "#f6f3ff",
      "--gc-border": "rgba(139,92,246,.25)",
      "--gc-highlight": "rgba(255,255,255,.8)",
      "--gc-shadow": "0 10px 28px rgba(90,60,180,.14)",
      "--gc-sheet-bg": "rgba(250,248,255,.85)",
      "--gc-scrim": "rgba(40,20,90,.2)",
      "--gc-light": "#ec4899",
      "--gc-fan": "#14b8a6",
      "--gc-heat": "#f43f5e",
      "--gc-cool": "#3b82f6",
      "--gc-cover": "#8b5cf6",
      "--gc-media": "#8b5cf6",
    },
  },
  styles: {
    // Headings in Sora, the rest in Outfit.
    // A faint aurora wash in every card.
    all:
      `.name,.title{font-family:Sora,Outfit,system-ui,sans-serif;letter-spacing:-.01em}` +
      `.surface{background-image:radial-gradient(120% 90% at 0% 0%,color-mix(in srgb,var(--gc-a1) 14%,transparent),transparent 60%),` +
      `radial-gradient(100% 80% at 100% 100%,color-mix(in srgb,var(--gc-a2) 10%,transparent),transparent 60%)}`,
    // On: a vivid gradient from the domain colour into its neighbour, with a coloured glow.
    button:
      `.surface.on:not(.cover){background-image:linear-gradient(135deg,var(--domain),color-mix(in srgb,var(--domain) 40%,var(--gc-a1)));color:#fff;border-color:transparent;` +
      `box-shadow:0 10px 28px color-mix(in srgb,var(--domain) 45%,transparent)}` +
      `.surface.on:not(.cover) .meta{color:rgba(255,255,255,.85)}` +
      `.surface.on:not(.cover) .icon{background:rgba(255,255,255,.22);border-color:rgba(255,255,255,.35);color:#fff}` +
      `.surface.on:not(.cover) .badge{border-color:rgba(255,255,255,.4);color:#fff}` +
      `.surface.on:not(.cover) .fill{background:rgba(255,255,255,.18)}`,
    climate: `.value{filter:drop-shadow(0 0 8px color-mix(in srgb,var(--mode) 60%,transparent))}`,
    media: `.surface.playing{box-shadow:0 10px 30px color-mix(in srgb,var(--gc-media) 35%,transparent)}`,
    nav: `.ind{background:linear-gradient(135deg,var(--gc-a1),var(--gc-a3));border-color:transparent}button.active:has(.ind){color:#fff}`,
  },
  defaults: { buttonLayout: "tile" },
};
