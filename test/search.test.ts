import { beforeEach, describe, expect, it } from "vitest";
import { collectDashboard, collectExtras, frequent, matchTier, normalize, rank, type SearchEntry } from "../src/core/search-index";
import { recordTap, resetUsage, usageKey, usageOf } from "../src/core/usage";
import type { HassEntity, HomeAssistant } from "../src/core/types";

const G = "custom:glide-card";
const btn = (entity: string, name?: string) => ({ type: G, card_type: "button", entity, ...(name ? { name } : {}) });
const ent = (entity_id: string, friendly_name: string): HassEntity => ({
  entity_id, state: "off", attributes: { friendly_name }, last_changed: "", last_updated: "",
});
const labels = { places: "מקומות", extras: "ישויות נוספות", sensors: "חיישנים" };

const dashboard = {
  views: [
    {
      title: "ראשי",
      path: "main",
      sections: [
        { type: "grid", cards: [btn("light.living", "אור סלון"), { type: "vertical-stack", cards: [btn("climate.living", "מזגן סלון")] }] },
        {
          type: "grid",
          cards: [
            { type: G, card_type: "nav", items: [] },
            { type: G, card_type: "popup", hash: "#more", title: "עוד", cards: [] },
          ],
        },
      ],
    },
    {
      title: "משרד",
      path: "office",
      sections: [
        { type: "grid", cards: [btn("light.office", "אור משרד"), { type: "tile", entity: "cover.office" }] },
        { type: "grid", cards: [{ type: G, card_type: "popup", hash: "#more", title: "עוד", cards: [] }] },
      ],
    },
    {
      title: "קומת חדרים",
      path: "bedrooms",
      sections: [
        {
          type: "grid",
          cards: [
            { type: G, card_type: "popup", hash: "#bedroom", title: "חדר שינה", cards: [btn("climate.bedroom", "מזגן חדר שינה"), btn("light.living", "סלון מלמעלה")] },
          ],
        },
      ],
    },
  ],
};
const hass = {
  states: Object.fromEntries(
    [
      ent("light.living", "Living"), ent("light.office", "Office"), ent("cover.office", "תריס משרד"),
      ent("climate.living", "AC"), ent("climate.bedroom", "AC2"),
      ent("switch.garden_pump", "משאבת גינה"), ent("sensor.pool_temp", "טמפרטורת בריכה"),
      ent("light.hidden", "Hidden"), ent("switch.config", "Config"), ent("weather.home", "Weather"),
    ].map((s) => [s.entity_id, s]),
  ),
  entities: {
    "light.hidden": { hidden: true },
    "switch.config": { entity_category: "config" },
    "switch.garden_pump": { device_id: "d1" },
  },
  devices: { d1: { area_id: "garden" } },
  areas: { garden: { name: "גינה" } },
} as unknown as HomeAssistant;

const index = (): SearchEntry[] => {
  const cards = collectDashboard(dashboard, "home-glass", hass);
  const known = new Set(cards.map((e) => e.config.entity).filter(Boolean));
  return [...cards, ...collectExtras(hass, known, { labels })];
};

describe("normalize", () => {
  it("drops niqqud and punctuation, maps final letters, collapses spaces", () => {
    expect(normalize("  מַזְגָן   סָלוֹן ")).toBe("מזגנ סלונ");
    expect(normalize("מזגן")).toBe(normalize("מזגנ"));
    expect(normalize("Living-Room")).toBe("living room");
    expect(normalize("ממ\"ד")).toBe("ממ ד");
  });
});

describe("collectDashboard", () => {
  const cards = collectDashboard(dashboard, "home-glass", hass);
  const by = (key: string) => cards.find((e) => e.key === key)!;

  it("lists views and pop-ups as places", () => {
    expect(by("nav:/home-glass/office").kind).toBe("place");
    expect(by("nav:#bedroom").config.tap_action).toEqual({ action: "navigate", navigation_path: "#bedroom" });
  });
  it("walks stacks and pop-ups and groups by page and room", () => {
    expect(by("climate.living").group).toBe("ראשי");
    expect(by("climate.bedroom").group).toBe("קומת חדרים › חדר שינה");
    expect(by("cover.office").name).toBe("תריס משרד");
  });
  it("lists an entity once, remembering its other places", () => {
    expect(cards.filter((e) => e.key === "light.living")).toHaveLength(1);
    expect(by("light.living").alt).toEqual(["אור תאורה light", "קומת חדרים › חדר שינה"]);
  });
  it("prefers a named button over a climate card and shows climate cards as buttons", () => {
    const list = collectDashboard({ views: [
      { title: "אקלים", cards: [{ type: G, card_type: "climate", entity: "climate.bedroom" }] },
      { title: "ראשי", cards: [
        btn("climate.bedroom", "מזגן הורים"),
        { type: G, card_type: "popup", hash: "#ac", title: "מזגן הורים", cards: [{ type: "grid", cards: [
          { type: G, card_type: "climate", entity: "climate.bedroom" },
          { type: "tile", entity: "climate.bedroom", name: "מהירות מאוורר" },
        ] }] },
      ] },
    ] }, "d", hass);
    const ac = list.filter((e) => e.key === "climate.bedroom");
    expect(ac).toHaveLength(1);
    expect(ac[0].name).toBe("מזגן הורים");
    expect(ac[0].group).toBe("ראשי");
    expect(ac[0].alt).toContain("אקלים");
    expect(list.some((e) => e.key === "nav:#ac")).toBe(false); // a one-device pop-up isn't a place
    const [only] = collectDashboard({ views: [{ title: "x", cards: [{ type: G, card_type: "climate", entity: "climate.living" }] }] }, "d", hass).filter((e) => e.kind === "card");
    expect(only.config).toEqual({ type: G, card_type: "button", entity: "climate.living" });
  });
  it("names a pop-up shared by several views on its own and skips nav cards", () => {
    expect(cards.filter((e) => e.key === "nav:#more")).toHaveLength(1);
    expect(by("nav:#more").group).toBe("");
    expect(cards.some((e) => e.config.card_type === "nav")).toBe(false);
  });
});

