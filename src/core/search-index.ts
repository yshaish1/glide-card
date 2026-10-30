import { usageKey } from "./usage";
import type { HomeAssistant } from "./types";

type Cfg = Record<string, any>;

/** What a search hit is: somewhere to go, a card from the dashboard, another entity, or a read-only sensor. */
export type EntryKind = "place" | "card" | "extra" | "sensor";

export interface SearchEntry {
  kind: EntryKind;
  /** Usage key (see usageKey) and dedupe key. */
  key: string;
  name: string;
  /** Heading the entry is listed under, e.g. "קומת חדרים › חדר שינה". */
  group: string;
  /** Other places the same entity appears, also searched. */
  alt: string[];
  /** Card config to render. */
  config: Cfg;
  /** Walk order, the last tie-breaker. */
  order: number;
}

export interface SearchLabels {
  places: string;
  extras: string;
  sensors: string;
}

/** Entities that do something when tapped; anything else on/off goes through homeassistant.toggle. */
export const ACTION_DOMAINS = [
  "light", "switch", "input_boolean", "cover", "climate", "fan", "script", "scene",
  "media_player", "vacuum", "lock", "button", "input_button", "humidifier", "water_heater", "valve", "siren",
];
export const SENSOR_DOMAINS = ["sensor", "binary_sensor"];

const GLIDE = "custom:glide-card";
const ENTITY_CARDS = new Set(["button", "climate", "media"]);
const SKIP_CARDS = new Set(["nav", "search", "background", "title", "heading", "chips"]);

/** Lowercase, no niqqud or punctuation, Hebrew final letters as regular ones, single spaces. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[֑-ׇ]/g, "")
    .replace(/[ךםןףץ]/g, (c) => ({ ך: "כ", ם: "מ", ן: "נ", ף: "פ", ץ: "צ" })[c]!)
    .replace(/["'`׳״\-_.,:;!?()[\]{}|/\\]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const isTemplate = (v: unknown) => typeof v === "string" && /\{\{|\{%/.test(v);

/** What people call each kind of device, so "מזגן" finds an AC named after its room. */
const DOMAIN_WORDS: Record<string, string> = {
  light: "אור תאורה light", climate: "מזגן מיזוג ac climate", cover: "תריס וילון cover blind shutter",
  switch: "מתג שקע switch plug", fan: "מאוורר fan", media_player: "מדיה רמקול טלוויזיה media speaker tv",
  vacuum: "שואב vacuum", script: "תסריט script", scene: "סצנה scene", lock: "מנעול lock",
  water_heater: "דוד boiler", camera: "מצלמה camera",
};
const domainWords = (entity?: string) => {
  const w = entity ? DOMAIN_WORDS[entity.split(".")[0]] : undefined;
  return w ? [w] : [];
};

function cardName(c: Cfg, hass?: HomeAssistant): string {
  if (typeof c.name === "string" && c.name && !isTemplate(c.name)) return c.name;
  const id = c.entity as string | undefined;
  const fn = id ? hass?.states[id]?.attributes.friendly_name : undefined;
  return fn ?? id ?? "";
}

/** The dashboard's `url_path`, the first part of the location (`/home-glass/main` → `home-glass`). */
export const dashboardOf = (pathname: string) => pathname.split("/").filter(Boolean)[0] ?? "lovelace";

/**
 * Every place and control on a dashboard, in page order: views and glide pop-ups become places;
 * glide buttons/climate/media and tiles become cards. Nested stacks, grids, conditionals and pop-ups
 * are walked. The same entity on several pages is listed once, where it appears first.
 */
