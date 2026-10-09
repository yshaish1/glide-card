import { afterEach, describe, expect, it, vi } from "vitest";
import { playTap, resolveTapEffect } from "../src/core/tap-fx";

const motion = (reduce: boolean) =>
  vi.stubGlobal("matchMedia", (q: string) => ({ matches: reduce && q.includes("reduce"), media: q, addEventListener() {}, removeEventListener() {} }));

/** Element whose animations finish when `finish()` is called. */
const card = () => {
  const el = document.createElement("div");
  const pending: (() => void)[] = [];
  const animate = vi.fn(() => {
    let done!: () => void;
    const finished = new Promise<void>((r) => (done = r));
    pending.push(done);
    return { finished, cancel: vi.fn(), playState: "running", currentTime: 0 } as unknown as Animation;
  });
  // Overlay shapes are created inside the element; give every element the stub.
  vi.spyOn(Element.prototype, "animate").mockImplementation(animate as never);
  document.body.append(el);
  return { el, animate, finish: async () => { pending.forEach((d) => d()); await new Promise((r) => setTimeout(r)); } };
};

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); document.body.innerHTML = ""; document.documentElement.style.cssText = ""; });

describe("resolveTapEffect", () => {
  it("card config wins, then the HA theme variable, then shine", () => {
    const host = document.createElement("div");
    document.body.append(host);
    expect(resolveTapEffect(undefined, host)).toBe("shine");
    host.style.setProperty("--glide-tap-animation", "ripple");
    expect(resolveTapEffect(undefined, host)).toBe("ripple");
    expect(resolveTapEffect("sparks", host)).toBe("sparks");
    expect(resolveTapEffect("bogus", host)).toBe("ripple");
    host.style.setProperty("--glide-tap-animation", "bogus");
    expect(resolveTapEffect(undefined, host)).toBe("shine");
  });
});

describe("playTap", () => {
  it("does nothing under reduced motion, or for press / none", () => {
    motion(true);
    const { el, animate } = card();
    playTap(el, "ripple", { color: "red" });
    motion(false);
    playTap(el, "press", { color: "red" });
    playTap(el, "none", { color: "red" });
    expect(animate).not.toHaveBeenCalled();
    expect(el.childElementCount).toBe(0);
  });

  it("adds an overlay layer for overlay effects and removes it when done", async () => {
    motion(false);
    const { el, finish } = card();
    playTap(el, "ripple", { x: 10, y: 10, color: "red" });
    expect(el.querySelector(".gc-tap-layer")).not.toBeNull();
    await finish();
    expect(el.querySelector(".gc-tap-layer")).toBeNull();
  });

  it("a new tap replaces a running effect", () => {
    motion(false);
    const { el } = card();
    playTap(el, "ring", { color: "red" });
    playTap(el, "ring", { color: "red" });
    expect(el.querySelectorAll(".gc-tap-layer")).toHaveLength(1);
  });

  it("every effect runs without throwing", () => {
    motion(false);
    const { el } = card();
    const icon = el.appendChild(document.createElement("i"));
    for (const fx of ["shine", "spring", "ripple", "glow", "jelly", "tilt", "icon-pop", "ring", "deep-press", "bloom", "breathe", "sparks", "icon-flip", "border-trace", "nudge", "badge-pop"] as const) {
      expect(() => playTap(el, fx, { color: "red", icon, badge: icon })).not.toThrow();
    }
  });
});