describe("collectExtras", () => {
  const extras = index().filter((e) => e.kind === "extra" || e.kind === "sensor");
  it("adds actionable entities and sensors not on the dashboard, grouped by area", () => {
    expect(extras.map((e) => e.key).sort()).toEqual(["sensor.pool_temp", "switch.garden_pump"]);
    expect(extras.find((e) => e.key === "switch.garden_pump")!.group).toBe("ישויות נוספות › גינה");
    expect(extras.find((e) => e.key === "sensor.pool_temp")!.config.tap_action).toEqual({ action: "more-info" });
  });
  it("can leave sensors and globbed ids out", () => {
    const list = collectExtras(hass, new Set(), { labels, sensors: false, exclude: ["switch.garden_*"] });
    expect(list.some((e) => e.kind === "sensor" || e.key === "switch.garden_pump")).toBe(false);
  });
});

describe("matching and ranking", () => {
  const all = index();
  const none = () => 0;

  it("rates exact, prefix, word, substring, group and other-place matches", () => {
    const e = { kind: "card", key: "x", name: "מזגן סלון", group: "ראשי", alt: ["חדר עבודה"], config: {}, order: 0 } as SearchEntry;
    expect(matchTier(e, "מזגן סלון")).toBe(0);
    expect(matchTier(e, "מזג")).toBe(1);
    expect(matchTier(e, "סל")).toBe(2);
    expect(matchTier(e, "זגן")).toBe(3);
    expect(matchTier(e, "ראשי מזגן")).toBe(4);
    expect(matchTier(e, "עבודה")).toBe(5);
    expect(matchTier(e, "בריכה")).toBeUndefined();
  });
  it("puts places first, then dashboard rooms, then other entities", () => {
    const { groups } = rank(all, "משרד", none, labels);
    expect(groups.map((g) => g.title)).toEqual(["מקומות", "משרד"]);
    expect(groups[1].entries.map((e) => e.key)).toEqual(["light.office", "cover.office"]);
  });
  it("finds every AC across rooms, and usage breaks ties", () => {
    const { groups } = rank(all, "מזגן", (k) => (k === "climate.bedroom" ? 3 : 0), labels);
    expect(groups[0].title).toBe("קומת חדרים › חדר שינה");
    expect(groups.flatMap((g) => g.entries.map((e) => e.key))).toEqual(["climate.bedroom", "climate.living"]);
  });
  it("finds a device by its kind when its name doesn't say it", () => {
    const e = { kind: "card", key: "climate.kid", name: "חדר יובל", group: "אקלים", alt: [], config: { entity: "climate.kid" }, order: 0 } as SearchEntry;
    const [found] = collectDashboard({ views: [{ title: "אקלים", cards: [{ type: G, card_type: "button", entity: "climate.kid", name: "חדר יובל" }] }] }, "d", hass).filter((x) => x.kind === "card");
    expect(matchTier(e, "מזגן")).toBeUndefined();
    expect(matchTier(found, "מזגן")).toBe(5);
  });
  it("names a button by its entity when the name is a template", () => {
    const [found] = collectDashboard({ views: [{ title: "x", cards: [btn("light.office", "{% if true %}a{% endif %}")] }] }, "d", hass).filter((x) => x.kind === "card");
    expect(found.name).toBe("Office");
  });
  it("counts what doesn't fit the limit", () => {
    expect(rank(all, "ו", none, labels, 2).more).toBeGreaterThan(0);
  });
  it("lists the most used controls for the empty search", () => {
    const use = (k: string) => ({ "light.office": 5, "switch.garden_pump": 2, "nav:#bedroom": 9 })[k] ?? 0;
    expect(frequent(all, use, 8).map((e) => e.key)).toEqual(["light.office", "switch.garden_pump"]);
  });
});

describe("usage", () => {
  beforeEach(() => {
    localStorage.clear();
    resetUsage();
  });
  it("keys buttons by entity, then destination, then name", () => {
    expect(usageKey({ entity: "light.a" })).toBe("light.a");
    expect(usageKey({ tap_action: { navigation_path: "#x" } })).toBe("nav:#x");
    expect(usageKey({ name: "לילה טוב" })).toBe("name:לילה טוב");
  });
  it("counts taps and halves them every 14 days", () => {
    const day = 24 * 3600 * 1000;
    recordTap("light.a", 0);
    recordTap("light.a", 0);
    expect(usageOf("light.a", 0)).toBe(2);
    expect(usageOf("light.a", 14 * day)).toBeCloseTo(1);
    resetUsage();
    expect(usageOf("light.a", 0)).toBe(2); // persisted
  });
});
