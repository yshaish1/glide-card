/**
 * How often this device uses each button, for ordering search results. Taps decay with a 14-day
 * half-life, so old habits fade. Kept in localStorage only: per device, never sent anywhere.
 */
const KEY = "glide-usage-v1";
const HALF_LIFE_MS = 14 * 24 * 3600 * 1000;
const MAX_KEYS = 300;

type Store = Record<string, [score: number, at: number]>;
let cache: Store | undefined;

function load(): Store {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY) ?? "{}") ?? {};
  } catch {
    cache = {};
  }
  return cache!;
}

const decayed = ([score, at]: [number, number], now: number) => score * 0.5 ** (Math.max(0, now - at) / HALF_LIFE_MS);

/** The id a button is counted under: its entity, else where it goes, else its name. */
export function usageKey(config: { entity?: string; name?: string; tap_action?: { navigation_path?: string } } | undefined): string | undefined {
  if (!config) return undefined;
  if (config.entity) return config.entity;
  const path = config.tap_action?.navigation_path;
  if (path) return `nav:${path}`;
  return config.name ? `name:${config.name}` : undefined;
}

export function recordTap(key: string | undefined, now = Date.now()) {
  if (!key) return;
  const store = load();
  store[key] = [(store[key] ? decayed(store[key], now) : 0) + 1, now];
  const keys = Object.keys(store);
  if (keys.length > MAX_KEYS) {
    keys.sort((a, b) => decayed(store[a], now) - decayed(store[b], now));
    for (const k of keys.slice(0, keys.length - MAX_KEYS)) delete store[k];
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* storage blocked: counts live for this page only */
  }
}

export function usageOf(key: string | undefined, now = Date.now()): number {
  const v = key ? load()[key] : undefined;
  return v ? decayed(v, now) : 0;
}

/** Tests: forget the in-memory copy. */
export function resetUsage() {
  cache = undefined;
}
