import { describe, expect, it } from "vitest";
import { compactValue, formatTime } from "../src/core/format";
import type { HassEntity, HomeAssistant } from "../src/core/types";

const ent = (entity_id: string, state: string, attributes: Record<string, any> = {}): HassEntity => ({
  entity_id, state, attributes, last_changed: "", last_updated: "",
});
const hass = (states: HassEntity[], extra: Record<string, unknown> = {}) =>
  ({ states: Object.fromEntries(states.map((s) => [s.entity_id, s])), language: "en", callService: async () => {}, ...extra }) as unknown as HomeAssistant;

describe("compactValue", () => {
  it("shows weather as condition · temperature", () => {
    const w = ent("weather.home", "clear-night", { temperature: 25.7, temperature_unit: "°C" });
    const h = hass([w], { formatEntityState: () => "לילה בהיר" });
    expect(compactValue(h, w)).toBe("לילה בהיר · 25.7 °C");
  });
  it("shows timestamp sensors as local HH:mm", () => {
    const iso = "2026-10-09T03:40:00Z";
    const s = ent("sensor.sun_next_rising", iso, { device_class: "timestamp" });
    expect(compactValue(hass([s]), s)).toBe(formatTime(iso));
    expect(formatTime(iso)).toMatch(/^\d{2}:\d{2}$/);
  });
  it("uses HA's state formatter for everything else", () => {
    const s = ent("sensor.acs_on", "3");
    expect(compactValue(hass([s], { formatEntityState: () => "3" }), s)).toBe("3");
  });
  it("can show an attribute instead of the state", () => {
    const s = ent("sun.sun", "above_horizon", { next_rising: "2026-10-09T03:40:00Z", elevation: 12 });
    expect(compactValue(hass([s]), s, "next_rising")).toBe(formatTime("2026-10-09T03:40:00Z"));
    expect(compactValue(hass([s]), s, "elevation")).toBe("12");
  });
});
