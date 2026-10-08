import { toggleEntity } from "./entity";
import { fire, haptic } from "./fire";
import type { ActionConfig, HomeAssistant } from "./types";

/** Rect of the element that opened the last pop-up, used for the morph animation. */
export let popupOrigin: DOMRect | undefined;

export function openPopup(hash: string, from?: Element) {
  popupOrigin = from?.getBoundingClientRect();
  const target = hash.startsWith("#") ? hash : `#${hash}`;
  if (location.hash === target) return;
  history.pushState({ glidePopup: true }, "", target);
  window.dispatchEvent(new CustomEvent("glide-hash"));
}

export function navigate(path: string, from?: Element) {
  if (path.startsWith("#")) return openPopup(path, from);
  history.pushState(null, "", path);
  fire(window, "location-changed", { replace: false });
}

export function runAction(host: HTMLElement, hass: HomeAssistant, action: ActionConfig | undefined, entityId?: string) {
  if (!action || action.action === "none") return;
  haptic(action.action === "toggle" ? "light" : "selection");
  switch (action.action) {
    case "toggle": {
      const s = entityId ? hass.states[entityId] : undefined;
      if (s) toggleEntity(hass, s);
      return;
    }
    case "more-info":
      if (entityId) fire(host, "hass-more-info", { entityId });
      return;
    case "popup":
    case "navigate":
      if (action.navigation_path) navigate(action.navigation_path, host);
      return;
    case "call-service": {
      const [domain, service] = (action.service ?? "").split(".");
      if (domain && service) hass.callService(domain, service, action.data);
      return;
    }
  }
}
