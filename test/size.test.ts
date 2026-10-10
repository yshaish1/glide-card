import { afterEach, describe, expect, it } from "vitest";
import "../src/themes";
import "../src/cards/button";
import "../src/cards/media";
import "../src/cards/climate";
import { resolveSize } from "../src/core/base-card";
import type { HomeAssistant } from "../src/core/types";

const hass = {
  states: {
    "light.a": { entity_id: "light.a", state: "on", attributes: {}, last_changed: "", last_updated: "" },
    "media_player.m": { entity_id: "media_player.m", state: "idle", attributes: {}, last_changed: "", last_updated: "" },
    "climate.c": { entity_id: "climate.c", state: "heat", attributes: {}, last_changed: "", last_updated: "" },
  },
  language: "he",
  themes: { darkMode: true },
} as unknown as HomeAssistant;

const mount = async (tag: string, config: Record<string, unknown>) => {
  const el = document.createElement(tag) as any;
  el.setConfig({ type: "custom:glide-card", ...config });
  el.hass = hass;
  document.body.append(el);
  await el.updateComplete;
  return el;
};

afterEach(() => {
  document.body.innerHTML = "";
  document.documentElement.style.removeProperty("--glide-size");
});

describe("card size", () => {
  it("card config > theme variable > full", () => {
    const host = document.createElement("div");
    document.body.append(host);
    expect(resolveSize(undefined, host)).toBe("full");
    document.documentElement.style.setProperty("--glide-size", "compact");
    expect(resolveSize(undefined, host)).toBe("compact"); // dashboard-wide, from the page root
    host.style.setProperty("--glide-size", "slim");
    expect(resolveSize(undefined, host)).toBe("slim"); // closer wins
    expect(resolveSize("full", host)).toBe("full"); // the card's own setting wins
    expect(resolveSize("huge", host)).toBe("slim"); // unknown values are ignored
  });

  it("reflects the size on the card so its styles can follow", async () => {
    const card = await mount("glide-button", { card_type: "button", entity: "light.a", size: "slim" });
    expect(card.getAttribute("size")).toBe("slim");
    document.documentElement.style.setProperty("--glide-size", "compact");
    const other = await mount("glide-button", { card_type: "button", entity: "light.a" });
    expect(other.getAttribute("size")).toBe("compact");
  });

  it("slim tiles take one grid row; pills stay one row at every size", async () => {
    for (const [size, rows] of [["full", 2], ["compact", 2], ["slim", 1]] as const) {
      const tile = await mount("glide-button", { card_type: "button", entity: "light.a", size });
      expect(tile.getGridOptions()).toMatchObject({ rows, min_rows: rows });
      expect(tile.getCardSize()).toBe(rows);
      const pill = await mount("glide-button", { card_type: "button", entity: "light.a", layout: "pill", size });
      expect(pill.getGridOptions().rows).toBe(1);
    }
  });

  it("media and climate shrink by whole rows", async () => {
    const rows = (tag: string, card_type: string, entity: string, size: string) =>
      mount(tag, { card_type, entity, size }).then((c) => c.getGridOptions().rows);
    expect(await rows("glide-media", "media", "media_player.m", "full")).toBe(4);
    expect(await rows("glide-media", "media", "media_player.m", "compact")).toBe(3);
    expect(await rows("glide-media", "media", "media_player.m", "slim")).toBe(2);
    expect(await rows("glide-climate", "climate", "climate.c", "full")).toBe(8);
    expect(await rows("glide-climate", "climate", "climate.c", "compact")).toBe(7);
    expect(await rows("glide-climate", "climate", "climate.c", "slim")).toBe(5);
  });
});
