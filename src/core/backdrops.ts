import type { BackgroundCardConfig } from "./types";

/** Built-in dashboard backgrounds for the background card, each with a dark and a light version. */
export const PRESETS: Record<string, { name: string; dark: string; light: string }> = {
  aurora: {
    name: "Aurora",
    dark: "radial-gradient(80% 60% at 0% 0%,#4c1d95 0%,transparent 60%),radial-gradient(70% 50% at 100% 50%,#0f5e57 0%,transparent 60%),radial-gradient(70% 50% at 20% 100%,#831843 0%,transparent 60%),#0b0820",
    light: "radial-gradient(80% 60% at 0% 0%,#e9d5ff 0%,transparent 60%),radial-gradient(70% 50% at 100% 50%,#ccfbf1 0%,transparent 60%),radial-gradient(70% 50% at 20% 100%,#fce7f3 0%,transparent 60%),#f7f5ff",
  },
  sunset: {
    name: "Sunset",
    dark: "radial-gradient(90% 60% at 50% 110%,#c2410c 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#7c2d12 0%,transparent 60%),linear-gradient(#1c1022,#2a1420)",
    light: "radial-gradient(90% 60% at 50% 110%,#fdba74 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#fecdd3 0%,transparent 60%),linear-gradient(#fff7ed,#ffe4e6)",
  },
  ocean: {
    name: "Ocean",
    dark: "radial-gradient(80% 60% at 0% 100%,#0e7490 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#1e3a8a 0%,transparent 60%),#06121f",
    light: "radial-gradient(80% 60% at 0% 100%,#a5f3fc 0%,transparent 60%),radial-gradient(70% 50% at 100% 0%,#bfdbfe 0%,transparent 60%),#f0f9ff",
  },
  forest: {
    name: "Forest",
    dark: "radial-gradient(80% 60% at 100% 100%,#166534 0%,transparent 60%),radial-gradient(70% 50% at 0% 0%,#365314 0%,transparent 60%),#0a140e",
    light: "radial-gradient(80% 60% at 100% 100%,#bbf7d0 0%,transparent 60%),radial-gradient(70% 50% at 0% 0%,#d9f99d 0%,transparent 60%),#f4faf3",
  },
  midnight: {
    name: "Midnight",
    dark: "radial-gradient(70% 50% at 50% 0%,#1e1b4b 0%,transparent 70%),linear-gradient(#05060f,#0b1024)",
    light: "radial-gradient(70% 50% at 50% 0%,#c7d2fe 0%,transparent 70%),linear-gradient(#eef2ff,#f8fafc)",
  },
  dusk: {
    name: "Dusk",
    dark: "linear-gradient(160deg,#312e81 0%,#6b21a8 45%,#9d174d 100%)",
    light: "linear-gradient(160deg,#c7d2fe 0%,#e9d5ff 45%,#fbcfe8 100%)",
  },
  pastel: {
    name: "Pastel",
    dark: "radial-gradient(60% 50% at 20% 20%,#3b2f5c 0%,transparent 60%),radial-gradient(60% 50% at 80% 30%,#22424a 0%,transparent 60%),radial-gradient(60% 50% at 50% 90%,#4a2b3d 0%,transparent 60%),#16141c",
    light: "radial-gradient(60% 50% at 20% 20%,#ddd6fe 0%,transparent 60%),radial-gradient(60% 50% at 80% 30%,#bae6fd 0%,transparent 60%),radial-gradient(60% 50% at 50% 90%,#fbcfe8 0%,transparent 60%),#fdfcff",
  },
  mint: {
    name: "Mint",
    dark: "radial-gradient(80% 60% at 0% 0%,#065f46 0%,transparent 60%),radial-gradient(60% 50% at 100% 100%,#134e4a 0%,transparent 60%),#07120f",
    light: "radial-gradient(80% 60% at 0% 0%,#a7f3d0 0%,transparent 60%),radial-gradient(60% 50% at 100% 100%,#99f6e4 0%,transparent 60%),#f0fdf9",
  },
  rose: {
    name: "Rose",
    dark: "radial-gradient(80% 60% at 100% 0%,#9f1239 0%,transparent 60%),radial-gradient(60% 50% at 0% 100%,#581c87 0%,transparent 60%),#14080e",
    light: "radial-gradient(80% 60% at 100% 0%,#fecdd3 0%,transparent 60%),radial-gradient(60% 50% at 0% 100%,#f5d0fe 0%,transparent 60%),#fff7f9",
  },
  graphite: {
    name: "Graphite",
    dark: "radial-gradient(90% 70% at 30% 0%,#2a2d33 0%,transparent 70%),#111214",
    light: "radial-gradient(90% 70% at 30% 0%,#ffffff 0%,transparent 70%),#e7e8eb",
  },
};

