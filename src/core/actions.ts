import { toggleEntity } from "./entity";
import { fire, haptic } from "./fire";
import type { ActionConfig, HomeAssistant } from "./types";
import { recordTap, usageKey } from "./usage";

export function openPopup(hash: string) {
  const target = hash.startsWith("#") ? hash : `#${hash}`;
  // Already on that hash (e.g. left behind by a closed view): re-sync so the sheet still opens.
  if (location.hash !== target) history.pushState({ glidePopup: true }, "", target);
  window.dispatchEvent(new CustomEvent("glide-hash"));
}

export function navigate(path: string) {
  if (path.startsWith("#")) return openPopup(path);
  history.pushState(null, "", path);
  fire(window, "location-changed", { replace: false });
}

export function runAction(host: HTMLElement, hass: HomeAssistant, action: ActionConfig | undefined, entityId?: string) {
  if (!action || action.action === "none") return;
  haptic(action.action === "toggle" ? "light" : "selection");
  // Search ranks results by what this device uses; looking at details doesn't count.
  if (action.action !== "more-info") recordTap(usageKey((host as { config?: Parameters<typeof usageKey>[0] }).config));
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
      if (action.navigation_path) navigate(action.navigation_path);
      return;
    default:
      // Service calls, url, assist...: HA's own handler covers target, confirmation and perform-action.
      fire(host, "hass-action", { config: { entity: entityId, tap_action: action }, action: "tap" });
  }
}
