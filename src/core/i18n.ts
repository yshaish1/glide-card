import type { HomeAssistant } from "./types";

const en = {
  on: "On", off: "Off", open: "Open", closed: "Closed", unavailable: "Unavailable",
  heating: "Heating to", cooling: "Cooling to", idle: "Idle", target: "Target", current: "Current",
  heat: "Heat", cool: "Cool", heat_cool: "Auto", auto: "Auto", dry: "Dry", fan_only: "Fan",
  nothing_playing: "Nothing playing", popup_placeholder: "Pop-up", close: "Close",
};
type Key = keyof typeof en;

const he: Record<Key, string> = {
  on: "פועל", off: "כבוי", open: "פתוח", closed: "סגור", unavailable: "לא זמין",
  heating: "מחמם ל-", cooling: "מקרר ל-", idle: "במנוחה", target: "יעד", current: "נוכחי",
  heat: "חימום", cool: "קירור", heat_cool: "אוטו", auto: "אוטו", dry: "ייבוש", fan_only: "מאוורר",
  nothing_playing: "לא מתנגן כלום", popup_placeholder: "חלון קופץ", close: "סגירה",
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
