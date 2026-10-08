import "./themes";
import "./cards/button";
import "./cards/popup";
import "./cards/nav";
import "./cards/climate";
import "./cards/media";
import "./editor/editor";
import type { GlideBase } from "./core/base-card";
import type { GlideCardConfig, HomeAssistant } from "./core/types";

const VERSION = "0.1.5";
const TYPES = ["button", "popup", "nav", "climate", "media"] as const;

/**
 * `custom:glide-card` - a thin host that creates the inner card for
 * `card_type` and forwards hass, edit mode and sizing to it.
 */
class GlideCard extends HTMLElement {
  private inner?: GlideBase;
  private _hass?: HomeAssistant;
  private _editMode = false;

  setConfig(config: GlideCardConfig) {
    const type = config?.card_type ?? "button";
    if (!TYPES.includes(type)) throw new Error(`Unknown card_type "${type}". Use one of: ${TYPES.join(", ")}`);
    const tag = `glide-${type}`;
    if (!customElements.get(tag)) throw new Error(`card_type "${type}" is not available in this build`);
    if (this.inner?.localName !== tag) {
      this.inner?.remove();
      this.inner = document.createElement(tag) as unknown as GlideBase;
      this.appendChild(this.inner);
    }
    this.inner.setConfig({ ...config, card_type: type } as never);
    if (this._hass) this.inner.hass = this._hass;
    this.inner.editMode = this._editMode;
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this.inner) this.inner.hass = hass;
  }

  set editMode(v: boolean) {
    this._editMode = v;
    if (this.inner) this.inner.editMode = v;
  }

  connectedCallback() {
    this.style.display = "block";
    this.style.height = "100%";
  }

  getCardSize() {
    return (this.inner as any)?.getCardSize?.() ?? 1;
  }

  getGridOptions() {
    return (this.inner as any)?.getGridOptions?.() ?? { columns: 6, rows: 2 };
  }

  static getStubConfig() {
    return { card_type: "button", entity: "" };
  }

  static getConfigElement() {
    return document.createElement("glide-card-editor");
  }
}

if (!customElements.get("glide-card")) {
  customElements.define("glide-card", GlideCard);
  (window as any).customCards = (window as any).customCards ?? [];
  (window as any).customCards.push({
    type: "glide-card",
    name: "Glide Card",
    description: "Themeable buttons, pop-up sheets, nav bar, climate and media cards",
    preview: true,
    documentationURL: "https://github.com/yshaish1/glide-card",
  });
  console.info(`%c GLIDE-CARD %c ${VERSION} `, "background:#ff9f43;color:#1c1206;border-radius:4px 0 0 4px", "background:#222;color:#fff;border-radius:0 4px 4px 0");
}
