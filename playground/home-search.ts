// Search-first page demo: a clock, info chips and an inline search over another dashboard.
// `?data=<dir>` loads a real dashboard (`lovelace.json`) and states (`states.json`); `?q=` types a query.
import "./ha-icon";
import "../src/glide-card";
import type { HassEntity, HomeAssistant } from "../src/core/types";

type Cfg = Record<string, any>;
const G = "custom:glide-card";
const params = new URLSearchParams(location.search);
const now = new Date().toISOString();
const e = (entity_id: string, state: string, friendly_name: string, attrs: Cfg = {}): HassEntity => ({
  entity_id, state, attributes: { friendly_name, ...attrs }, last_changed: now, last_updated: now,
});

const sample = {
  lovelace: {
    views: [
      { title: "ראשי", path: "main", sections: [{ type: "grid", cards: [
        { type: G, card_type: "button", entity: "light.living", name: "אור סלון" },
        { type: G, card_type: "button", entity: "climate.living", name: "מזגן סלון" },
      ] }] },
      { title: "משרד", path: "office", sections: [{ type: "grid", cards: [
        { type: G, card_type: "button", entity: "light.office", name: "אור משרד" },
      ] }] },
    ],
  },
  states: [
    e("light.living", "on", "Living", { brightness: 200 }), e("light.office", "off", "Office"),
    e("climate.living", "cool", "AC", { temperature: 24, current_temperature: 25, hvac_modes: ["off", "cool"] }),
    e("sensor.jewish_calendar_date", 'י"ט מרחשוון ה\' תשפ"ז', "Jewish Calendar Date"),
    e("switch.dvd_khshml", "on", "דוד חשמל"),
  ],
};

async function load() {
  const dir = params.get("data");
  if (!dir) return sample;
  const [lovelace, states] = await Promise.all(["lovelace", "states"].map((f) => fetch(`${dir}/${f}.json`).then((r) => r.json())));
  return { lovelace: lovelace.config ?? lovelace, states: states as HassEntity[] };
}

const data = await load();
let states: Record<string, HassEntity> = Object.fromEntries(data.states.map((s) => [s.entity_id, s]));
// `?boiler=on` shows the alert row.
if (params.has("boiler") && states["switch.dvd_khshml"]) states["switch.dvd_khshml"] = { ...states["switch.dvd_khshml"], state: params.get("boiler")! };
const cards: any[] = [];
const hass = (): HomeAssistant => ({
  states, language: "he", locale: { language: "he" }, themes: { darkMode: true },
  async callService(domain, _service, d: Cfg = {}) {
    const s = states[d.entity_id];
    if (!s) return;
    const on = !["off", "closed"].includes(s.state);
    states = { ...states, [s.entity_id]: { ...s, state: on ? (domain === "cover" ? "closed" : "off") : domain === "cover" ? "open" : "on" } };
    const h = hass();
    cards.forEach((c) => (c.hass = h));
  },
  async callWS<T>() {
    return data.lovelace as T;
  },
  connection: { async subscribeMessage(cb: (m: any) => void) { setTimeout(() => cb({ result: "" }), 20); return () => {}; } },
});

(window as any).loadCardHelpers = async () => ({
  createCardElement(config: Cfg) {
    const tag = config.type.startsWith("custom:") ? config.type.slice(7) : "div";
    const el = document.createElement(tag) as any;
    if (tag === "div") {
      el.textContent = `${config.type} ${config.entity ?? ""}`;
      el.style.cssText = "padding:12px;border-radius:14px;background:rgba(255,255,255,.08);font-size:13px";
      return el;
    }
    el.setConfig(config);
    return el;
  },
});

// The main page's weather/sun/Shabbat chips, as on the HA dashboard.
const mainChips: Cfg[] = [];
JSON.stringify(data.lovelace.views?.[0], (_k, v) => (v?.card_type === "chips" && !mainChips.length && v.chips?.some((c: Cfg) => c.entity === "weather.forecast_home") && mainChips.push(v), v));
const infoChips = (mainChips[0]?.chips ?? []).filter((c: Cfg) => !String(c.entity).startsWith("sensor.mspr_"));
const nav = (path: string) => ({ action: "navigate", navigation_path: `/home-glass/${path}` });

const page: Cfg[] = [
  { type: G, card_type: "clock", secondary_entity: "sensor.jewish_calendar_date" },
  { type: G, card_type: "chips", align: "center", chips: infoChips },
  { type: G, card_type: "chips", align: "center", chips: [
    { entity: "person.yossi_shaish", icon: "mdi:account", name: "יוסי", color: "light-blue" },
    { entity: "person.bvshbvsh", icon: "mdi:account", name: "בושבוש", color: "pink" },
    { entity: "sensor.mspr_mzgnym_dvlqym", icon: "mdi:air-conditioner", name: "מזגנים דולקים", color: "light-green", tap_action: nav("climate") },
    { entity: "sensor.mspr_vrvt_dvlqym_bbyt", icon: "mdi:lamps", name: "אורות בבית", color: "orange", tap_action: nav("lights-inside") },
    { entity: "sensor.mspr_vrvt_bkhvts", icon: "mdi:outdoor-lamp", name: "אורות בחוץ", color: "teal", tap_action: nav("lights-outside") },
  ] },
  { type: G, card_type: "chips", align: "center", chips: [
    { entity: "input_datetime.boiler_off_at", icon: "mdi:water-boiler", name: "הדוד דולק עד", color: "red", tap_action: nav("main_dashboard#boiler"),
      visibility: [{ condition: "state", entity: "switch.dvd_khshml", state: "on" }] },
  ] },
  { type: G, card_type: "search", inline: true, source: "home-glass", placeholder: "מה לחפש?" },
];

const grid = document.getElementById("grid")!;
for (const cfg of page) {
  const el = document.createElement("glide-card") as any;
  el.setConfig(cfg);
  el.hass = hass();
  el.style.setProperty("--cols", el.getGridOptions().columns);
  grid.appendChild(el);
  cards.push(el);
}
// Breathing room between the info and the search, like a home page.
cards.at(-1).style.marginTop = "28px";

const q = params.get("q");
if (q) {
  setTimeout(() => {
    const input = cards.at(-1).querySelector("glide-search-panel")?.shadowRoot?.querySelector("input") as HTMLInputElement | null;
    if (!input) return;
    input.value = q;
    input.dispatchEvent(new Event("input"));
  }, 600);
}
(window as any).__ready = true;
