import type { HassEntity, HomeAssistant } from "../src/core/types";

const now = new Date().toISOString();
const e = (entity_id: string, state: string, attributes: Record<string, any> = {}): HassEntity => ({
  entity_id, state, attributes, last_changed: now, last_updated: now,
});

const initial: HassEntity[] = [
  e("light.ceiling", "on", { friendly_name: "Ceiling Light", brightness: 178, supported_color_modes: ["brightness"] }),
  e("light.floor_lamp", "off", { friendly_name: "Floor Lamp", icon: "mdi:floor-lamp", supported_color_modes: ["brightness"] }),
  e("cover.blinds", "open", { friendly_name: "Motorized Blinds", current_position: 40 }),
  e("fan.ceiling", "on", { friendly_name: "Ceiling Fan", percentage: 66 }),
  e("switch.coffee", "off", { friendly_name: "Coffee Machine", icon: "mdi:coffee-maker" }),
  e("climate.living", "heat", {
    friendly_name: "Climate Control", temperature: 21.5, current_temperature: 22, min_temp: 7, max_temp: 30,
    target_temp_step: 0.5, hvac_modes: ["heat", "cool", "heat_cool", "off"], hvac_action: "heating",
  }),
  e("media_player.sonos", "playing", {
    friendly_name: "Sonos Era 300", media_title: "Solaris", media_artist: "Ólafur Arnalds", app_name: "AirPlay",
    entity_picture: "https://picsum.photos/seed/solaris/300", volume_level: 0.45, media_duration: 248,
    media_position: 134, media_position_updated_at: now, supported_features: 0xffff,
  }),
  e("sensor.living_temp", "22", { friendly_name: "Temperature", unit_of_measurement: "°C" }),
  e("weather.home", "clear-night", { friendly_name: "מזג אוויר", temperature: 25.7, temperature_unit: "°C" }),
  e("sensor.sun_next_rising", "2026-10-09T03:40:00+00:00", { friendly_name: "זריחה", device_class: "timestamp" }),
  e("sensor.sun_next_setting", "2026-10-09T15:15:00+00:00", { friendly_name: "שקיעה", device_class: "timestamp" }),
  e("sensor.acs_on", "3", { friendly_name: "מזגנים דולקים" }),
  e("sensor.outdoor_lights_on", "2", { friendly_name: "אורות בחוץ" }),
  e("sensor.indoor_lights_on", "7", { friendly_name: "אורות בבית" }),
];

type Listener = (h: HomeAssistant) => void;
const listeners = new Set<Listener>();
let states: Record<string, HassEntity> = Object.fromEntries(initial.map((s) => [s.entity_id, s]));
let language = "en";
let darkMode = true;

function patch(id: string, state: string | undefined, attrs: Record<string, any> = {}) {
  const old = states[id];
  if (!old) return;
  const t = new Date().toISOString();
  states = { ...states, [id]: { ...old, state: state ?? old.state, attributes: { ...old.attributes, ...attrs }, last_updated: t } };
  emit();
}

async function callService(domain: string, service: string, data: Record<string, any> = {}) {
  console.log("[mock] callService", domain, service, data);
  const id: string = data.entity_id;
  const s = states[id];
  if (!s) return;
  const on = s.state !== "off" && s.state !== "closed";
  await new Promise((r) => setTimeout(r, 120)); // feel a bit like a real round-trip
  switch (`${domain}.${service}`) {
    case "light.toggle": return patch(id, on ? "off" : "on", on ? {} : { brightness: s.attributes.brightness ?? 255 });
    case "light.turn_on": return patch(id, "on", data.brightness_pct ? { brightness: Math.round((data.brightness_pct / 100) * 255) } : {});
    case "light.turn_off": return patch(id, "off");
    case "switch.toggle": return patch(id, on ? "off" : "on");
    case "fan.toggle": return patch(id, on ? "off" : "on");
    case "fan.set_percentage": return patch(id, data.percentage ? "on" : "off", { percentage: data.percentage });
    case "cover.toggle": return patch(id, on ? "closed" : "open", { current_position: on ? 0 : 100 });
    case "cover.set_cover_position": return patch(id, data.position ? "open" : "closed", { current_position: data.position });
    case "climate.set_temperature": return patch(id, undefined, { temperature: data.temperature });
    case "climate.set_hvac_mode": return patch(id, data.hvac_mode, { hvac_action: data.hvac_mode === "off" ? "off" : data.hvac_mode === "cool" ? "cooling" : "heating" });
    case "climate.toggle": return patch(id, on ? "off" : "heat");
    case "media_player.media_play_pause": return patch(id, s.state === "playing" ? "paused" : "playing", { media_position_updated_at: new Date().toISOString() });
    case "media_player.toggle": return patch(id, s.state === "playing" ? "paused" : "playing");
    case "media_player.volume_set": return patch(id, undefined, { volume_level: data.volume_level });
    case "media_player.media_next_track": return patch(id, undefined, { media_title: "Saman", media_position: 0, media_position_updated_at: new Date().toISOString() });
    case "media_player.media_previous_track": return patch(id, undefined, { media_position: 0, media_position_updated_at: new Date().toISOString() });
  }
}

export function getHass(): HomeAssistant {
  return { states, language, locale: { language }, themes: { darkMode }, callService };
}

function emit() {
  const h = getHass();
  listeners.forEach((l) => l(h));
}

export const subscribe = (l: Listener) => (listeners.add(l), l(getHass()));
export const setLanguage = (l: string) => ((language = l), emit());
export const setDark = (d: boolean) => ((darkMode = d), emit());
