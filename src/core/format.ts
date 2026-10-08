import { domainOf } from "./entity";
import { formatState } from "./i18n";
import type { HassEntity, HomeAssistant } from "./types";

const lang = (hass: HomeAssistant) => hass.locale?.language ?? hass.language ?? "en";

const isTimestamp = (s: HassEntity) =>
  s.attributes.device_class === "timestamp" || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s.state);

/** Local HH:mm for an ISO date string. */
export const formatTime = (iso: string, language = "en") =>
  new Intl.DateTimeFormat(language, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(iso));

/**
 * Compact value for chips: weather = "condition · 25.7 °C", timestamps = "06:40",
 * attributes via HA's formatter, everything else via HA's localized state.
 */
export function compactValue(hass: HomeAssistant, s: HassEntity, attribute?: string): string {
  const h = hass as HomeAssistant & { formatEntityAttributeValue?: (s: HassEntity, a: string) => string };
  if (attribute) {
    const v = s.attributes[attribute];
    if (v === undefined) return "";
    if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T/.test(v)) return formatTime(v, lang(hass));
    return h.formatEntityAttributeValue?.(s, attribute) ?? String(v);
  }
  if (domainOf(s.entity_id) === "weather") {
    const temp = s.attributes.temperature;
    const cond = formatState(hass, s.entity_id);
    return temp === undefined ? cond : `${cond} · ${temp} ${s.attributes.temperature_unit ?? "°C"}`;
  }
  if (isTimestamp(s) && !Number.isNaN(Date.parse(s.state))) return formatTime(s.state, lang(hass));
  return formatState(hass, s.entity_id);
}
