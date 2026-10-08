import { css, html, type PropertyValues } from "lit";
import { openPopup } from "../core/actions";
import { GlideBase, surface } from "../core/base-card";
import { fire } from "../core/fire";
import { t } from "../core/i18n";
import type { PopupCardConfig } from "../core/types";
import { registerPopup, setSheetsHass, unregisterPopup } from "./sheet";

/**
 * Dashboard placeholder for a pop-up. Invisible in view mode; it registers
 * the sheet, which opens when the URL hash matches `hash`.
 */
export class GlidePopup extends GlideBase<PopupCardConfig> {
  protected readonly cardType = "popup" as const;

  setConfig(config: PopupCardConfig) {
    if (!config.hash) throw new Error("Pop-up needs a `hash`, e.g. #living-room");
    if (!Array.isArray(config.cards)) throw new Error("Pop-up needs a `cards` list");
    super.setConfig(config);
    if (this.isConnected) registerPopup(config);
  }

  protected shouldUpdate(changed: PropertyValues<this>) {
    if (changed.has("hass") && this.hass) setSheetsHass(this.hass);
    return changed.has("editMode") || changed.has("config") || super.shouldUpdate(changed);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.config) registerPopup(this.config);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const hash = this.config?.hash;
    // HA re-parents cards while rebuilding views; only drop the sheet if we stay detached.
    setTimeout(() => !this.isConnected && hash && unregisterPopup(hash), 1000);
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);
    if (changed.has("editMode")) {
      const host = this.parentElement as HTMLElement | null;
      if (host) host.style.display = this.editMode ? "block" : "none";
      fire(this, "card-visibility-changed", { value: this.editMode });
    }
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return this.editMode ? 1 : 0;
  }

  protected render() {
    if (!this.editMode) return html``;
    const c = this.config;
    return html`
      <div class="surface">
        <ha-icon .icon=${c.icon ?? "mdi:card-outline"}></ha-icon>
        <div class="text">
          <div class="name">${c.title ?? t(this.hass, "popup_placeholder")}</div>
          <div class="meta">${c.hash} · ${c.cards.length} cards</div>
        </div>
        <button @click=${(e: Event) => openPopup(c.hash, e.currentTarget as Element)}>Preview</button>
      </div>
    `;
  }

  static styles = [
    surface,
    css`
      .surface {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 16px;
        border-style: dashed;
        min-height: 56px;
      }
      .text { flex: 1; }
      .name { font-weight: 600; }
      button {
        font: inherit;
        padding: 6px 14px;
        border-radius: var(--gc-radius-control);
        border: 0;
        background: var(--gc-accent);
        color: var(--gc-on-accent);
        cursor: pointer;
      }
    `,
  ];
}

customElements.define("glide-popup", GlidePopup);
