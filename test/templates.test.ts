import { describe, expect, it, vi } from "vitest";
import { TemplateController, isTemplate } from "../src/core/templates";
import type { HomeAssistant } from "../src/core/types";

const flush = () => new Promise((r) => setTimeout(r));

function setup(fields: Record<string, unknown>, entity?: string) {
  const subs: { cb: (m: any) => void; msg: any; unsub: ReturnType<typeof vi.fn> }[] = [];
  const connection = {
    subscribeMessage: vi.fn(async (cb: (m: any) => void, msg: any) => {
      const unsub = vi.fn();
      subs.push({ cb, msg, unsub });
      return unsub;
    }),
  };
  const host = { addController: vi.fn(), removeController: vi.fn(), requestUpdate: vi.fn(), updateComplete: Promise.resolve(true) };
  const state = { fields, entity, hass: { connection, user: { name: "Yossi" } } as unknown as HomeAssistant };
  const ctl = new TemplateController(host, () => state.fields, () => ({ hass: state.hass, config: { x: 1 }, entity: state.entity }));
  return { ctl, host, subs, connection, state };
}

describe("isTemplate", () => {
  it("spots Jinja markers only", () => {
    expect(isTemplate("{{ states('a') }}")).toBe(true);
    expect(isTemplate("{% if x %}y{% endif %}")).toBe(true);
    expect(isTemplate("Ceiling {light}")).toBe(false);
    expect(isTemplate(undefined)).toBe(false);
  });
});

describe("TemplateController", () => {
  it("subscribes once per template field with HA's render_template message", () => {
    const { ctl, subs } = setup({ name: "Plain", secondary: "{{ 1 }}", badge: "{% if true %}on{% endif %}" }, "light.a");
    ctl.hostConnected();
    expect(subs).toHaveLength(2);
    expect(subs[0].msg).toEqual({
      type: "render_template", template: "{{ 1 }}", strict: false, report_errors: true,
      variables: { config: { x: 1 }, user: "Yossi", entity: "light.a" },
    });
  });

  it("returns the static value, the fallback until the first result, then the result", () => {
    const { ctl, host, subs } = setup({ name: "Plain", secondary: "{{ 1 }}" });
    ctl.hostConnected();
    expect(ctl.get("name")).toBe("Plain");
    expect(ctl.get("secondary", "wait")).toBe("wait");
    subs[0].cb({ result: 3 });
    expect(ctl.get("secondary", "wait")).toBe("3");
    expect(host.requestUpdate).toHaveBeenCalled();
  });

  it("keeps the subscription across hass updates and swaps it when the template changes", async () => {
    const { ctl, subs, state } = setup({ secondary: "{{ 1 }}" });
    ctl.hostConnected();
    ctl.hostUpdate();
    expect(subs).toHaveLength(1);
    state.fields = { secondary: "{{ 2 }}" };
    ctl.hostUpdate();
    await flush();
    expect(subs).toHaveLength(2);
    expect(subs[0].unsub).toHaveBeenCalled();
    subs[0].cb({ result: "stale" });
    expect(ctl.get("secondary")).toBeUndefined(); // the old subscription's late result is ignored
  });

  it("re-subscribes when the entity changes and unsubscribes on disconnect", async () => {
    const { ctl, subs, state } = setup({ secondary: "{{ 1 }}" }, "light.a");
    ctl.hostConnected();
    state.entity = "light.b";
    ctl.hostUpdate();
    expect(subs).toHaveLength(2);
    ctl.hostDisconnected();
    await flush();
    expect(subs.every((s) => s.unsub.mock.calls.length === 1)).toBe(true);
  });

  it("an error leaves the field empty and warns once", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { ctl, subs } = setup({ secondary: "{{ bad( }}" });
    ctl.hostConnected();
    subs[0].cb({ error: "TemplateSyntaxError" });
    subs[0].cb({ error: "TemplateSyntaxError" });
    expect(ctl.get("secondary", "x")).toBe("");
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });

  it("does nothing without a connection", () => {
    const { ctl, connection, state } = setup({ secondary: "{{ 1 }}" });
    state.hass = {} as HomeAssistant;
    ctl.hostConnected();
    expect(connection.subscribeMessage).not.toHaveBeenCalled();
  });
});
