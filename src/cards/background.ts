import { css, html, nothing } from "lit";
import { clearBackdrop, setBackdropPreview, startBackdropWatcher } from "../core/backdrop";
import { PRESETS } from "../core/backdrops";
import { GlideBase } from "../core/base-card";
import type { BackgroundCardConfig } from "../core/types";

startBackdropWatcher();

const KIND = { theme: "Glide theme", preset: "Preset", color: "Colour", image: "Image" } as const;

/**
 * Dashboard background. The painting is done by the backdrop watcher (it reads the dashboard config,
 * so it works on every view); this element only shows a small label while editing and previews
 * unsaved changes live.
 */
export class GlideBackground extends GlideBase<BackgroundCardConfig> {
  protected readonly cardType = "background" as const;
  static properties = { ...GlideBase.properties, preview: { type: Boolean } };
  preview = false;

  protected watched() {
    return ["sun.sun"];
  }

  private get editing() {
    return this.editMode || this.preview;
  }

  getGridOptions() {
    return { columns: 12, rows: 1 };
  }

  getCardSize() {
    return this.editing ? 1 : 0;
  }

  protected updated() {
    this.toggleAttribute("editing", this.editing);
    // Only the editor's preview overrides the saved config; on the dashboard the watcher decides.
    if (this.preview) setBackdropPreview(this.config);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.preview) {
      setBackdropPreview(undefined);
      clearBackdrop();
    }
  }

  protected render() {
    if (!this.editing) return nothing;
    const c = this.config;
    const kind = c.background ?? "theme";
    const what = kind === "preset" ? PRESETS[c.preset ?? "aurora"]?.name ?? c.preset : KIND[kind];
    return html`<div class="surface">
      <ha-icon icon="mdi:image-filter-hdr"></ha-icon>
      <span>Background: ${what}</span>
      <span class="meta">${c.scope === "dashboard" ? "whole dashboard" : "this view"}</span>
    </div>`;
  }

  static styles = css`
    :host { display: none; }
    :host([editing]) { display: block; font-family: var(--gc-font); color: var(--gc-text); }
    .surface {
      display: flex; align-items: center; gap: 10px; padding: 10px 14px;
      border-radius: var(--gc-radius-control, 999px);
      background: var(--gc-surface); border: 1px dashed var(--gc-border);
      font-size: 14px; font-weight: 600;
    }
    .meta { margin-inline-start: auto; font-size: 12px; font-weight: 400; color: var(--gc-text-dim); }
  `;
}

if (!customElements.get("glide-background")) customElements.define("glide-background", GlideBackground);
