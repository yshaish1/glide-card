import { reducedMotion } from "./spring";

/** Tap animations a card can pick; ids are what `tap_animation` and `glide-tap-animation` take. */
export const TAP_EFFECTS = {
  shine: "Glass shine",
  random: "Random (different each tap)",
  press: "Press (shrink only)",
  spring: "Spring squish",
  ripple: "Ripple",
  glow: "Glow pulse",
  jelly: "Jelly",
  tilt: "3D tilt",
  "icon-pop": "Icon pop",
  ring: "Ring burst",
  "deep-press": "Deep press",
  bloom: "Color bloom",
  breathe: "Breathe out",
  sparks: "Sparks",
  "icon-flip": "Icon flip",
  "border-trace": "Border trace",
  nudge: "Nudge",
  "badge-pop": "Badge pop",
  none: "None",
} as const;

export type TapEffect = keyof typeof TAP_EFFECTS;
export const DEFAULT_TAP_EFFECT: TapEffect = "shine";

const isEffect = (v: unknown): v is TapEffect => typeof v === "string" && v in TAP_EFFECTS;

/** Card config > HA theme variable `glide-tap-animation` > default. */
export function resolveTapEffect(configEffect: string | undefined, host: Element): TapEffect {
  if (isEffect(configEffect)) return configEffect;
  const fromHa = getComputedStyle(host).getPropertyValue("--glide-tap-animation").trim();
  return isEffect(fromHa) ? fromHa : DEFAULT_TAP_EFFECT;
}

export interface TapContext {
  /** Tap point relative to the element's top-left corner; defaults to its centre. */
  x?: number;
  y?: number;
  /** Device / accent colour for rings, glows and sparks. */
  color: string;
  icon?: Element | null;
  badge?: Element | null;
}

const EASE = "cubic-bezier(.2,.8,.2,1)";
const SPRING = "cubic-bezier(.2,.9,.3,1.25)";
const lastRandom = new WeakMap<Element, TapEffect>();

/**
 * A random effect for `el` that it can actually show: never press/none, icon effects only with an icon,
 * badge-pop only with a badge, and never the same one twice in a row on the same element.
 */
export function pickRandomEffect(el: Element, ctx: Pick<TapContext, "icon" | "badge">): TapEffect {
  const prev = lastRandom.get(el);
  const pool = (Object.keys(TAP_EFFECTS) as TapEffect[]).filter((e) =>
    e !== "random" && e !== "press" && e !== "none" && e !== prev &&
    (ctx.icon || (e !== "icon-pop" && e !== "icon-flip")) &&
    (ctx.badge || e !== "badge-pop"));
  const pick = pool[Math.floor(Math.random() * pool.length)] ?? DEFAULT_TAP_EFFECT;
  lastRandom.set(el, pick);
  return pick;
}

const running = new WeakMap<Element, { anims: Animation[]; layer?: HTMLElement }>();

const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

