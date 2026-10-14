import { afterEach, describe, expect, it, vi } from "vitest";
import "../src/themes";
import "../src/cards/button";
import type { HomeAssistant } from "../src/core/types";

const st = (entity_id: string, state: string, attributes: Record<string, unknown> = {}) => ({ entity_id, state, attributes, last_changed: "", last_updated: "" });
const hassWith = (sun?: string) =>
  ({
    states: {
      "cover.b": st("cover.b", "open", { current_position: 40 }),
      "cover.c": st("cover.c", "open", { current_position: 40, device_class: "curtain" }),
      "light.a": st("light.a", "on", { brightness: 128, supported_color_modes: ["brightness"] }),
      ...(sun ? { "sun.sun": st("sun.sun", sun) } : {}),
    },
    language: "en",
    themes: { darkMode: false },
  }) as unknown as HomeAssistant;

const mount = async (config: Record<string, unknown>, hass = hassWith()) => {
  const el = document.createElement("glide-button") as any;
  el.setConfig({ type: "custom:glide-card", card_type: "button", ...config });
  el.hass = hass;
  document.body.append(el);
  await el.updateComplete;
  return el;
};
const q = (el: any, sel: string) => el.shadowRoot.querySelector(sel) as HTMLElement | null;

afterEach(() => (document.body.innerHTML = ""));

describe("cover window view", () => {
  it("shows a garden behind a blind that covers the closed part", async () => {
    const el = await mount({ entity: "cover.b" });
    const surface = q(el, ".surface")!;
    expect(surface.classList.contains("window")).toBe(true);
    expect(surface.style.getPropertyValue("--fill")).toBe("60%");
    expect(q(el, ".view")!.classList.contains("garden")).toBe(true);
    expect(q(el, ".view svg")).not.toBeNull();
  });

  it("picks the scene, a photo, or the plain fill", async () => {
    expect(q(await mount({ entity: "cover.b", view: "sea" }), ".view")!.classList.contains("sea")).toBe(true);
    const photo = await mount({ entity: "cover.b", view_image: "/local/yard.jpg" });
    expect(q(photo, ".view img")!.getAttribute("src")).toBe("/local/yard.jpg");
    const plain = await mount({ entity: "cover.b", view: "color" });
    expect(q(plain, ".view")).toBeNull();
    expect(q(plain, ".surface")!.style.getPropertyValue("--fill")).toBe("40%");
  });

  it("follows sun.sun for day and night, day when it's missing", async () => {
    expect(q(await mount({ entity: "cover.b" }), ".view")!.classList.contains("day")).toBe(true);
    const night = await mount({ entity: "cover.b" }, hassWith("below_horizon"));
    expect(q(night, ".view")!.classList.contains("night")).toBe(true);
    expect(q(night, ".view .moon")).not.toBeNull();
    // A sunset re-renders even though the cover itself didn't change.
    const day = await mount({ entity: "cover.b" }, hassWith("above_horizon"));
    const h = hassWith("below_horizon");
    h.states["cover.b"] = day.hass.states["cover.b"];
    day.hass = h;
    await day.updateComplete;
    expect(q(day, ".view")!.classList.contains("night")).toBe(true);
  });

  it("leaves other tiles and slider-less covers alone", async () => {
    const light = await mount({ entity: "light.a" });
    expect(q(light, ".view")).toBeNull();
    expect(q(light, ".surface")!.classList.contains("window")).toBe(false);
    expect(q(await mount({ entity: "cover.b", slider: false }), ".view")).toBeNull();
  });

  it("draws curtains for the curtain device class, parting from the centre", async () => {
    const el = await mount({ entity: "cover.c" });
    const surface = q(el, ".surface")!;
    expect(surface.classList.contains("curtain")).toBe(true);
    expect(surface.style.getPropertyValue("--closed")).toBe("0.6");
    expect(el.shadowRoot.querySelectorAll(".drape").length).toBe(2);
    expect(q(el, ".fill")).toBeNull();
    expect(q(el, ".view")).not.toBeNull();
  });

  it("cover_style overrides the device class either way", async () => {
    const blind = await mount({ entity: "cover.c", cover_style: "blind" });
    expect(q(blind, ".drape")).toBeNull();
    expect(q(blind, ".surface")!.style.getPropertyValue("--fill")).toBe("60%");
    const forced = await mount({ entity: "cover.b", cover_style: "curtain" });
    expect(q(forced, ".surface")!.classList.contains("curtain")).toBe(true);
  });

  it("drags the way the cover opens", async () => {
    const axis = async (cfg: Record<string, unknown>) => (await mount(cfg)).dragAxis;
    expect(await axis({ entity: "cover.c" })).toBe("x");
    expect(await axis({ entity: "cover.b" })).toBe("y");
    expect(await axis({ entity: "cover.b", cover_style: "roman" })).toBe("y");
    expect(await axis({ entity: "cover.b", cover_style: "bottom_up" })).toBe("-y");
    // One-sided: opening moves the edge towards the side it stacks at
    expect(await axis({ entity: "cover.b", cover_style: "curtain_side" })).toBe("-x");
    expect(await axis({ entity: "cover.b", cover_style: "vertical", cover_side: "end" })).toBe("x");
  });

  it("color tints the fabric", async () => {
    const el = await mount({ entity: "cover.c", color: "#b38b6d" });
    expect(q(el, ".surface")!.style.getPropertyValue("--gc-fabric")).toBe("#b38b6d");
    expect(q(await mount({ entity: "cover.c" }), ".surface")!.style.getPropertyValue("--gc-fabric")).toBe("");
  });
});

