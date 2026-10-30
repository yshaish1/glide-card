// Search demo: `?data=<dir>` loads a real dashboard (`lovelace.json`) and states (`states.json`, as /api/states returns them)
// instead of the sample; `?q=` types a query once the sheet is open.
import "./ha-icon";
import "../src/glide-card";
import type { HassEntity, HomeAssistant } from "../src/core/types";
import { recordTap } from "../src/core/usage";

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
        { type: G, card_type: "button", entity: "cover.office", name: "תריס משרד" },
      ] }] },
      { title: "קומת חדרים", path: "bedrooms", sections: [{ type: "grid", cards: [
        { type: G, card_type: "popup", hash: "#bedroom", title: "חדר שינה", icon: "mdi:bed", cards: [
          { type: G, card_type: "button", entity: "climate.bedroom", name: "מזגן חדר שינה" },
          { type: G, card_type: "button", entity: "light.bedroom", name: "אור חדר שינה" },
        ] },
      ] }] },
    ],
  },
  states: [
    e("light.living", "on", "Living", { brightness: 200 }), e("light.office", "off", "Office"), e("light.bedroom", "off", "Bedroom"),
    e("climate.living", "cool", "AC", { temperature: 24, current_temperature: 25, hvac_modes: ["off", "cool", "heat"] }),
    e("climate.bedroom", "off", "AC2", { temperature: 22, current_temperature: 23, hvac_modes: ["off", "cool", "heat"] }),
    e("cover.office", "open", "Office cover", { current_position: 60 }),
    e("switch.garden_pump", "off", "משאבת גינה"), e("sensor.pool_temp", "27", "טמפרטורת בריכה", { unit_of_measurement: "°C" }),
  ],
};

async function load() {
  const dir = params.get("data");
  if (!dir) return sample;
  const [lovelace, states] = await Promise.all(["lovelace", "states"].map((f) => fetch(`${dir}/${f}.json`).then((r) => r.json())));
  return { lovelace: lovelace.config ?? lovelace, states: states as HassEntity[] };
}

const data = await load();
// `?seed=light.a,light.b` pretends those were tapped (more for the earlier ones), to show the most-used list.
(params.get("seed") ?? "").split(",").filter(Boolean).forEach((k, i, all) => {
  for (let n = 0; n < all.length - i; n++) recordTap(k);
});
let states: Record<string, HassEntity> = Object.fromEntries(data.states.map((s) => [s.entity_id, s]));
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

const grid = document.getElementById("grid")!;
const view = (data.lovelace.views ?? [])[0];
const firstButtons: Cfg[] = [];
JSON.stringify(view, (_k, v) => (v?.type === G && v.card_type === "button" && firstButtons.length < 6 && firstButtons.push(v), v));
for (const cfg of [
  ...firstButtons,
  { type: G, card_type: "nav", items: [
    { name: "ראשי", icon: "mdi:home", navigation_path: "/search.html" },
    { name: "משרד", icon: "mdi:microsoft-office", navigation_path: "/office" },
    { name: "חיפוש", icon: "mdi:magnify", navigation_path: "#search", pinned: true },
  ] },
  { type: G, card_type: "search" },
]) {
  const el = document.createElement("glide-card") as any;
  el.setConfig(cfg);
  el.hass = hass();
  const g = el.getGridOptions();
  el.style.setProperty("--cols", g.columns);
  if (typeof g.rows === "number") el.style.setProperty("--rows", g.rows);
  grid.appendChild(el);
  cards.push(el);
}

// Sheets take hass from the cards; give the new ones a moment, then open and type.
const q = params.get("q");
if (params.has("open") || q !== null) {
  setTimeout(() => {
    history.pushState({ glidePopup: true }, "", "#search");
    window.dispatchEvent(new CustomEvent("glide-hash"));
    if (q) {
      setTimeout(() => {
        const panel = document.querySelector("glide-sheet")?.shadowRoot?.querySelector("glide-search-panel") as any;
        const input = panel?.shadowRoot?.querySelector("input") as HTMLInputElement | null;
        if (!input) return;
        input.value = q;
        input.dispatchEvent(new Event("input"));
      }, 400);
    }
  }, 300);
}
(window as any).__ready = true;
