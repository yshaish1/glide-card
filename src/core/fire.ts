/** Fires an HA-style composed event. */
export function fire<T>(node: EventTarget, type: string, detail?: T) {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

export type Haptic = "light" | "medium" | "heavy" | "selection" | "success" | "warning" | "failure";

/** The HA companion apps listen for this window event. */
export const haptic = (kind: Haptic = "light") => fire(window, "haptic", kind);
