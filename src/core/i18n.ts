import type { HomeAssistant } from "./types";

const en = {
  on: "On", off: "Off", open: "Open", closed: "Closed", unavailable: "Unavailable",
  heating: "Heating to", cooling: "Cooling to", idle: "Idle", target: "Target temp", current: "Current", active: "Active", step: "Step",
  heat: "Heat", cool: "Cool", heat_cool: "Auto", auto: "Auto", dry: "Dry", fan_only: "Fan",
  nothing_playing: "Nothing playing", popup_placeholder: "Pop-up", close: "Close",
  open_cover: "Open", close_cover: "Close", stop_cover: "Stop",
  search: "Search", search_placeholder: "Search lights, rooms, ACs…", search_frequent: "Frequently used",
  search_places: "Places", search_extras: "More entities", search_sensors: "Sensors",
  search_none: "Nothing found for", search_hint: "Type to search the whole dashboard", search_more: "more results, keep typing to narrow down", clear: "Clear",
};
type Key = keyof typeof en;

const he: Record<Key, string> = {
  on: "פועל", off: "כבוי", open: "פתוח", closed: "סגור", unavailable: "לא זמין",
  heating: "מחמם ל־", cooling: "מקרר ל־", idle: "במנוחה", target: "יעד", current: "נוכחי", active: "פעיל", step: "צעד",
  heat: "חימום", cool: "קירור", heat_cool: "אוטו", auto: "אוטו", dry: "ייבוש", fan_only: "מאוורר",
  nothing_playing: "לא מתנגן כלום", popup_placeholder: "חלון קופץ", close: "סגירה",
  open_cover: "פתיחה", close_cover: "סגירה", stop_cover: "עצירה",
  search: "חיפוש", search_placeholder: "חפשו אור, חדר, מזגן…", search_frequent: "בשימוש תדיר",
  search_places: "מקומות", search_extras: "ישויות נוספות", search_sensors: "חיישנים",
  search_none: "לא נמצא כלום עבור", search_hint: "הקלידו כדי לחפש בכל הדשבורד", search_more: "תוצאות נוספות, המשיכו להקליד כדי לצמצם", clear: "ניקוי",
};

const langs: Record<string, Record<Key, string>> = { en, he };

export function t(hass: HomeAssistant | undefined, key: Key): string {
  const lang = (hass?.locale?.language ?? hass?.language ?? "en").split("-")[0];
  return (langs[lang] ?? en)[key] ?? en[key];
}

/** Uses HA's own localized state formatting when available. */
export function formatState(hass: HomeAssistant, entityId: string): string {
  const s = hass.states[entityId];
  if (!s) return t(hass, "unavailable");
  const fmt = (hass as any).formatEntityState as ((s: unknown) => string) | undefined;
  if (fmt) return fmt(s);
  return (t(hass, s.state as Key) ?? s.state) || s.state;
}
