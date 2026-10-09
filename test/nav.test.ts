import { describe, expect, it } from "vitest";
import "../src/themes";
import "../src/cards/nav";
import type { HomeAssistant } from "../src/core/types";

const hass = { states: {}, language: "he", themes: { darkMode: true } } as unknown as HomeAssistant;
const items = ["main", "living", "kitchen", "office"].map((n) => ({ name: n, icon: "mdi:home", navigation_path: `/d/${n}` }));

const mount = async (parent: HTMLElement) => {
  const nav = document.createElement("glide-nav") as any;
  nav.setConfig({ card_type: "nav", items });
  nav.hass = hass;
  parent.append(nav);
  await nav.updateComplete;
  return nav;
};
const activeOf = (nav: any) => {
  const btn = nav.shadowRoot.querySelector("button.active");
  return { name: btn?.textContent.trim(), inds: nav.shadowRoot.querySelectorAll(".ind").length, own: !!btn?.querySelector(".ind") };
};
const go = (path: string) => {
  history.pushState(null, "", path);
  window.dispatchEvent(new CustomEvent("location-changed"));
};

describe("nav", () => {
  it("one indicator, inside the active button", async () => {
    go("/d/kitchen");
    const nav = await mount(document.body);
    expect(activeOf(nav)).toEqual({ name: "kitchen", inds: 1, own: true });
    go("/d/office");
    await nav.updateComplete;
    expect(activeOf(nav)).toEqual({ name: "office", inds: 1, own: true });
    nav.remove();
  });

  it("a re-attached cached view shows the current route, not the one it was left on", async () => {
    // HA: one nav per view, views cached and swapped in and out
    go("/d/main");
    const viewA = document.createElement("div");
    const viewB = document.createElement("div");
    document.body.append(viewA);
    const navA = await mount(viewA);
    go("/d/living"); // tap in view A: it updates to "living", then HA swaps it out
    await navA.updateComplete;
    viewA.replaceWith(viewB);
    const navB = await mount(viewB);
    go("/d/main"); // back to view A while it's detached
    viewB.replaceWith(viewA);
    await navA.updateComplete;
    expect(activeOf(navA)).toEqual({ name: "main", inds: 1, own: true });
    viewA.remove();
    navB.remove();
  });
});
