import type { HomeAssistant } from "./types";

/** A subset of Home Assistant's card `visibility` conditions, checked in the browser. */
export type Condition =
  | { condition: "state"; entity: string; state?: string | string[]; state_not?: string | string[] }
  | { condition: "numeric_state"; entity: string; above?: number; below?: number }
  | { condition: "and"; conditions: Condition[] }
  | { condition: "or"; conditions: Condition[] };

const list = (v: string | string[]) => (Array.isArray(v) ? v : [v]).map(String);

function check(hass: HomeAssistant, c: Condition): boolean {
  switch (c.condition) {
    case "state": {
      const s = hass.states[c.entity]?.state ?? "unavailable";
      if (c.state !== undefined && !list(c.state).includes(s)) return false;
      if (c.state_not !== undefined && list(c.state_not).includes(s)) return false;
      return true;
    }
    case "numeric_state": {
      const n = Number(hass.states[c.entity]?.state);
      if (Number.isNaN(n)) return false;
      if (c.above !== undefined && !(n > c.above)) return false;
      if (c.below !== undefined && !(n < c.below)) return false;
      return true;
    }
    case "and": return c.conditions.every((x) => check(hass, x));
    case "or": return c.conditions.some((x) => check(hass, x));
    default: return true; // unknown conditions never hide anything
  }
}

/** True when every condition passes (an empty or missing list always passes). */
export const conditionsMet = (hass: HomeAssistant | undefined, conditions?: Condition[]) =>
  !conditions?.length || (!!hass && conditions.every((c) => check(hass, c)));

/** Entity ids a condition list reads, so a card can re-render when they change. */
export function conditionEntities(conditions?: Condition[]): string[] {
  return (conditions ?? []).flatMap((c) =>
    c.condition === "and" || c.condition === "or" ? conditionEntities(c.conditions) : [c.entity]);
}
