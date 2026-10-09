export interface GestureHandlers {
  /** `point` is where the press started (client coordinates); absent for keyboard taps. */
  tap?(point?: { x: number; y: number }): void;
  hold?(): void;
  doubleTap?(point?: { x: number; y: number }): void;
  /** Enable drag-to-adjust; value is relative to `dragStart()` in 0-100. */
  dragStart?(): number;
  /** Drag direction, read per gesture. "x" (default) is RTL aware; "y" raises the value when moving up. */
  axis?(): "x" | "y";
  /** Touch "y" drags arm after a still press; called when that happens. */
  arm?(): void;
  drag?(value: number): void;
  dragEnd?(value: number): void;
}

const HOLD_MS = 500;
const DOUBLE_MS = 250;
const ARM_MS = 250;
const SLOP = 8;

/**
 * Pointer gestures for a single element: tap, long-press, double tap and
 * drag-to-adjust. Horizontal drags start at once and vertical movement is
 * left to the page scroll (pair with `touch-action: pan-y`). Vertical drags
 * start at once for mouse/pen; on touch the press must first be held still
 * for ARM_MS, after which page scrolling is blocked for that gesture.
 */
export function attachGestures(el: HTMLElement, h: GestureHandlers): () => void {
  let x0 = 0, y0 = 0, start = 0, value = 0;
  let holdTimer = 0, tapTimer = 0, armTimer = 0;
  let axis: "x" | "y" = "x", armed = false;
  let state: "idle" | "down" | "held" | "drag" | "cancel" = "idle";

  const clear = () => { clearTimeout(holdTimer); clearTimeout(armTimer); };
  const width = () => el.getBoundingClientRect().width || 1;
  const height = () => el.getBoundingClientRect().height || 1;
  const rtl = () => getComputedStyle(el).direction === "rtl";

  const down = (e: PointerEvent) => {
    if (e.button !== 0) return;
    x0 = e.clientX; y0 = e.clientY; state = "down";
    clear();
    axis = h.axis?.() ?? "x";
    armed = axis === "y" && e.pointerType !== "touch";
    if (axis === "y" && !armed && h.dragStart) armTimer = window.setTimeout(() => { armed = true; h.arm?.(); }, ARM_MS);
    if (h.hold) holdTimer = window.setTimeout(() => { state = "held"; h.hold!(); }, HOLD_MS);
  };
  const move = (e: PointerEvent) => {
    if (state === "down") {
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return;
      clear();
      const along = axis === "y" ? armed && Math.abs(dy) > Math.abs(dx) : Math.abs(dx) > Math.abs(dy);
      if (h.dragStart && along) {
        state = "drag";
        start = h.dragStart();
        el.setPointerCapture(e.pointerId);
      } else state = "cancel";
    }
    if (state === "drag") {
      const delta = axis === "y"
        ? ((y0 - e.clientY) / height()) * 100
        : ((e.clientX - x0) / width()) * 100 * (rtl() ? -1 : 1);
      value = Math.round(Math.min(100, Math.max(0, start + delta)));
      h.drag?.(value);
    }
  };
  const up = () => {
    clear();
    armed = false;
    if (state === "drag") h.dragEnd?.(value);
    else if (state === "down") {
      if (h.doubleTap) {
        const point = { x: x0, y: y0 };
        if (tapTimer) { clearTimeout(tapTimer); tapTimer = 0; h.doubleTap(point); }
        else tapTimer = window.setTimeout(() => { tapTimer = 0; h.tap?.(point); }, DOUBLE_MS);
      } else h.tap?.({ x: x0, y: y0 });
    }
    state = "idle";
  };
  const cancel = () => { clear(); armed = false; if (state === "drag") h.dragEnd?.(value); state = "idle"; };
  const menu = (e: Event) => { if (h.hold) e.preventDefault(); };
  // Once a vertical drag is armed, keep the browser from scrolling the page.
  const touchmove = (e: TouchEvent) => { if (armed && (state === "down" || state === "drag")) e.preventDefault(); };
  const key = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); h.tap?.(); } };

  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", cancel);
  el.addEventListener("contextmenu", menu);
  el.addEventListener("keydown", key);
  el.addEventListener("touchmove", touchmove, { passive: false });
  return () => {
    clear(); clearTimeout(tapTimer);
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", cancel);
    el.removeEventListener("contextmenu", menu);
    el.removeEventListener("keydown", key);
    el.removeEventListener("touchmove", touchmove);
  };
}