describe("cover motion", () => {
  const report = async (el: any, id: string, state: string, pos: number, extra: Record<string, unknown> = {}) => {
    const h = hassWith();
    h.states[id] = st(id, state, { current_position: pos, ...extra }) as any;
    el.hass = h;
    await el.updateComplete;
  };
  const motion = (el: any) => {
    const s = q(el, ".surface")!;
    return { moving: s.classList.contains("moving"), ms: s.style.getPropertyValue("--gc-move") };
  };

  it("glides each step for as long as the reports are apart, capped either way", async () => {
    let now = 0;
    const spy = vi.spyOn(performance, "now").mockImplementation(() => now);
    const el = await mount({ entity: "cover.b" });
    expect(motion(el)).toEqual({ moving: false, ms: "" });

    now = 60_000; // the first report after it starts moving: a guess, not the minute since the last one
    await report(el, "cover.b", "closing", 30);
    expect(motion(el)).toEqual({ moving: true, ms: "1000ms" });
    now += 1200;
    await report(el, "cover.b", "closing", 20);
    expect(motion(el).ms).toBe("1200ms");
    now += 50;
    await report(el, "cover.b", "closing", 18);
    expect(motion(el).ms).toBe("250ms");
    now += 9000;
    await report(el, "cover.b", "closing", 10);
    expect(motion(el).ms).toBe("4000ms");

    now += 1000;
    await report(el, "cover.b", "closed", 0); // stopped: back to the normal ease
    expect(motion(el)).toEqual({ moving: false, ms: "" });
    spy.mockRestore();
  });

  it("curtains glide too, and a drag stays instant", async () => {
    const el = await mount({ entity: "cover.c" });
    await report(el, "cover.c", "opening", 50, { device_class: "curtain" });
    expect(motion(el).moving).toBe(true);
    el.dragValue = 70;
    await el.updateComplete;
    expect(motion(el).moving).toBe(false);
  });
});