export function collectDashboard(lovelace: Cfg | undefined, base: string, hass?: HomeAssistant): SearchEntry[] {
  const views: Cfg[] = lovelace?.views ?? [];
  const out: SearchEntry[] = [];
  const byKey = new Map<string, SearchEntry>();
  let order = 0;

  // A pop-up copied onto several views (a menu, say) is named on its own; one that lives on a single view gets the view's name too.
  const hashViews = new Map<string, Set<number>>();
  const eachCard = (cards: Cfg[] | undefined, fn: (c: Cfg) => void) => {
    for (const c of cards ?? []) {
      if (!c || typeof c !== "object") continue;
      fn(c);
      eachCard(c.cards, fn);
      if (c.card) eachCard([c.card], fn);
    }
  };
  const viewCards = (v: Cfg) => [...(v.cards ?? []), ...(v.sections ?? [])];
  views.forEach((v, i) =>
    eachCard(viewCards(v), (c) => {
      if (c.type === GLIDE && c.card_type === "popup" && c.hash) {
        if (!hashViews.has(c.hash)) hashViews.set(c.hash, new Set());
        hashViews.get(c.hash)!.add(i);
      }
    }),
  );

  // The same entity on several pages is listed once, as its best card: a named glide button over any glide button, over a climate/media card, over a tile.
  const ranks = new Map<string, number>();
  const add = (e: Omit<SearchEntry, "order" | "alt">, words: string[] = []) => {
    const r = cardRank(e.config);
    const seen = byKey.get(e.key);
    if (seen) {
      const better = r > ranks.get(e.key)!;
      const other = better ? seen.group : e.group;
      if (better) Object.assign(seen, { name: e.name, group: e.group, config: asButton(e.config) }), ranks.set(e.key, r);
      if (other && other !== seen.group && !seen.alt.includes(other)) seen.alt.push(other);
      return;
    }
    const entry = { ...e, config: asButton(e.config), alt: [...words], order: order++ };
    byKey.set(e.key, entry);
    ranks.set(e.key, r);
    out.push(entry);
  };

  const walk = (cards: Cfg[] | undefined, group: string, viewTitle: string, viewIndex: number) => {
    for (const c of cards ?? []) {
      if (!c || typeof c !== "object") continue;
      if (c.type === GLIDE) {
        const type = c.card_type ?? "button";
        if (type === "popup" && c.hash) {
          const title = c.title ?? c.hash.slice(1);
          const shared = (hashViews.get(c.hash)?.size ?? 0) > 1;
          const label = shared || !viewTitle ? title : `${viewTitle} › ${title}`;
          // A pop-up holding a single device (an AC's controls, say) is found through that device instead.
          const detail = entitiesIn(c.cards).size === 1;
          if (!detail) add({
            kind: "place",
            key: `nav:${c.hash}`,
            name: title,
            group: shared ? "" : viewTitle,
            config: placeButton(title, c.icon ?? "mdi:card-outline", c.hash),
          });
          walk(c.cards, label, viewTitle, viewIndex);
          continue;
        }
        if (SKIP_CARDS.has(type)) continue;
        if (ENTITY_CARDS.has(type)) {
          const key = usageKey(c);
          const name = cardName(c, hass);
          if (key && name) add({ kind: "card", key, name, group, config: c }, domainWords(c.entity));
        }
        continue;
      }
      if (c.type === "tile" && c.entity) {
        add({ kind: "card", key: c.entity, name: cardName(c, hass), group, config: c }, domainWords(c.entity));
        continue;
      }
      walk(c.cards, group, viewTitle, viewIndex);
      if (c.card) walk([c.card], group, viewTitle, viewIndex);
    }
  };

  views.forEach((v, i) => {
    const title: string = v.title ?? v.path ?? String(i);
    const path = `/${base}/${v.path ?? i}`;
    add({ kind: "place", key: `nav:${path}`, name: title, group: "", config: placeButton(title, v.icon ?? "mdi:view-dashboard", path) });
    walk(viewCards(v), title, title, i);
  });
  return out;
}

function cardRank(c: Cfg): number {
  if (c.type !== GLIDE) return 0;
  if ((c.card_type ?? "button") !== "button") return 1;
  return typeof c.name === "string" && c.name && !isTemplate(c.name) ? 3 : 2;
}

function entitiesIn(cards: Cfg[] | undefined, out = new Set<string>()): Set<string> {
  for (const c of cards ?? []) {
    if (!c || typeof c !== "object") continue;
    if (typeof c.entity === "string") out.add(c.entity);
    entitiesIn(c.cards, out);
    if (c.card) entitiesIn([c.card], out);
  }
  return out;
}

/** Climate and media cards are big; results show them as buttons. */
const asButton = (c: Cfg): Cfg =>
  c.type === GLIDE && (c.card_type === "climate" || c.card_type === "media")
    ? { type: GLIDE, card_type: "button", entity: c.entity, ...(c.name ? { name: c.name } : {}), ...(c.theme ? { theme: c.theme } : {}) }
    : c;

const placeButton = (name: string, icon: string, path: string): Cfg => ({
  type: GLIDE,
  card_type: "button",
  layout: "pill",
  name,
  icon,
  tap_action: { action: "navigate", navigation_path: path },
});

