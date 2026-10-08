import * as mdi from "@mdi/js";

// Stand-in for HA's <ha-icon> so the playground renders real MDI icons.
const toKey = (icon: string) =>
  "mdi" + icon.replace(/^mdi:/, "").split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");

class MockHaIcon extends HTMLElement {
  #icon = "";
  set icon(v: string) {
    this.#icon = v;
    const path = (mdi as Record<string, string>)[toKey(v)] ?? mdi.mdiHelpCircleOutline;
    this.innerHTML = `<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor;display:block"><path d="${path}"/></svg>`;
  }
  get icon() {
    return this.#icon;
  }
}
if (!customElements.get("ha-icon")) customElements.define("ha-icon", MockHaIcon);
