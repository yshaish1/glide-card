import { describe, expect, it } from "vitest";
import { conditionEntities, conditionsMet, type Condition } from "../src/core/conditions";
import type { HomeAssistant } from "../src/core/types";

const hass = (states: Record<string, string>) =>
  ({ states: Object.fromEntries(Object.entries(states).map(([id, state]) => [id, { entity_id: id, state, attributes: {} }])) }) as unknown as HomeAssistant;

const h = hass({ "sensor.phase": "havdalah", "sensor.temp": "21.5" });

describe("conditionsMet", () => {
  it("passes with no conditions", () => {
    expect(conditionsMet(h, undefined)).toBe(true);
    expect(conditionsMet(h, [])).toBe(true);
  });

  it("checks state and state_not, single values and lists", () => {
    expect(conditionsMet(h, [{ condition: "state", entity: "sensor.phase", state: "havdalah" }])).toBe(true);
    expect(conditionsMet(h, [{ condition: "state", entity: "sensor.phase", state: "candle_lighting" }])).toBe(false);
    expect(conditionsMet(h, [{ condition: "state", entity: "sensor.phase", state: ["candle_lighting", "havdalah"] }])).toBe(true);
    expect(conditionsMet(h, [{ condition: "state", entity: "sensor.phase", state_not: "none" }])).toBe(true);
    expect(conditionsMet(h, [{ condition: "state", entity: "sensor.phase", state_not: ["havdalah"] }])).toBe(false);
  });

  it("treats a missing entity as unavailable", () => {
    expect(conditionsMet(h, [{ condition: "state", entity: "sensor.gone", state: "on" }])).toBe(false);
    expect(conditionsMet(h, [{ condition: "state", entity: "sensor.gone", state: "unavailable" }])).toBe(true);
  });

  it("checks numeric_state bounds and non-numbers", () => {
    expect(conditionsMet(h, [{ condition: "numeric_state", entity: "sensor.temp", above: 20, below: 22 }])).toBe(true);
    expect(conditionsMet(h, [{ condition: "numeric_state", entity: "sensor.temp", above: 21.5 }])).toBe(false);
    expect(conditionsMet(h, [{ condition: "numeric_state", entity: "sensor.phase", above: 0 }])).toBe(false);
  });

  it("combines with and / or, and every top-level item must pass", () => {
    const yes: Condition = { condition: "state", entity: "sensor.phase", state: "havdalah" };
    const no: Condition = { condition: "state", entity: "sensor.phase", state: "none" };
    expect(conditionsMet(h, [{ condition: "or", conditions: [no, yes] }])).toBe(true);
    expect(conditionsMet(h, [{ condition: "and", conditions: [no, yes] }])).toBe(false);
    expect(conditionsMet(h, [yes, no])).toBe(false);
  });

  it("hides conditional items until hass arrives", () => {
    expect(conditionsMet(undefined, [{ condition: "state", entity: "sensor.phase", state: "havdalah" }])).toBe(false);
  });
});

describe("conditionEntities", () => {
  it("collects entities through nesting", () => {
    expect(conditionEntities([
      { condition: "state", entity: "a" },
      { condition: "or", conditions: [{ condition: "numeric_state", entity: "b" }, { condition: "and", conditions: [{ condition: "state", entity: "c" }] }] },
    ])).toEqual(["a", "b", "c"]);
  });
});