describe("cover styles", () => {
  const cls = (el: any) => q(el, ".surface")!.classList;
  const hassDc = (dc: string, attrs: Record<string, unknown> = {}) => {
    const h = hassWith();
    h.states["cover.x"] = st("cover.x", "open", { current_position: 40, device_class: dc, ...attrs }) as any;
    return h;
  };

  it("follows the device class unless cover_style says otherwise", async () => {
    expect(cls(await mount({ entity: "cover.c" })).contains("style-curtain")).toBe(true);
    expect(cls(await mount({ entity: "cover.x" }, hassDc("shutter"))).contains("style-shutter")).toBe(true);
    expect(cls(await mount({ entity: "cover.x" }, hassDc("shade"))).contains("style-blind")).toBe(true);
    expect(cls(await mount({ entity: "cover.c", cover_style: "venetian" })).contains("style-venetian")).toBe(true);
    expect(cls(await mount({ entity: "cover.b", cover_style: "nope" })).contains("style-blind")).toBe(true);
  });

  it("draws the right panel for each style", async () => {
    const parts = async (cover_style: string, extra = {}) => {
      const el = await mount({ entity: "cover.b", cover_style, ...extra });
      return { drapes: el.shadowRoot.querySelectorAll(".drape").length, fill: !!q(el, ".fill"), box: !!q(el, ".box"), rod: !!q(el, ".rod") };
    };
    expect(await parts("curtain")).toEqual({ drapes: 2, fill: false, box: false, rod: true });
    expect(await parts("curtain_side")).toEqual({ drapes: 1, fill: false, box: false, rod: true });
    expect(await parts("vertical")).toEqual({ drapes: 1, fill: false, box: false, rod: true });
    expect(await parts("shutter")).toEqual({ drapes: 0, fill: true, box: true, rod: false });
    for (const style of ["blind", "bottom_up", "roman", "venetian"]) {
      expect(await parts(style)).toEqual({ drapes: 0, fill: true, box: false, rod: false });
    }
    // Top-down and bottom-up panels cover the closed part; drapes size from --closed
    expect(q(await mount({ entity: "cover.b", cover_style: "bottom_up" }), ".surface")!.style.getPropertyValue("--fill")).toBe("60%");
  });

  it("a one-sided cover stacks at the chosen side", async () => {
    const el = await mount({ entity: "cover.b", cover_style: "curtain_side", cover_side: "end" });
    expect(q(el, ".drape")!.classList.contains("end")).toBe(true);
    expect(cls(el).contains("side-end")).toBe(true);
    expect(q(await mount({ entity: "cover.b", cover_style: "curtain_side" }), ".drape")!.classList.contains("start")).toBe(true);
  });

  it("venetian slats follow the tilt: thin when open, solid when shut, half without a tilt", async () => {
    const slat = async (tilt?: number) =>
      q(await mount({ entity: "cover.x", cover_style: "venetian" }, hassDc("blind", tilt === undefined ? {} : { current_tilt_position: tilt })), ".surface")!
        .style.getPropertyValue("--slat");
    expect(await slat(50)).toBe("2.5px");
    expect(await slat(0)).toBe("8px");
    expect(await slat(100)).toBe("8px");
    expect(await slat()).toBe("5.3px");
  });

  it("fabric styles take the colour, others don't", async () => {
    const fabric = async (cover_style: string) =>
      q(await mount({ entity: "cover.b", cover_style, color: "#b38b6d" }), ".surface")!.style.getPropertyValue("--gc-fabric");
    expect(await fabric("roman")).toBe("#b38b6d");
    expect(await fabric("curtain_side")).toBe("#b38b6d");
    expect(await fabric("shutter")).toBe("");
  });

  it("cover buttons point the way the cover moves", async () => {
    const icons = async (cover_style: string, extra = {}) => {
      const el = await mount({ entity: "cover.b", cover_style, cover_buttons: true, ...extra });
      return [...el.shadowRoot.querySelectorAll(".round ha-icon")].map((i: any) => i.icon);
    };
    expect(await icons("blind")).toEqual(["mdi:arrow-up", "mdi:stop", "mdi:arrow-down"]);
    expect(await icons("bottom_up")).toEqual(["mdi:arrow-down", "mdi:stop", "mdi:arrow-up"]);
    expect(await icons("curtain_side")).toEqual(["mdi:arrow-left", "mdi:stop", "mdi:arrow-right"]);
    expect(await icons("vertical", { cover_side: "end" })).toEqual(["mdi:arrow-right", "mdi:stop", "mdi:arrow-left"]);
  });
});