export type BackdropKind = "theme" | "preset" | "color" | "image";

/** What the painter draws: a CSS background, or a photo with blur and a dim veil. */
export interface Backdrop {
  background: string;
  image?: string;
  blur: number;
  /** 0..1 veil over a photo: black in dark mode, white in light mode. */
  dim: number;
  dark: boolean;
  animate: boolean;
}

const clamp = (v: unknown, lo: number, hi: number, dflt: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : dflt;
};

export interface BackdropContext {
  dark: boolean;
  night: boolean;
  /** The Glide theme's own background (for `background: theme`). */
  themeBackground?: { dark: string; light: string };
  /** Lite mode or reduced motion: never animate. */
  still: boolean;
}

/** Turns a background card config into what to paint. */
export function resolveBackdrop(c: Partial<BackgroundCardConfig>, ctx: BackdropContext): Backdrop {
  const kind: BackdropKind = c.background ?? "theme";
  const base = { blur: 0, dim: 0, dark: ctx.dark, animate: !!c.animate && !ctx.still };
  const pick = (v?: { dark: string; light: string }) => (v ? (ctx.dark ? v.dark : v.light) : "");
  switch (kind) {
    case "preset":
      return { ...base, background: pick(PRESETS[c.preset ?? ""] ?? PRESETS.aurora) };
    case "color": {
      const a = c.color || (ctx.dark ? "#111214" : "#f2f2f4");
      const bg = c.color2 ? `linear-gradient(${clamp(c.angle, 0, 360, 135)}deg,${a},${c.color2})` : a;
      return { ...base, background: bg, animate: base.animate && !!c.color2 };
    }
    case "image": {
      const src = (ctx.night && c.image_night) || c.image;
      return {
        ...base,
        background: ctx.dark ? "#000" : "#fff",
        image: src || undefined,
        blur: clamp(c.blur, 0, 40, 0),
        dim: clamp(c.dim, 0, 90, 0) / 100,
        animate: false,
      };
    }
    default:
      return { ...base, background: pick(ctx.themeBackground) || pick(PRESETS.graphite) };
  }
}

type Json = unknown;
const isBackgroundCard = (o: any) => o && typeof o === "object" && o.type === "custom:glide-card" && o.card_type === "background";

/** Every background card in a piece of dashboard config (cards, sections, stacks...), in order. */
export function findBackgroundCards(node: Json, out: BackgroundCardConfig[] = []): BackgroundCardConfig[] {
  if (Array.isArray(node)) node.forEach((n) => findBackgroundCards(n, out));
  else if (node && typeof node === "object") {
    if (isBackgroundCard(node)) out.push(node as BackgroundCardConfig);
    else for (const v of Object.values(node)) findBackgroundCards(v, out);
  }
  return out;
}

/** The view's own background card, else the first `scope: dashboard` card in any view. */
export function pickBackground(views: any[] | undefined, viewIndex: number): BackgroundCardConfig | undefined {
  if (!views?.length) return undefined;
  const own = findBackgroundCards(views[viewIndex])[0];
  if (own) return own;
  return findBackgroundCards(views).find((c) => c.scope === "dashboard");
}

/** Which view the URL points at: `/dashboard/<path or index>`, else the first. */
export function viewIndexFor(views: any[] | undefined, pathname: string): number {
  const seg = decodeURIComponent(pathname.split("/")[2] ?? "");
  if (!views?.length || !seg) return 0;
  const byPath = views.findIndex((v) => v?.path === seg);
  if (byPath >= 0) return byPath;
  const n = Number(seg);
  return Number.isInteger(n) && n >= 0 && n < views.length ? n : 0;
}
