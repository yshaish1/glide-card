import { describe, expect, it, vi } from "vitest";
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

/** A fake laid-out bar: rects follow scrollLeft, which the "browser" clamps to the scroll range. */
const fakeBar = (nav: any, opts: { width: number; content: number; activeAt: number }) => {
  const scroller = nav.shadowRoot.querySelector(".scroller");
  const bar = { ...opts, scroll: 0, writes: 0 };
  Object.defineProperty(scroller, "clientWidth", { configurable: true, get: () => bar.width });
  Object.defineProperty(scroller, "scrollWidth", { configurable: true, get: () => bar.content });
  Object.defineProperty(scroller, "scrollLeft", {
    configurable: true,
    get: () => bar.scroll,
    set: (v: number) => {
      bar.scroll = Math.max(0, Math.min(v, bar.content - bar.width));
      bar.writes++;
    },
  });
  scroller.getBoundingClientRect = () => ({ left: 0, right: bar.width, width: bar.width, height: 50 }) as DOMRect;
  nav.shadowRoot.querySelector("button.active").getBoundingClientRect = () =>
    ({ left: bar.activeAt - bar.scroll, right: bar.activeAt + 60 - bar.scroll, width: 60, height: 40 }) as DOMRect;
  return { bar, scroller };
};
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
let observed: (() => void) | undefined;
const stubResize = () =>
  vi.stubGlobal("ResizeObserver", class { constructor(cb: () => void) { observed = cb; } observe() {} disconnect() {} });

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

  it("reveals the active item once the bar is laid out, then leaves the user's scrolling alone", async () => {
    // HA renders a view's nav before laying it out: no width on the first update
    stubResize();
    go("/d/office");
    const nav = await mount(document.body);
    const { bar } = fakeBar(nav, { width: 0, content: 500, activeAt: 300 });
    expect(bar.writes).toBe(0);

    bar.width = 200;
    observed!(); // laid out, no tap to carry on from (page load): straight to centre
    expect(bar.scroll).toBe(230);

    const writes = bar.writes;
    nav.hass = { ...hass }; // a state update
    await nav.updateComplete;
    observed!();
    expect(bar.writes).toBe(writes);
    nav.remove();
    vi.unstubAllGlobals();
  });

  it("glides again when the bar settles narrower and cuts the item off, unless the user scrolled", async () => {
    stubResize();
    go("/d/office");
    const nav = await mount(document.body);
    const { bar, scroller } = fakeBar(nav, { width: 200, content: 500, activeAt: 300 });
    observed!();
    expect(bar.scroll).toBe(230);

    bar.width = 120; // the item now sticks out past the end
    observed!();
    expect(bar.scroll).toBe(230); // animated, not a jump
    expect(scroller.style.scrollSnapType).toBe("none");
    await wait(600);
    expect(bar.scroll).toBe(270); // centred in the narrower bar
    expect(scroller.style.scrollSnapType).toBe("");

    scroller.dispatchEvent(new Event("touchstart")); // the user scrolls it away themselves
    const writes = bar.writes;
    bar.width = 100;
    observed!();
    expect(bar.writes).toBe(writes);
    nav.remove();
    vi.unstubAllGlobals();
  });

  it("a view's nav laid out after the tap glides from the tapped bar's scroll to the item", async () => {
    stubResize();
    go("/d/main");
    const old = await mount(document.body);
    old.shadowRoot.querySelector(".ind").getBoundingClientRect = () => ({ left: 10, width: 60, height: 40 }) as DOMRect;
    old.shadowRoot.querySelectorAll("button")[3].click(); // tap "office": hands off, then navigates
    old.remove();

    const nav = await mount(document.body); // the next view's nav: no width yet
    const { bar } = fakeBar(nav, { width: 0, content: 500, activeAt: 300 });
    bar.width = 200;
    observed!();
    expect(bar.scroll).toBe(0); // starts where the tapped bar was
    await wait(200);
    expect(bar.scroll).toBeGreaterThan(0); // mid-glide
    expect(bar.scroll).toBeLessThan(230);
    await wait(400);
    expect(bar.scroll).toBe(230);
    nav.remove();
    vi.unstubAllGlobals();
  });
});
