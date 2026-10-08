export interface GestureHandlers {
  tap?(): void;
  hold?(): void;
  doubleTap?(): void;
  /** Enable horizontal drag; value is relative to `dragStart()` in 0-100, RTL aware. */
  dragStart?(): number;
  drag?(value: number): void;
  dragEnd?(value: number): void;
}

const HOLD_MS = 500;
const DOUBLE_MS = 250;
const SLOP = 8;

/**
 * Pointer gestures for a single element: tap, long-press, double tap and
 * horizontal drag-to-adjust. Vertical movement is left to the page scroll
 * (pair with `touch-action: pan-y`).
 */
export function attachGestures(el: HTMLElement, h: GestureHandlers): () => void {
  let x0 = 0, y0 = 0, start = 0, value = 0;
  let holdTimer = 0, tapTimer = 0;
  let state: "idle" | "down" | "held" | "drag" | "cancel" = "idle";

  const clear = () => clearTimeout(holdTimer);
  const width = () => el.getBoundingClientRect().width || 1;
  const rtl = () => getComputedStyle(el).direction === "rtl";

  const down = (e: PointerEvent) => {
    if (e.button !== 0) return;
    x0 = e.clientX; y0 = e.clientY; state = "down";
    clear();
    if (h.hold) holdTimer = window.setTimeout(() => { state = "held"; h.hold!(); }, HOLD_MS);
  };
  const move = (e: PointerEvent) => {
    if (state === "down") {
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (Math.abs(dx) < SLOP && Math.abs(dy) < SLOP) return;
      clear();
      if (h.dragStart && Math.abs(dx) > Math.abs(dy)) {
        state = "drag";
        start = h.dragStart();
        el.setPointerCapture(e.pointerId);
      } else state = "cancel";
    }
    if (state === "drag") {
      const delta = ((e.clientX - x0) / width()) * 100 * (rtl() ? -1 : 1);
      value = Math.round(Math.min(100, Math.max(0, start + delta)));
      h.drag?.(value);
    }
  };
  const up = () => {
    clear();
    if (state === "drag") h.dragEnd?.(value);
    else if (state === "down") {
      if (h.doubleTap) {
        if (tapTimer) { clearTimeout(tapTimer); tapTimer = 0; h.doubleTap(); }
        else tapTimer = window.setTimeout(() => { tapTimer = 0; h.tap?.(); }, DOUBLE_MS);
      } else h.tap?.();
    }
    state = "idle";
  };
  const cancel = () => { clear(); if (state === "drag") h.dragEnd?.(value); state = "idle"; };
  const menu = (e: Event) => { if (h.hold) e.preventDefault(); };
  const key = (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); h.tap?.(); } };

  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", cancel);
  el.addEventListener("contextmenu", menu);
  el.addEventListener("keydown", key);
  return () => {
    clear(); clearTimeout(tapTimer);
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", cancel);
    el.removeEventListener("contextmenu", menu);
    el.removeEventListener("keydown", key);
  };
}
