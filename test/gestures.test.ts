import { afterEach, describe, expect, it, vi } from "vitest";
import { attachGestures } from "../src/core/gestures";

const box = () => {
  const el = document.createElement("div");
  el.getBoundingClientRect = () => ({ width: 200, height: 100, top: 0, left: 0, right: 200, bottom: 100, x: 0, y: 0, toJSON() {} }) as DOMRect;
  el.setPointerCapture = () => {};
  document.body.append(el);
  return el;
};
const ev = (el: HTMLElement, type: string, x: number, y: number, pointerType = "mouse") =>
  el.dispatchEvent(new PointerEvent(type, { clientX: x, clientY: y, button: 0, pointerType, pointerId: 1, bubbles: true }));

afterEach(() => { vi.useRealTimers(); document.body.innerHTML = ""; });

describe("attachGestures", () => {
  it("x axis: horizontal drag adds width percent", () => {
    const el = box(), dragEnd = vi.fn();
    attachGestures(el, { dragStart: () => 40, dragEnd });
    ev(el, "pointerdown", 0, 50); ev(el, "pointermove", 50, 50); ev(el, "pointerup", 50, 50);
    expect(dragEnd).toHaveBeenCalledWith(65);
  });

  it("y axis: dragging up raises, down lowers (mouse starts at once)", () => {
    const el = box(), dragEnd = vi.fn();
    attachGestures(el, { axis: () => "y", dragStart: () => 40, dragEnd });
    ev(el, "pointerdown", 100, 80); ev(el, "pointermove", 100, 50); ev(el, "pointerup", 100, 50);
    expect(dragEnd).toHaveBeenLastCalledWith(70);
    ev(el, "pointerdown", 100, 20); ev(el, "pointermove", 100, 100); ev(el, "pointerup", 100, 100);
    expect(dragEnd).toHaveBeenLastCalledWith(0);
  });

  it("y axis: a horizontal move is not a drag", () => {
    const el = box(), dragEnd = vi.fn(), tap = vi.fn();
    attachGestures(el, { axis: () => "y", dragStart: () => 40, dragEnd, tap });
    ev(el, "pointerdown", 0, 50); ev(el, "pointermove", 60, 52); ev(el, "pointerup", 60, 52);
    expect(dragEnd).not.toHaveBeenCalled();
    expect(tap).not.toHaveBeenCalled();
  });

  it("y axis touch: scrolls unless held still first, then drags", () => {
    vi.useFakeTimers();
    const el = box(), dragEnd = vi.fn(), arm = vi.fn();
    attachGestures(el, { axis: () => "y", dragStart: () => 40, dragEnd, arm });
    ev(el, "pointerdown", 100, 80, "touch"); ev(el, "pointermove", 100, 40, "touch"); ev(el, "pointerup", 100, 40, "touch");
    expect(dragEnd).not.toHaveBeenCalled();

    ev(el, "pointerdown", 100, 80, "touch");
    vi.advanceTimersByTime(300);
    expect(arm).toHaveBeenCalledOnce();
    ev(el, "pointermove", 100, 60, "touch"); ev(el, "pointerup", 100, 60, "touch");
    expect(dragEnd).toHaveBeenCalledWith(60);
  });

  it("tap receives the press point", () => {
    const el = box(), tap = vi.fn();
    attachGestures(el, { tap });
    ev(el, "pointerdown", 30, 40); ev(el, "pointerup", 31, 41);
    expect(tap).toHaveBeenCalledWith({ x: 30, y: 40 });
  });
});
