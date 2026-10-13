// Compositions for the README screenshots and GIFs; `scripts/screenshots.mjs` opens `shots.html?shot=<name>`.
import "./ha-icon";
import "../src/glide-card";
import { entity as e, getHass, patchState, replaceStates, setLanguage, subscribe } from "./mock-hass";

type Cfg = Record<string, any>;
type Mode = "dark" | "light";
interface Panel { theme: string; mode: Mode; cards: Cfg[]; label?: string; short?: boolean; width?: number; height?: number }

const now = new Date().toISOString();
const at = (h: number, m: number) => { const d = new Date(); d.setHours(h, m, 0, 0); return d.toISOString(); };

const EN = [
  e("light.ceiling", "on", { friendly_name: "Ceiling Light", brightness: 178, supported_color_modes: ["brightness"] }),
  e("light.floor_lamp", "off", { friendly_name: "Floor Lamp", icon: "mdi:floor-lamp", supported_color_modes: ["brightness"] }),
  e("light.kitchen", "on", { friendly_name: "Kitchen", brightness: 230, supported_color_modes: ["brightness"] }),
  e("light.desk", "on", { friendly_name: "Desk Lamp", icon: "mdi:desk-lamp", brightness: 90, supported_color_modes: ["brightness"] }),
  e("cover.blinds", "open", { friendly_name: "Blinds", current_position: 40 }),
  e("cover.office", "open", { friendly_name: "Office Shutter", current_position: 70 }),
  e("cover.curtains", "open", { friendly_name: "Curtains", device_class: "curtain", current_position: 55 }),
  e("cover.bedroom", "open", { friendly_name: "Bedroom Drapes", device_class: "curtain", current_position: 30 }),
  e("fan.ceiling", "on", { friendly_name: "Ceiling Fan", percentage: 66 }),
  e("switch.coffee", "off", { friendly_name: "Coffee Machine", icon: "mdi:coffee-maker" }),
  e("lock.front", "locked", { friendly_name: "Front Door" }),
  e("script.good_night", "off", { friendly_name: "Good Night", icon: "mdi:weather-night" }),
  e("scene.movie", "scening", { friendly_name: "Movie Time", icon: "mdi:movie-open" }),
  e("climate.living", "heat", {
    friendly_name: "Living Room", temperature: 21.5, current_temperature: 20.4, min_temp: 7, max_temp: 30,
    target_temp_step: 0.5, hvac_modes: ["heat", "cool", "heat_cool", "off"], hvac_action: "heating",
  }),
  e("climate.bedroom", "cool", {
    friendly_name: "Bedroom AC", temperature: 24, current_temperature: 25.8, min_temp: 16, max_temp: 30,
    target_temp_step: 0.5, hvac_modes: ["off", "heat", "cool", "dry", "fan_only"], hvac_action: "cooling",
  }),
  e("media_player.living", "playing", {
    friendly_name: "Living Room Speaker", media_title: "Golden Hour", media_artist: "Lumen Drift", app_name: "Spotify",
    entity_picture: "https://picsum.photos/seed/goldenhour/300", volume_level: 0.45, media_duration: 248,
    media_position: 134, media_position_updated_at: now, supported_features: 0xffff,
  }),
  e("weather.home", "partlycloudy", { friendly_name: "Weather", temperature: 22, temperature_unit: "°C" }),
  e("sensor.sun_next_rising", at(6, 42), { friendly_name: "Sunrise", device_class: "timestamp" }),
  e("sensor.sun_next_setting", at(18, 9), { friendly_name: "Sunset", device_class: "timestamp" }),
  e("sensor.living_temp", "21.8", { friendly_name: "Temperature", unit_of_measurement: "°C" }),
  e("sensor.humidity", "48", { friendly_name: "Humidity", unit_of_measurement: "%" }),
  e("sensor.lights_on", "3", { friendly_name: "Lights on" }),
  e("sensor.power", "412", { friendly_name: "Power", unit_of_measurement: "W" }),
  e("sun.sun", "above_horizon", { friendly_name: "Sun" }),
];

const HE_NAMES: Record<string, string> = {
  "light.ceiling": "תאורה ראשית", "light.floor_lamp": "מנורה עומדת", "cover.blinds": "תריס סלון", "cover.curtains": "וילון",
  "fan.ceiling": "מאוורר", "script.good_night": "לילה טוב", "climate.living": "סלון", "media_player.living": "רמקול סלון",
  "sensor.sun_next_rising": "זריחה", "sensor.sun_next_setting": "שקיעה", "sensor.lights_on": "אורות דולקים", "sensor.living_temp": "טמפרטורה",
};

