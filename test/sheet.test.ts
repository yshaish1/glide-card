import { afterEach, describe, expect, it } from "vitest";
import { openPopup } from "../src/core/actions";
import { registerPopup, unregisterPopup } from "../src/cards/sheet";
import type { PopupCardConfig } from "../src/core/types";

const config = { type: "custom:glide-card", card_type: "popup", hash: "#more", cards: [] } as unknown as PopupCardConfig;
const sheet = () => document.querySelector("glide-sheet") as (HTMLElement & { open: boolean; updateComplete: Promise<boolean> }) | null;

afterEach(() => {
  history.replaceState(null, "", "/");
  document.querySelectorAll("glide-sheet").forEach((el) => el.remove());
});

describe("popup sheet registry", () => {
  it("mounts inside <home-assistant>'s shadow root so HA's context reaches the cards", () => {
    const ha = document.createElement("home-assistant");
    const root = ha.attachShadow({ mode: "open" });
    document.body.append(ha);
    const owner = {};
    registerPopup(config, owner);
    expect(root.querySelector("glide-sheet")).not.toBeNull();
    expect(sheet()).toBeNull(); // not in the light DOM
    unregisterPopup("#more", owner);
    expect(root.querySelector("glide-sheet")).toBeNull();
    ha.remove();
  });

  it("keeps the sheet while another view's popup card still owns it", () => {
    const view1 = {}, view2 = {};
    registerPopup(config, view1);
    registerPopup(config, view2);
    unregisterPopup("#more", view1); // old view's card detached
    expect(sheet()).not.toBeNull();
    openPopup("#more");
    expect(sheet()!.open).toBe(true);
    unregisterPopup("#more", view2);
    expect(sheet()).toBeNull();
  });

  it("opens again when the hash is already in the URL", () => {
    const owner = {};
    history.replaceState(null, "", "#more");
    registerPopup(config, owner);
    sheet()!.open = false;
    openPopup("#more");
    expect(sheet()!.open).toBe(true);
    unregisterPopup("#more", owner);
  });

  it("releases the scroll lock when an open sheet is removed", async () => {
    const owner = {};
    registerPopup(config, owner);
    openPopup("#more");
    await sheet()!.updateComplete;
    expect(document.documentElement.style.overflow).toBe("hidden");
    unregisterPopup("#more", owner);
    expect(document.documentElement.style.overflow).toBe("");
  });
});
