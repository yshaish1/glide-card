import { afterEach, describe, expect, it } from "vitest";
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

  it("curtains drag sideways, blinds drag up and down", async () => {
    const curtain = await mount({ entity: "cover.c" });
    const blind = await mount({ entity: "cover.b" });
    expect(curtain.isCover && !curtain.isCurtain ? "y" : "x").toBe("x");
    expect(blind.isCover && !blind.isCurtain ? "y" : "x").toBe("y");
  });

  it("color tints the fabric", async () => {
    const el = await mount({ entity: "cover.c", color: "#b38b6d" });
    expect(q(el, ".surface")!.style.getPropertyValue("--gc-fabric")).toBe("#b38b6d");
    expect(q(await mount({ entity: "cover.c" }), ".surface")!.style.getPropertyValue("--gc-fabric")).toBe("");
  });
});