const params = new URLSearchParams(location.search);
const shot = params.get("shot") ?? "hero-dark";
const lang = params.get("lang") ?? (shot === "rtl" ? "he" : "en");
replaceStates(lang === "he" ? EN.map((s) => (HE_NAMES[s.entity_id] ? { ...s, attributes: { ...s.attributes, friendly_name: HE_NAMES[s.entity_id] } } : s)) : EN);
setLanguage(lang);
if (lang === "he") { document.documentElement.lang = "he"; document.documentElement.dir = "rtl"; }
const night = params.get("sun") === "night";
if (night) patchState("sun.sun", "below_horizon");

const he = lang === "he";
const nav: Cfg = {
  card_type: "nav",
  items: [
    { name: he ? "בית" : "Home", icon: "mdi:home", navigation_path: location.pathname },
    { name: he ? "אורות" : "Lights", icon: "mdi:lightbulb-group", navigation_path: "#lights", entity: "light.ceiling" },
    { name: he ? "אקלים" : "Climate", icon: "mdi:thermostat", navigation_path: "#climate" },
    { name: he ? "מדיה" : "Media", icon: "mdi:play-circle", navigation_path: "#media" },
  ],
};
const chips: Cfg = {
  card_type: "chips",
  chips: [
    // The mock has no HA translations, so the condition is spelled out.
    { entity: "weather.home", icon: "mdi:weather-partly-cloudy", color: "light-blue", name: he ? "בחוץ" : "Outside", value: he ? "22° · מעונן" : "22° · Cloudy" },
    { entity: "sensor.sun_next_setting", icon: "mdi:weather-sunset-down", color: "deep-orange" },
    { entity: "sensor.lights_on", icon: "mdi:lightbulb-group", color: "amber", name: "" },
  ],
};
const popup: Cfg = {
  card_type: "popup", hash: "#lights", title: "Lights", icon: "mdi:lightbulb-group",
  cards: [
    { type: "custom:glide-card", card_type: "button", entity: "light.ceiling" },
    { type: "custom:glide-card", card_type: "button", entity: "light.kitchen" },
    { type: "custom:glide-card", card_type: "button", entity: "light.floor_lamp", layout: "pill" },
    { type: "custom:glide-card", card_type: "button", entity: "light.desk", layout: "pill" },
  ],
};

const dashboard = (he = false): Cfg[] => [
  { card_type: "title", title: he ? "ערב טוב" : "Good evening", subtitle: he ? "3 אורות דולקים · 22°" : "3 lights on · 22° outside" },
  chips,
  { card_type: "heading", title: he ? "סלון" : "Living Room", icon: "mdi:sofa", color: "orange", badges: [{ entity: "sensor.living_temp", icon: "mdi:thermometer", color: "orange" }] },
  { card_type: "button", entity: "light.ceiling" },
  { card_type: "button", entity: "light.floor_lamp" },
  { card_type: "button", entity: "cover.blinds" },
  { card_type: "button", entity: "cover.curtains" },
  { card_type: "climate", entity: "climate.living", size: "slim" },
  { card_type: "media", entity: "media_player.living", size: "slim" },
  nav,
];

const pair = (cards: Cfg[], extra: Partial<Panel> = {}, theme = "glass"): Panel[] => [
  { theme, mode: "dark", cards, short: true, ...extra },
  { theme, mode: "light", cards, short: true, ...extra },
];

const trio = (mode: Mode): Panel[] =>
  [["glass", "Liquid Glass"], ["bubble", "Refined Bubble"], ["material", "Material You"]].map(([theme, label]) => ({ theme, mode, label, cards: dashboard() }));