/** Plays `effect` on `el`. Restarting cancels a running effect; nothing plays under reduced motion. */
export function playTap(el: HTMLElement, effect: TapEffect, ctx: TapContext): void {
  if (effect === "none" || effect === "press" || reducedMotion()) return;
  if (effect === "random") effect = pickRandomEffect(el, ctx);
  stop(el);
  const w = el.offsetWidth || el.getBoundingClientRect().width;
  const h = el.offsetHeight || el.getBoundingClientRect().height;
  const x = ctx.x ?? w / 2, y = ctx.y ?? h / 2;
  const state: { anims: Animation[]; layer?: HTMLElement } = { anims: [] };
  running.set(el, state);

  const anim = (target: Element, frames: Keyframe[], duration: number, easing = EASE) => {
    const a = target.animate(frames, { duration, easing });
    state.anims.push(a);
    return a;
  };
  const scale = (min: number, duration = 320) =>
    anim(el, [{ transform: "scale(1)" }, { transform: `scale(${min})`, offset: 0.3 }, { transform: "scale(1)" }], duration, SPRING);
  const layer = () => {
    if (state.layer) return state.layer;
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    const l = document.createElement("span");
    l.className = "gc-tap-layer";
    l.style.cssText = "position:absolute;inset:0;overflow:hidden;border-radius:inherit;pointer-events:none";
    // Above a button's colour fill, below its icon and text.
    const fill = el.querySelector(":scope > .fill");
    if (fill) fill.after(l);
    else el.prepend(l);
    return (state.layer = l);
  };
  const shape = (css: string) => {
    const s = document.createElement("span");
    s.style.cssText = `position:absolute;pointer-events:none;${css}`;
    layer().append(s);
    return s;
  };
  // Without the part an effect is about (e.g. a nav item has no badge), fall back to a light press.
  const part = (p: Element | null | undefined, frames: Keyframe[], duration: number) => {
    scale(0.98, 300);
    if (p) anim(p, frames, duration);
  };

  switch (effect) {
    case "shine": {
      scale(0.98, 350);
      const s = shape("top:-20%;bottom:-20%;left:0;width:45%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);filter:blur(2px)");
      anim(s, [{ transform: "translateX(-120%) skewX(-15deg)" }, { transform: `translateX(${w * 2.6}px) skewX(-15deg)` }], 700, "ease-in-out");
      break;
    }
    case "spring":
      anim(el, [{ transform: "scale(1)" }, { transform: "scale(.92)", offset: 0.3 }, { transform: "scale(1.03)", offset: 0.65 }, { transform: "scale(1)" }], 520);
      break;
    case "ripple": {
      const r = Math.hypot(w, h);
      const s = shape(`left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:${tint(ctx.color, 35)}`);
      anim(s, [{ transform: "scale(0)", opacity: 0.9 }, { transform: "scale(1)", opacity: 0 }], 650);
      break;
    }
    case "glow": {
      const base = getComputedStyle(el).boxShadow;
      const pre = base && base !== "none" ? `${base}, ` : "";
      anim(el, [{ boxShadow: `${pre}0 0 0 0 ${tint(ctx.color, 70)}` }, { boxShadow: `${pre}0 0 0 14px ${tint(ctx.color, 0)}` }], 700, "ease-out");
      break;
    }
    case "jelly":
      anim(el, [
        { transform: "scale(1,1)" }, { transform: "scale(1.06,.92)", offset: 0.25 }, { transform: "scale(.96,1.05)", offset: 0.5 },
        { transform: "scale(1.02,.98)", offset: 0.75 }, { transform: "scale(1,1)" },
      ], 600, "ease-out");
      break;
    case "tilt": {
      const rx = (y / h - 0.5) * -14, ry = (x / w - 0.5) * 14;
      anim(el, [
        { transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)" },
        { transform: `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(.97)`, offset: 0.3 },
        { transform: "perspective(600px) rotateX(0) rotateY(0) scale(1)" },
      ], 550, SPRING);
      break;
    }
    case "icon-pop":
      part(ctx.icon, [{ transform: "scale(1)" }, { transform: "scale(1.3) rotate(-8deg)", offset: 0.35 }, { transform: "scale(.94)", offset: 0.7 }, { transform: "scale(1)" }], 550);
      break;
    case "ring": {
      const s = shape(`left:${x - 30}px;top:${y - 30}px;width:60px;height:60px;border-radius:50%;border:2px solid ${ctx.color};box-sizing:border-box`);
      anim(s, [{ transform: "scale(.2)", opacity: 1 }, { transform: "scale(3.2)", opacity: 0 }], 600);
      break;
    }
    case "deep-press":
      anim(el, [
        { transform: "translateY(0) scale(1)" },
        { transform: "translateY(3px) scale(.97)", boxShadow: "0 1px 3px rgba(0,0,0,.25), inset 0 2px 8px rgba(0,0,0,.18)", offset: 0.35 },
        { transform: "translateY(0) scale(1)" },
      ], 480, SPRING);
      break;
    case "bloom": {
      const r = Math.hypot(w, h);
      const s = shape(`left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;` +
        `background:radial-gradient(circle,${tint(ctx.color, 60)},${tint(ctx.color, 20)} 60%,transparent 70%)`);
      anim(s, [{ transform: "scale(0)", opacity: 1 }, { transform: "scale(1)", opacity: 0.8, offset: 0.6 }, { transform: "scale(1.1)", opacity: 0 }], 800);
      break;
    }
    case "breathe":
      anim(el, [{ transform: "scale(1)" }, { transform: "scale(1.045)", offset: 0.4 }, { transform: "scale(1)" }], 520, "ease-in-out");
      break;
    case "sparks": {
      const box = el.getBoundingClientRect();
      const ib = ctx.icon?.getBoundingClientRect();
      const cx = ib ? ib.left - box.left + ib.width / 2 : x, cy = ib ? ib.top - box.top + ib.height / 2 : y;
      if (ctx.icon) anim(ctx.icon, [{ transform: "scale(1)" }, { transform: "scale(.85)", offset: 0.3 }, { transform: "scale(1)" }], 400, SPRING);
      else scale(0.98, 300);
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2 + Math.random() * 0.3, dist = 30 + Math.random() * 22;
        const s = shape(`left:${cx - 3}px;top:${cy - 3}px;width:6px;height:6px;border-radius:50%;background:${ctx.color}`);
        anim(s, [{ transform: "translate(0,0) scale(1)", opacity: 1 }, { transform: `translate(${Math.cos(a) * dist}px,${Math.sin(a) * dist}px) scale(.2)`, opacity: 0 }], 650);
      }
      break;
    }
    case "icon-flip":
      part(ctx.icon, [{ transform: "perspective(200px) rotateY(0)" }, { transform: "perspective(200px) rotateY(180deg)" }, { transform: "perspective(200px) rotateY(360deg)" }], 600);
      break;
    case "border-trace": {
      const s = shape(`inset:0;border-radius:inherit;padding:2px;box-sizing:border-box;` +
        `background:conic-gradient(from var(--gc-trace,0deg),transparent 0 70%,${ctx.color} 85%,transparent 100%);` +
        `-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;` +
        `mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)`);
      // Conic angles can't be tweened without @property, so a fade animation sets the timing and frames drive the angle.
      const a = anim(s, [{ opacity: 1 }, { opacity: 1, offset: 0.8 }, { opacity: 0 }], 750, "linear");
      const step = () => {
        if (a.playState !== "running") return;
        s.style.setProperty("--gc-trace", `${((Number(a.currentTime) || 0) / 750) * 360}deg`);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      break;
    }
    case "nudge":
      anim(el, [
        { transform: "translateX(0)" }, { transform: "translateX(-4px)", offset: 0.2 }, { transform: "translateX(4px)", offset: 0.45 },
        { transform: "translateX(-2px)", offset: 0.7 }, { transform: "translateX(0)" },
      ], 380, "ease-out");
      break;
    case "badge-pop":
      scale(0.96, 420);
      if (ctx.badge) anim(ctx.badge, [{ transform: "scale(1)" }, { transform: "scale(1.35)", offset: 0.4 }, { transform: "scale(1)" }], 450, SPRING);
      break;
  }

  Promise.all(state.anims.map((a) => a.finished)).then(() => running.get(el) === state && stop(el), () => {});
}

/** Cancels a running effect and removes its overlay layer. */
export function stop(el: Element): void {
  const s = running.get(el);
  if (!s) return;
  running.delete(el);
  s.anims.forEach((a) => a.cancel());
  s.layer?.remove();
}