/** Entities not on the dashboard: actionable ones, then (optionally) sensors, grouped by HA area. */
export function collectExtras(
  hass: HomeAssistant,
  known: Set<string>,
  opts: { domains?: string[]; sensors?: boolean; exclude?: string[]; labels: SearchLabels },
): SearchEntry[] {
  const domains = new Set(opts.domains ?? ACTION_DOMAINS);
  const sensors = new Set(opts.sensors === false ? [] : SENSOR_DOMAINS);
  const exclude = (opts.exclude ?? []).map(globRegex);
  const reg = hass.entities ?? {};
  const out: SearchEntry[] = [];
  let order = 100000;
  for (const id of Object.keys(hass.states).sort()) {
    if (known.has(id) || exclude.some((r) => r.test(id))) continue;
    const domain = id.split(".")[0];
    const sensor = sensors.has(domain);
    if (!sensor && !domains.has(domain)) continue;
    const r = reg[id];
    if (r && (r.hidden || r.entity_category)) continue;
    const areaId = r?.area_id ?? (r?.device_id ? hass.devices?.[r.device_id]?.area_id : undefined);
    const area = areaId ? hass.areas?.[areaId]?.name : undefined;
    const top = sensor ? opts.labels.sensors : opts.labels.extras;
    const s = hass.states[id];
    out.push({
      kind: sensor ? "sensor" : "extra",
      key: id,
      name: s.attributes.friendly_name ?? id,
      group: area ? `${top} › ${area}` : top,
      alt: [...(area ? [area] : []), ...domainWords(id)],
      config: { type: GLIDE, card_type: "button", entity: id, ...(sensor ? { tap_action: { action: "more-info" } } : {}) },
      order: order++,
    });
  }
  return out;
}

const globRegex = (g: string) => new RegExp(`^${g.split("*").map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`);

/**
 * How well an entry matches, lower is better (undefined: no match).
 * 0 exact name, 1 name starts with it, 2 a word in the name starts with it, 3 anywhere in the name,
 * 4 every word found in the name or its group (page/room), 5 found only with the other places it appears.
 */
export function matchTier(e: SearchEntry, q: string): number | undefined {
  const query = normalize(q);
  if (!query) return undefined;
  const name = normalize(e.name);
  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (name.split(" ").some((w) => w.startsWith(query))) return 2;
  if (name.includes(query)) return 3;
  const words = query.split(" ");
  const main = `${name} ${normalize(e.group)}`;
  if (words.every((w) => main.includes(w))) return 4;
  const all = `${main} ${e.alt.map(normalize).join(" ")}`;
  if (words.every((w) => all.includes(w))) return 5;
  return undefined;
}

export interface ResultGroup {
  title: string;
  kind: EntryKind;
  entries: SearchEntry[];
}

const KIND_RANK: Record<EntryKind, number> = { place: 0, card: 1, extra: 2, sensor: 3 };

/**
 * Matches grouped for display: places first, then dashboard cards by room, then other entities and
 * sensors. Within each, groups follow their best match (tier, then usage), entries the same way.
 */
export function rank(entries: SearchEntry[], q: string, usage: (key: string) => number, labels: SearchLabels, limit = 60): { groups: ResultGroup[]; more: number } {
  const hits = entries
    .map((e) => ({ e, tier: matchTier(e, q), use: usage(e.key) }))
    .filter((h): h is { e: SearchEntry; tier: number; use: number } => h.tier !== undefined)
    .sort((a, b) => a.tier - b.tier || b.use - a.use || a.e.order - b.e.order);
  const shown = hits.slice(0, limit);
  const groups = new Map<string, ResultGroup & { best: number }>();
  shown.forEach((h, i) => {
    const title = h.e.kind === "place" ? labels.places : h.e.group;
    const id = `${h.e.kind === "place" ? "place" : h.e.kind}|${title}`;
    if (!groups.has(id)) groups.set(id, { title, kind: h.e.kind, entries: [], best: i });
    groups.get(id)!.entries.push(h.e);
  });
  const list = [...groups.values()].sort((a, b) => KIND_RANK[a.kind] - KIND_RANK[b.kind] || a.best - b.best);
  return { groups: list.map(({ best: _b, ...g }) => g), more: hits.length - shown.length };
}

/** The most used controls (not places or sensors) for the empty search. */
export function frequent(entries: SearchEntry[], usage: (key: string) => number, count: number): SearchEntry[] {
  return entries
    .filter((e) => e.kind === "card" || e.kind === "extra")
    .map((e) => ({ e, use: usage(e.key) }))
    .filter((x) => x.use > 0.05)
    .sort((a, b) => b.use - a.use || a.e.order - b.e.order)
    .slice(0, count)
    .map((x) => x.e);
}
