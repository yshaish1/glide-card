import { describe, expect, it } from "vitest";
import { render } from "lit";
import { SCENES, isScene, sceneSvg } from "../src/cards/cover-scenes";
import { PRESETS, findBackgroundCards, pickBackground, resolveBackdrop, viewIndexFor } from "../src/core/backdrops";

const bg = (extra: Record<string, unknown> = {}) => ({ type: "custom:glide-card", card_type: "background", ...extra });
const ctx = { dark: true, night: false, still: false, themeBackground: { dark: "D", light: "L" } };

describe("cover scenes", () => {
  it("has the eleven views and renders each by day and night", () => {
    expect(SCENES).toHaveLength(11);
    for (const name of SCENES) {
      for (const night of [false, true]) {
        const host = document.createElement("div");
        render(sceneSvg(name, night), host);
        expect(host.querySelector("svg")?.childElementCount, `${name} ${night}`).toBeGreaterThan(1);
      }
    }
    expect(isScene("pool")).toBe(true);
    expect(isScene("moon")).toBe(false);
  });
});

describe("background resolution", () => {
  it("uses the theme's own background by default", () => {
    expect(resolveBackdrop({}, ctx).background).toBe("D");
    expect(resolveBackdrop({}, { ...ctx, dark: false }).background).toBe("L");
  });
  it("resolves presets, falling back to aurora", () => {
    expect(resolveBackdrop({ background: "preset", preset: "ocean" }, ctx).background).toBe(PRESETS.ocean.dark);
    expect(resolveBackdrop({ background: "preset", preset: "nope" }, ctx).background).toBe(PRESETS.aurora.dark);
  });
  it("makes a gradient from two colours", () => {
    expect(resolveBackdrop({ background: "color", color: "#000", color2: "#fff", angle: 90 }, ctx).background).toBe("linear-gradient(90deg,#000,#fff)");
    expect(resolveBackdrop({ background: "color", color: "red" }, ctx).background).toBe("red");
  });
  it("switches to the night photo and clamps blur and dim", () => {
    const b = resolveBackdrop({ background: "image", image: "/day.jpg", image_night: "/night.jpg", blur: 99, dim: 50 }, { ...ctx, night: true });
    expect(b).toMatchObject({ image: "/night.jpg", blur: 40, dim: 0.5 });
    expect(resolveBackdrop({ background: "image", image: "/day.jpg" }, ctx).image).toBe("/day.jpg");
  });
  it("only drifts when asked and motion is allowed", () => {
    expect(resolveBackdrop({ background: "preset", animate: true }, ctx).animate).toBe(true);
    expect(resolveBackdrop({ background: "preset", animate: true }, { ...ctx, still: true }).animate).toBe(false);
    expect(resolveBackdrop({ background: "preset" }, ctx).animate).toBe(false);
  });
});

describe("finding the background card", () => {
  const views = [
    { path: "home", cards: [{ type: "vertical-stack", cards: [bg({ preset: "sunset" })] }] },
    { path: "kitchen", sections: [{ cards: [{ type: "entities" }] }] },
    { path: "garden", sections: [{ cards: [bg({ preset: "forest", scope: "dashboard" })] }] },
  ];
  it("finds cards in stacks and sections", () => {
    expect(findBackgroundCards(views)).toHaveLength(2);
  });
  it("prefers the view's own card, then a dashboard-wide one", () => {
    expect(pickBackground(views, 0)?.preset).toBe("sunset");
    expect(pickBackground(views, 1)?.preset).toBe("forest");
    expect(pickBackground([{ cards: [] }], 0)).toBeUndefined();
  });
  it("maps the URL to a view by path or index", () => {
    expect(viewIndexFor(views, "/dash/kitchen")).toBe(1);
    expect(viewIndexFor(views, "/dash/2")).toBe(2);
    expect(viewIndexFor(views, "/dash")).toBe(0);
    expect(viewIndexFor(views, "/dash/missing")).toBe(0);
  });
});
