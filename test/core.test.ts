import { describe, expect, it, vi } from "vitest";
import { runAction } from "../src/core/actions";
import { cssColor, sliderFor, toggleEntity, entityIcon } from "../src/core/entity";
import { springEasing } from "../src/core/spring";
import { getTheme, listThemes, registerTheme, themeCss } from "../src/themes";
import type { HassEntity, HomeAssistant } from "../src/core/types";

const ent = (entity_id: string, state: string, attributes: Record<string, any> = {}): HassEntity => ({
  entity_id, state, attributes, last_changed: "", last_updated: "",
});
const mockHass = () => ({ callService: vi.fn(async () => {}) }) as unknown as HomeAssistant & { callService: ReturnType<typeof vi.fn> };

describe("sliderFor", () => {
  it("maps light brightness to percent and turns off at 0", async () => {
    const s = sliderFor(ent("light.a", "on", { brightness: 128, supported_color_modes: ["brightness"] }))!;
    expect(s.value).toBe(50);
    const h = mockHass();
    await s.set(h, 0);
    expect(h.callService).toHaveBeenCalledWith("light", "turn_off", { entity_id: "light.a" });
    await s.set(h, 70);
    expect(h.callService).toHaveBeenLastCalledWith("light", "turn_on", { entity_id: "light.a", brightness_pct: 70 });
  });
  it("has no slider for on/off-only lights or switches", () => {
    expect(sliderFor(ent("light.b", "on", { supported_color_modes: ["onoff"] }))).toBeUndefined();
    expect(sliderFor(ent("switch.x", "on"))).toBeUndefined();
  });
  it("uses cover position", () => {
    expect(sliderFor(ent("cover.c", "open", { current_position: 40 }))!.value).toBe(40);
  });
});

describe("toggleEntity", () => {
  it("locks and unlocks", () => {
    const h = mockHass();
    toggleEntity(h, ent("lock.door", "locked"));
    expect(h.callService).toHaveBeenCalledWith("lock", "unlock", { entity_id: "lock.door" });
  });
  it("activates scenes instead of toggling", () => {
    const h = mockHass();
    toggleEntity(h, ent("scene.movie", "scening"));
    expect(h.callService).toHaveBeenCalledWith("scene", "turn_on", { entity_id: "scene.movie" });
  });
});

it("picks on/off default icons per domain", () => {
  expect(entityIcon(ent("light.a", "on"))).toBe("mdi:lightbulb");
  expect(entityIcon(ent("light.a", "off"))).toBe("mdi:lightbulb-outline");
  expect(entityIcon(ent("light.a", "on"), "mdi:x")).toBe("mdi:x");
});

describe("springEasing", () => {
  it("starts at 0, ends at 1, and overshoots when underdamped", () => {
    const { easing, duration } = springEasing(300, 12);
    const pts = easing.slice(7, -1).split(",").map(Number);
    expect(pts[0]).toBe(0);
    expect(pts.at(-1)).toBe(1);
    expect(Math.max(...pts)).toBeGreaterThan(1);
    expect(duration).toBeGreaterThan(0);
  });
});

describe("theme registry", () => {
  it("ships the three built-in themes and falls back to glass", () => {
    expect(listThemes().map((t) => t.id)).toEqual(expect.arrayContaining(["glass", "bubble", "material"]));
    expect(getTheme("nope").id).toBe("glass");
  });
  it("merges base, theme base and mode tokens plus per-card styles", () => {
    registerTheme({
      id: "test", name: "Test", version: "1", preview: { background: "#000", surface: "#111", accent: "#f00" },
      tokens: { base: { "--gc-radius": "4px" }, dark: { "--gc-accent": "#f00" }, light: { "--gc-accent": "#0f0" } },
      styles: { button: ".x{}" },
    });
    const css = themeCss(getTheme("test"), true, "button");
    expect(css).toContain("--gc-radius:4px");
    expect(css).toContain("--gc-accent:#f00");
    expect(css).toContain("--gc-gap:12px"); // from shared base
    expect(css).toContain(".x{}");
    expect(themeCss(getTheme("test"), false, "media")).not.toContain(".x{}");
  });
});

describe("cssColor", () => {
  it("maps HA colour names to frontend variables and passes CSS colours through", () => {
    expect(cssColor("light-blue")).toBe("var(--light-blue-color)");
    expect(cssColor("#ff0000")).toBe("#ff0000");
    expect(cssColor("dimgray")).toBe("dimgray");
    expect(cssColor(undefined)).toBeUndefined();
  });
});

describe("runAction", () => {
  it("hands service calls to HA's action handler so target and confirmation work", () => {
    const host = document.createElement("div");
    const seen: any[] = [];
    host.addEventListener("hass-action", (e) => seen.push((e as CustomEvent).detail));
    const action = { action: "call-service", service: "light.turn_off", target: { entity_id: ["light.a"] }, confirmation: { text: "?" } } as const;
    runAction(host, mockHass(), action, undefined);
    expect(seen).toEqual([{ config: { entity: undefined, tap_action: action }, action: "tap" }]);
  });
});

describe("seedOf", () => {
  it("is stable per card and spreads tints across cards", async () => {
    const { seedOf } = await import("../src/core/base-card");
    expect(seedOf({ entity: "light.a" })).toEqual(seedOf({ entity: "light.a", name: "x" }));
    const ids = ["light.stairs", "light.upper_stairs", "light.hall_up", "fan.ceiling", "cover.blinds"];
    expect(new Set(ids.map((entity) => seedOf({ entity }).tint)).size).toBeGreaterThanOrEqual(3);
    for (const entity of ids) expect(seedOf({ entity }).tint).toBeGreaterThanOrEqual(1);
  });
});
