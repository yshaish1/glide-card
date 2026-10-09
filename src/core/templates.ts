import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { HomeAssistant } from "./types";

/** Jinja markers; anything without them is plain text and never reaches the server. */
export const isTemplate = (v: unknown): v is string => typeof v === "string" && /\{\{|\{%/.test(v);

type Unsub = () => unknown;
interface Sub { key: string; unsub: Promise<Unsub | undefined>; }

export interface TemplateContext {
  hass?: HomeAssistant;
  config: Record<string, unknown>;
  entity?: string;
}

/**
 * Renders a card's template fields on the HA server (`render_template`), the way Mushroom does.
 * The server re-sends a result whenever an entity the template reads changes; results land in
 * `values` and re-render the host. Subscriptions are kept until a template, the entity or the
 * connection changes, so ordinary hass updates cost nothing.
 */
export class TemplateController implements ReactiveController {
  values: Record<string, string | undefined> = {};
  private subs = new Map<string, Sub>();
  private conn?: unknown;
  private warned = new Set<string>();

  constructor(
    host: ReactiveControllerHost,
    private fields: () => Record<string, unknown>,
    private ctx: () => TemplateContext,
    /** Called when a result arrives. Cards that skip hass-only updates should bump a reactive property here. */
    private onChange: () => void = () => host.requestUpdate(),
  ) {
    host.addController(this);
  }

  hostConnected() { this.sync(); }
  hostUpdate() { this.sync(); }
  hostDisconnected() { this.clear(); }

  /** The rendered value of a template field, else the field's own value. */
  get(field: string, fallback?: string): string | undefined {
    const raw = this.fields()[field];
    // Until the first result arrives, show the normal value instead of a blank.
    if (isTemplate(raw)) return field in this.values ? this.values[field] : fallback;
    return typeof raw === "string" ? raw : fallback;
  }

  sync() {
    const { hass, config, entity } = this.ctx();
    const conn = hass?.connection;
    if (!conn) return;
    if (conn !== this.conn) { this.clear(); this.conn = conn; }
    for (const [field, raw] of Object.entries(this.fields())) {
      const old = this.subs.get(field);
      if (!isTemplate(raw)) {
        if (old) this.drop(field);
        continue;
      }
      const key = `${entity ?? ""}\u0000${raw}`;
      if (old?.key === key) continue;
      if (old) this.drop(field);
      const variables = { config, user: hass!.user?.name, entity };
      const unsub = conn
        .subscribeMessage((msg: { result?: unknown; error?: string }) => {
          if (this.subs.get(field)?.key !== key) return;
          if ("error" in msg && msg.error) {
            this.values[field] = "";
            if (!this.warned.has(raw)) { this.warned.add(raw); console.warn(`[glide-card] template error in "${field}": ${msg.error}`); }
          } else this.values[field] = msg.result == null ? "" : String(msg.result);
          this.onChange();
        }, { type: "render_template", template: raw, variables, strict: false, report_errors: true })
        .catch((e: unknown) => {
          if (!this.warned.has(raw)) { this.warned.add(raw); console.warn(`[glide-card] template "${field}" failed:`, e); }
          return undefined;
        });
      this.subs.set(field, { key, unsub });
    }
  }

  private drop(field: string) {
    const s = this.subs.get(field);
    this.subs.delete(field);
    delete this.values[field];
    s?.unsub.then((u) => u?.());
  }

  private clear() {
    for (const field of [...this.subs.keys()]) this.drop(field);
    this.conn = undefined;
  }
}