const SHOTS: Record<string, () => Panel[]> = {
  "hero-dark": () => trio("dark"),
  "hero-light": () => trio("light"),
  rtl: () => [
    { theme: "glass", mode: "dark", cards: dashboard(true) },
    { theme: "material", mode: "light", cards: dashboard(true) },
  ],
  button: () => pair([
    { card_type: "button", entity: "light.ceiling" },
    { card_type: "button", entity: "light.floor_lamp" },
    { card_type: "button", entity: "fan.ceiling" },
    { card_type: "button", entity: "lock.front", color: "teal" },
    { card_type: "button", entity: "light.kitchen", layout: "pill" },
    { card_type: "button", entity: "script.good_night", layout: "pill" },
  ]),
  covers: () => pair([
    { card_type: "button", entity: "cover.blinds" },
    { card_type: "button", entity: "cover.curtains" },
    { card_type: "button", entity: "cover.office", view: "city" },
    { card_type: "button", entity: "cover.bedroom", color: "#b38b6d", view: "sea" },
  ]),
  "covers-night": () => pair([
    { card_type: "button", entity: "cover.blinds" },
    { card_type: "button", entity: "cover.curtains" },
    { card_type: "button", entity: "cover.office", view: "city" },
    { card_type: "button", entity: "cover.bedroom", color: "#b38b6d", view: "sea" },
  ]),
  climate: () => pair([{ card_type: "climate", entity: "climate.living" }]),
  media: () => pair([{ card_type: "media", entity: "media_player.living" }]),
  chips: () => pair([
    { card_type: "title", title: "Good evening", subtitle: "3 lights on · 22° outside" },
    chips,
    { card_type: "heading", title: "Living Room", icon: "mdi:sofa", color: "orange", badges: [{ entity: "sensor.living_temp", icon: "mdi:thermometer", color: "orange" }, { entity: "sensor.humidity", icon: "mdi:water-percent", color: "light-blue" }] },
    { card_type: "heading", title: "Blinds", subtitle: "1 open", icon: "mdi:blinds", color: "purple", style: "subtitle", tap_action: { action: "navigate", navigation_path: "#blinds" } },
  ]),
  nav: () => pair([{ card_type: "button", entity: "light.ceiling" }, { card_type: "button", entity: "cover.blinds" }, nav], { short: false, height: 250 }),
  sizes: () =>
    (["full", "compact", "slim"] as const).map((size) => ({
      theme: "glass", mode: "dark" as Mode, label: size, short: true,
      cards: [
        { card_type: "button", entity: "light.ceiling", size },
        { card_type: "button", entity: "light.desk", size },
        { card_type: "button", entity: "fan.ceiling", layout: "pill", size },
        { card_type: "media", entity: "media_player.living", size },
      ],
    })),
  // The first light tile opens the sheet, so the GIF shows the tile morphing into it.
  popup: () => [{ theme: "glass", mode: "dark", cards: [...dashboard().map((c) => (c.entity === "light.ceiling" ? { ...c, tap_action: { action: "navigate", navigation_path: "#lights" } } : c)), popup], width: 390, height: 800 }],
  "popup-light": () => [{ theme: "glass", mode: "light", cards: [...dashboard(), popup], width: 390, height: 800 }],
  "gif-covers": () => [{
    theme: "glass", mode: "light", short: true, width: 440,
    cards: [{ card_type: "button", entity: "cover.blinds" }, { card_type: "button", entity: "cover.curtains" }],
  }],
  "gif-tap": () => [{
    theme: "glass", mode: "dark", short: true, width: 440,
    cards: (["shine", "ripple", "jelly", "sparks"] as const).map((fx, i) => ({
      card_type: "button", entity: ["light.ceiling", "fan.ceiling", "light.kitchen", "switch.coffee"][i], name: fx[0].toUpperCase() + fx.slice(1), tap_animation: fx,
      tap_action: { action: "none" },
    })),
  }],
};

(window as any).loadCardHelpers = async () => ({
  createCardElement(config: Cfg) {
    const el = document.createElement(config.type.replace("custom:", "")) as any;
    el.setConfig(config);
    return el;
  },
});

const stage = document.getElementById("stage")!;
const els: any[] = [];
const panels = (SHOTS[shot] ?? SHOTS["hero-dark"])();
if (panels.length === 1 && panels[0].height) stage.style.padding = "0";
for (const p of panels) {
  const phone = document.createElement("div");
  phone.className = `phone${p.short ? " short" : ""}`;
  phone.dataset.bg = `${p.theme}-${p.mode}`;
  phone.dataset.mode = p.mode;
  if (p.width) phone.style.setProperty("--w", `${p.width}px`);
  if (p.height) phone.style.setProperty("--h", `${p.height}px`);
  if (p.label) phone.insertAdjacentHTML("beforeend", `<p class="label">${p.label}</p>`);
  const grid = document.createElement("div");
  grid.className = "grid";
  phone.append(grid);
  stage.append(phone);
  for (const cfg of p.cards) {
    const el = document.createElement("glide-card") as any;
    el.setConfig({ type: "custom:glide-card", ...cfg, theme: p.theme, mode: p.mode });
    el.hass = getHass();
    grid.append(el);
    const g = el.getGridOptions?.() ?? { columns: 12, rows: 1 };
    el.style.setProperty("--cols", g.columns);
    if (typeof g.rows === "number") el.style.setProperty("--rows", g.rows);
    else el.style.gridRow = "auto";
    els.push(el);
  }
}
subscribe((h) => els.forEach((el) => (el.hass = h)));

// Hooks for the capture script.
Object.assign(window, {
  setCover: (id: string, pos: number) => patchState(id, pos ? "open" : "closed", { current_position: pos }),
  openPopup: (hash: string) => { history.pushState({}, "", hash); window.dispatchEvent(new HashChangeEvent("hashchange")); },
  closePopup: () => { history.pushState({}, "", location.pathname + location.search); window.dispatchEvent(new HashChangeEvent("hashchange")); },
});
Promise.all([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(() => ((window as any).__ready = true));
