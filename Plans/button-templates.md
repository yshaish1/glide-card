# Templates on Glide buttons

## Context
The user's Mushroom buttons show a live "X of Y on" line rendered from a Jinja template. Glide buttons only show fixed text, so they can't do this. Goal: Glide buttons render Home Assistant templates live, the way Mushroom does: the server renders them and pushes updates whenever a referenced entity changes. The user's decisions:
- **Templatable fields:** `name`, a new `secondary` line, a new `badge` text, `icon` and `color`.
- **Secondary line:** a `secondary` template replaces the built-in meta line (brightness or position).
- **On/off look:** still comes from `entity`; templates only change text, icon and colour.
- **Editor:** template fields in the visual editor too, not only in YAML.

## How templates render
- A value counts as a template if it contains `{{` or `{%`. Anything else stays plain text, so existing configs are unchanged.
- New `src/core/templates.ts`, a Lit `ReactiveController` (`TemplateController`):
  - For each templated field, subscribe with `hass.connection.subscribeMessage(cb, { type: "render_template", template, variables: { config, user: hass.user?.name, entity: config.entity }, strict: false, report_errors: true })`.
  - Store the results in `values[field]` and call `host.requestUpdate()`.
  - Re-subscribe only when the template text, the entity or the connection changes, not on every hass update. Unsubscribe on disconnect and on config change.
  - On a template error, keep the field empty and log one `console.warn` per template. While a field is waiting for its first result, fall back to the normal value (entity name or icon); secondary and badge stay empty.
- `src/core/types.ts`: add `connection?: { subscribeMessage(...) }` and `user?: { name: string }` to `HomeAssistant`. Add `secondary?`, `badge?` to `ButtonCardConfig`.

## Button changes (`src/cards/button.ts`)
- Create `TemplateController` with the fields `name`, `secondary`, `badge`, `icon`, `color`.
- Each field resolves the same way: a template result if the field is a template, else the static value as today.
  - `name` → `entityName(s, resolvedName)`
  - `icon` → `entityIcon(s, resolvedIcon)`
  - `color` → `cssColor(resolvedColor) ?? domainColor(s)`
  - `secondary`, when set, replaces `meta` (covers included)
  - `badge`, when set, replaces the state badge, also for stateless entities and for buttons with no entity
- A button with no `entity`, only templates (a summary button), must render without errors. It stays "off" unless `entity` is set.
- The `aria-label` uses the resolved name.

## Editor (`src/editor/editor.ts`)
- New expandable section in the button schema, "Templates" (icon `mdi:code-braces`), with `template` selectors for `name`, `secondary`, `badge`, `icon` and `color`. The labels show an example, e.g. secondary: `{{ states.light | selectattr('state','eq','on') | list | count }} of 7 on`.
- To avoid two different widgets bound to the same key, hide a main-grid field (name, icon or colour picker) while its value is a template. The schema is built per render from the current config.

## Playground and docs
- `playground/mock-hass.ts`: a small `connection.subscribeMessage` mock that renders `{{ states('id') }}` and `{{ state_attr('id','attr') }}`, and re-renders on each `emit()`. Add a demo summary button: name "אורות", `secondary: "{{ states('sensor.indoor_lights_on') }} of 12 on"`, plus a badge template.
- README: a "Templates" subsection with the Mushroom-style "X of Y on" example, using real Jinja that counts the lights in an area.

## Tests (`test/templates.test.ts`)
- Detecting templates.
- One subscription per field, with the right message and variables.
- Results land in `values` and trigger an update.
- Same template on a new hass object → no re-subscribe; changed template → unsubscribe, then subscribe.
- Unsubscribe on disconnect.
- Error → empty value.

## Verification
- `npm run build`, `npm test`.
- Playground (tablet, Hebrew): the summary button shows "7 of 12 on". Changing the mock sensor updates it live. Templated badge, icon and colour render. Normal buttons are unchanged.
- Version 0.8.0; save this plan as `Plans/button-templates.md`. Commit and publish only when asked.
- Real Jinja can only be checked in the user's Home Assistant. Ask the user to try their Mushroom template there.

## Status
Implemented, v0.8.0, not committed.
- [x] `src/core/templates.ts` (TemplateController over `render_template`)
- [x] Button: name / secondary / badge / icon / color templates; summary buttons without an entity
- [x] Editor "Templates" section; main-grid picker hidden while its value is a template
- [x] Per-line bidi so English text reads right on a Hebrew dashboard (and the reverse)
- [x] Playground mock + demo button; README section
- [x] Tests: 39 passing
- [x] Playground: live updates within 60 ms, error → empty + one warning, invalid icon result → normal icon
- [ ] Real Jinja and the visual editor fields: check in Home Assistant (playground has no ha-form)
