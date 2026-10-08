import type { HassEntity, HomeAssistant } from "./types";

export const domainOf = (entityId = "") => entityId.split(".")[0];

const OFF_STATES = new Set(["off", "closed", "idle", "standby", "paused", "unavailable", "unknown", "locked", "docked"]);
export const isUnavailable = (s?: HassEntity) => !s || s.state === "unavailable" || s.state === "unknown";
export const isActive = (s?: HassEntity) => !!s && !OFF_STATES.has(s.state);

const DEFAULT_ICONS: Record<string, [on: string, off: string]> = {
  light: ["mdi:lightbulb", "mdi:lightbulb-outline"],
  switch: ["mdi:toggle-switch-variant", "mdi:toggle-switch-variant-off"],
  fan: ["mdi:fan", "mdi:fan-off"],
  cover: ["mdi:window-shutter-open", "mdi:window-shutter"],
  lock: ["mdi:lock-open-variant", "mdi:lock"],
  climate: ["mdi:thermostat", "mdi:thermostat"],
  media_player: ["mdi:speaker-play", "mdi:speaker"],
  vacuum: ["mdi:robot-vacuum", "mdi:robot-vacuum"],
  scene: ["mdi:palette", "mdi:palette"],
  script: ["mdi:script-text-play", "mdi:script-text"],
};

export const entityIcon = (s?: HassEntity, override?: string) =>
  override ?? s?.attributes.icon ?? (DEFAULT_ICONS[domainOf(s?.entity_id)]?.[isActive(s) ? 0 : 1] || "mdi:help-circle-outline");

export const entityName = (s?: HassEntity, override?: string) =>
  override ?? s?.attributes.friendly_name ?? s?.entity_id ?? "";

/** Domain color token used for "on" fills. */
export const domainColor = (s?: HassEntity) =>
  ({ light: "var(--gc-light)", fan: "var(--gc-fan)", cover: "var(--gc-cover)", climate: "var(--gc-heat)", media_player: "var(--gc-media)" })[
    domainOf(s?.entity_id)
  ] ?? "var(--gc-accent)";

/** Slider support per domain: current value (0-100) and how to set it. */
export interface SliderSpec {
  value: number;
  set: (hass: HomeAssistant, pct: number) => Promise<unknown>;
}

export function sliderFor(s?: HassEntity): SliderSpec | undefined {
  if (!s) return;
  const id = s.entity_id;
  const a = s.attributes;
  switch (domainOf(id)) {
    case "light": {
      const modes: string[] = a.supported_color_modes ?? [];
      if (modes.length && modes.every((m) => m === "onoff")) return;
      return {
        value: s.state === "on" ? Math.round(((a.brightness ?? 255) / 255) * 100) : 0,
        set: (h, pct) =>
          pct === 0 ? h.callService("light", "turn_off", { entity_id: id }) : h.callService("light", "turn_on", { entity_id: id, brightness_pct: pct }),
      };
    }
    case "cover":
      if (a.current_position === undefined) return;
      return { value: a.current_position, set: (h, pct) => h.callService("cover", "set_cover_position", { entity_id: id, position: pct }) };
    case "fan":
      if (a.percentage === undefined) return;
      return { value: s.state === "on" ? a.percentage ?? 0 : 0, set: (h, pct) => h.callService("fan", "set_percentage", { entity_id: id, percentage: pct }) };
    case "media_player":
      if (a.volume_level === undefined) return;
      return { value: Math.round(a.volume_level * 100), set: (h, pct) => h.callService("media_player", "volume_set", { entity_id: id, volume_level: pct / 100 }) };
  }
}

const TOGGLE_DOMAINS = new Set(["light", "switch", "fan", "input_boolean", "media_player", "climate", "humidifier", "automation", "siren"]);

export function toggleEntity(hass: HomeAssistant, s: HassEntity) {
  const domain = domainOf(s.entity_id);
  const entity_id = s.entity_id;
  if (domain === "cover") return hass.callService("cover", "toggle", { entity_id });
  if (domain === "lock") return hass.callService("lock", s.state === "locked" ? "unlock" : "lock", { entity_id });
  if (domain === "scene" || domain === "script") return hass.callService(domain, "turn_on", { entity_id });
  if (domain === "button" || domain === "input_button") return hass.callService(domain, "press", { entity_id });
  if (TOGGLE_DOMAINS.has(domain)) return hass.callService(domain, "toggle", { entity_id });
  return hass.callService("homeassistant", "toggle", { entity_id });
}
