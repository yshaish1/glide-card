import { css, html, nothing, type PropertyValues } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { GlideBase, surface } from "../core/base-card";
import { entityName, isUnavailable } from "../core/entity";
import { haptic } from "../core/fire";
import { t } from "../core/i18n";
import type { MediaCardConfig } from "../core/types";

const F = { PAUSE: 1, VOLUME_SET: 4, PREV: 16, NEXT: 32, PLAY: 16384 };
const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;

export class GlideMedia extends GlideBase<MediaCardConfig> {
  static properties = { ...GlideBase.properties, volDrag: { state: true } };
  protected readonly cardType = "media" as const;
  volDrag?: number;
  private tick = 0;

  setConfig(config: MediaCardConfig) {
    if (!config.entity?.startsWith("media_player.")) throw new Error("Media card needs a media_player.* entity");
    super.setConfig(config);
  }

  getGridOptions() {
    return { columns: 12, rows: 4, min_columns: 6 };
  }

  getCardSize() {
    return 4;
  }

  private get s() {
    return this.stateOf(this.config.entity);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this.tick);
    this.tick = 0;
  }

  protected updated(changed: PropertyValues<this>) {
    super.updated(changed);
    // Only tick the progress bar while something is actually playing.
    const playing = this.s?.state === "playing";
    if (playing && !this.tick) this.tick = window.setInterval(() => this.requestUpdate(), 1000);
    if (!playing && this.tick) (clearInterval(this.tick), (this.tick = 0));
  }

  private call(service: string, data: Record<string, unknown> = {}) {
    haptic("light");
    this.hass?.callService("media_player", service, { entity_id: this.config.entity, ...data });
  }

  private position() {
    const a = this.s!.attributes;
    if (a.media_position === undefined) return undefined;
    let pos = a.media_position;
    if (this.s!.state === "playing" && a.media_position_updated_at) pos += (Date.now() - Date.parse(a.media_position_updated_at)) / 1000;
    return Math.min(pos, a.media_duration ?? pos);
  }

  /** Absolute-position slider: tap or drag anywhere on the track. RTL aware. */
  private onVolume(e: PointerEvent) {
    const track = e.currentTarget as HTMLElement;
    track.setPointerCapture(e.pointerId);
    const valueAt = (ev: PointerEvent) => {
      const r = track.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width;
      return Math.round(Math.min(1, Math.max(0, getComputedStyle(track).direction === "rtl" ? 1 - x : x)) * 100);
    };
    this.volDrag = valueAt(e);
    const move = (ev: PointerEvent) => (this.volDrag = valueAt(ev));
    const up = () => {
      track.removeEventListener("pointermove", move);
      track.removeEventListener("pointerup", up);
      track.removeEventListener("pointercancel", up);
      if (this.volDrag !== undefined) this.call("volume_set", { volume_level: this.volDrag / 100 });
      setTimeout(() => (this.volDrag = undefined), 600);
    };
    track.addEventListener("pointermove", move);
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);
  }

  protected render() {
    const s = this.s;
    if (!s) return html`<div class="surface empty">${this.config.entity}</div>`;
    const a = s.attributes;
    const idle = isUnavailable(s) || s.state === "off" || s.state === "idle" || s.state === "standby" || !a.media_title;
    const feat = a.supported_features ?? 0;
    const pos = this.position();
    const dur = a.media_duration;
    const vol = this.volDrag ?? Math.round((a.volume_level ?? 0) * 100);
    const playing = s.state === "playing";
    const art = a.entity_picture as string | undefined;
    return html`
      <div class="surface ${playing ? "playing" : ""}">
        ${art ? html`<div class="art-bg" style=${styleMap({ backgroundImage: `url("${art}")` })}></div>` : nothing}
        <div class="top">
          <div class="art">${art ? html`<img src=${art} alt="" loading="lazy" />` : html`<ha-icon icon="mdi:music" .icon=${"mdi:music"}></ha-icon>`}</div>
          <div class="info">
            <div class="meta source">${[a.app_name ?? a.source, entityName(s, this.config.name)].filter(Boolean).join(" • ")}</div>
            <div class="title">${idle ? t(this.hass, "nothing_playing") : a.media_title}</div>
            ${!idle && a.media_artist ? html`<div class="artist">${a.media_artist}</div>` : nothing}
          </div>
        </div>

        ${!idle && pos !== undefined && dur
          ? html`
              <div class="progress"><div style="width:${(pos / dur) * 100}%"></div></div>
              <div class="times meta"><span>${fmt(pos)}</span><span>${fmt(dur)}</span></div>
            `
          : nothing}

        <div class="controls">
          ${feat & F.PREV ? html`<button aria-label="previous" @click=${() => this.call("media_previous_track")}><ha-icon icon="mdi:skip-previous" .icon=${"mdi:skip-previous"}></ha-icon></button>` : nothing}
          <button class="play" aria-label=${playing ? "pause" : "play"} @click=${() => this.call("media_play_pause")}>
            <ha-icon .icon=${playing ? "mdi:pause" : "mdi:play"}></ha-icon>
          </button>
          ${feat & F.NEXT ? html`<button aria-label="next" @click=${() => this.call("media_next_track")}><ha-icon icon="mdi:skip-next" .icon=${"mdi:skip-next"}></ha-icon></button>` : nothing}
        </div>

        ${feat & F.VOLUME_SET
          ? html`
              <div class="volume">
                <ha-icon icon="mdi:volume-low" .icon=${"mdi:volume-low"}></ha-icon>
                <div class="track" role="slider" aria-label="volume" aria-valuenow=${vol} aria-valuemin="0" aria-valuemax="100"
                  @pointerdown=${(e: PointerEvent) => this.onVolume(e)}>
                  <div class="bar" style="width:${vol}%"></div>
                </div>
                <ha-icon icon="mdi:volume-high" .icon=${"mdi:volume-high"}></ha-icon>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  static styles = [
    surface,
    css`
      :host { height: 100%; }
      .surface { height: 100%; padding: 18px; display: flex; flex-direction: column; justify-content: center; gap: 10px; }
      .art-bg {
        position: absolute; inset: -40px; background-size: cover; background-position: center;
        filter: blur(40px) saturate(1.4); opacity: 0.28; pointer-events: none;
      }
      :host([lite]) .art-bg { display: none; }
      .top, .progress, .times, .controls, .volume { position: relative; }
      .top { display: flex; gap: 14px; align-items: center; }
      .art {
        width: 64px; height: 64px; flex: none; border-radius: calc(var(--gc-radius) * 0.55); overflow: hidden;
        display: grid; place-items: center; background: var(--gc-surface); border: 1px solid var(--gc-border);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
      }
      .art img { width: 100%; height: 100%; object-fit: cover; }
      .info { min-width: 0; flex: 1; }
      .source { color: var(--gc-accent-text); font-size: 11px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .title { font-size: 18px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .artist { color: var(--gc-text-dim); font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .progress { height: 4px; border-radius: 2px; background: color-mix(in srgb, var(--gc-text) 14%, transparent); overflow: hidden; }
      .progress div { height: 100%; background: var(--gc-accent); border-radius: 2px; transition: width 1s linear; }
      .times { display: flex; justify-content: space-between; font-size: 11px; margin-top: -4px; }
      .controls { display: flex; justify-content: center; align-items: center; gap: 28px; }
      button {
        all: unset; cursor: pointer; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%;
        color: var(--gc-text); transition: transform 0.15s;
      }
      button:active { transform: scale(0.9); }
      button:focus-visible { outline: 2px solid var(--gc-accent); }
      .play { width: 60px; height: 60px; background: var(--gc-surface-on); border: 1px solid var(--gc-border); --mdc-icon-size: 28px; }
      .playing .play { background: var(--gc-accent); color: var(--gc-on-accent); border-color: transparent; }
      .volume { display: flex; align-items: center; gap: 10px; color: var(--gc-text-dim); --mdc-icon-size: 18px; }
      .track {
        flex: 1; height: 8px; border-radius: 4px; cursor: pointer; touch-action: none;
        background: color-mix(in srgb, var(--gc-text) 14%, transparent); position: relative;
      }
      .track::before { content: ""; position: absolute; inset: -12px 0; } /* bigger hit area */
      .bar { height: 100%; border-radius: 4px; background: var(--gc-text); }
      .empty { color: var(--gc-text-dim); }
    `,
  ];
}

customElements.define("glide-media", GlideMedia);
