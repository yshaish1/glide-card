import "./ha-icon";
import "../src/glide-card";
import { getHass, setDark, setLanguage, subscribe } from "./mock-hass";
import { listThemes } from "../src/themes";

type Cfg = Record<string, any>;
const cards: Cfg[] = [
  { card_type: "title", title: "משפחת שיש", subtitle: "גם כשלא היה הרבה, היה לנו הכל" },
  {
    card_type: "chips",
    chips: [
      { entity: "weather.home", icon: "mdi:weather-night", color: "blue" },
      { entity: "sensor.sun_next_rising", icon: "mdi:weather-sunset-up", color: "amber" },
      { entity: "sensor.sun_next_setting", icon: "mdi:weather-sunset-down", color: "deep-orange" },
      { entity: "sensor.acs_on", icon: "mdi:air-conditioner", color: "light-green", tap_action: { action: "navigate", navigation_path: "/climate" } },
      { entity: "sensor.outdoor_lights_on", icon: "mdi:outdoor-lamp", color: "teal" },
      { entity: "sensor.indoor_lights_on", icon: "mdi:lamps", color: "orange" },
    ],
  },
  { card_type: "heading", title: "סלון פינת אוכל", icon: "mdi:sofa", badges: [{ entity: "sensor.living_temp", icon: "mdi:thermometer", color: "orange" }, { entity: "sensor.indoor_lights_on", icon: "mdi:lightbulb-group", color: "amber" }] },
  { card_type: "button", entity: "light.ceiling" },
  { card_type: "button", entity: "light.floor_lamp" },
  { card_type: "button", entity: "cover.blinds" },
  { card_type: "button", entity: "fan.ceiling" },
  { card_type: "button", entity: "script.good_night" },
  { card_type: "heading", title: "תריסים", subtitle: "1 פתוח", icon: "mdi:blinds", color: "purple", tap_action: { action: "navigate", navigation_path: "/blinds" } },
  { card_type: "button", entity: "switch.coffee", tap_action: { action: "popup", navigation_path: "#kitchen" } },
  { card_type: "button", entity: "light.ceiling", name: "Pill layout", layout: "pill" },
  { card_type: "climate", entity: "climate.living" },
  { card_type: "media", entity: "media_player.sonos" },
  {
    card_type: "popup", hash: "#kitchen", title: "Kitchen", icon: "mdi:silverware-fork-knife",
    cards: [
      { type: "custom:glide-card", card_type: "button", entity: "switch.coffee" },
      { type: "custom:glide-card", card_type: "button", entity: "light.floor_lamp", layout: "pill" },
      { type: "custom:glide-card", card_type: "media", entity: "media_player.sonos" },
    ],
  },
  {
    card_type: "nav",
    items: [
      { name: "Home", icon: "mdi:home", navigation_path: "/playground/" },
      { name: "Kitchen", icon: "mdi:silverware-fork-knife", navigation_path: "#kitchen" },
      { name: "Climate", icon: "mdi:thermostat", navigation_path: "/climate" },
      { name: "Media", icon: "mdi:play-circle", navigation_path: "/media" },
    ],
  },
];

// HA's card helpers, as the popup uses them to build its child cards.
(window as any).loadCardHelpers = async () => ({
  createCardElement(config: Cfg) {
    const el = document.createElement(config.type.replace("custom:", "")) as any;
    try {
      el.setConfig(config);
      return el;
    } catch (err) {
      // HA renders an error card instead of throwing
      const div = document.createElement("div");
      div.style.cssText = "color:#ff6b6b;padding:12px;border:1px dashed #ff6b6b;border-radius:12px";
      div.textContent = String(err);
      return div;
    }
  },
});

const grid = document.getElementById("grid")!;
const els: any[] = [];
const state = { theme: "glass", mode: "dark" };

function build() {
  grid.replaceChildren();
  els.length = 0;
  for (const cfg of cards) {
    if (!customElements.get(`glide-${cfg.card_type}`)) continue;
    const el = document.createElement("glide-card") as any;
    el.setConfig({ type: "custom:glide-card", ...cfg, theme: state.theme, mode: state.mode });
    el.hass = getHass();
    const g = el.getGridOptions();
    el.style.setProperty("--cols", g.columns);
    if (typeof g.rows === "number") el.style.setProperty("--rows", g.rows);
    else el.style.gridRow = "auto";
    grid.appendChild(el);
    els.push(el);
  }
  document.body.dataset.bg = `${state.theme}-${state.mode}`;
}

subscribe((h) => els.forEach((el) => (el.hass = h)));

const themeSel = document.getElementById("theme") as HTMLSelectElement;
themeSel.innerHTML = listThemes().map((t) => `<option value="${t.id}">${t.name}</option>`).join("");
themeSel.onchange = () => ((state.theme = themeSel.value), build());
(document.getElementById("mode") as HTMLSelectElement).onchange = (e) => {
  state.mode = (e.target as HTMLSelectElement).value;
  setDark(state.mode === "dark");
  build();
};
(document.getElementById("lang") as HTMLSelectElement).onchange = (e) => {
  const lang = (e.target as HTMLSelectElement).value;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  document.getElementById("title")!.textContent = lang === "he" ? "סלון" : "Living Room";
  setLanguage(lang);
};
(document.getElementById("width") as HTMLSelectElement).onchange = (e) =>
  ((document.querySelector(".stage") as HTMLElement).dataset.w = (e.target as HTMLSelectElement).value);

build();
