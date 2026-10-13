# Cover buttons (open · stop · close)

## Context
Cover cards (blinds and curtains) are rendered by `GlideButton` (`src/cards/button.ts`). Today the only controls are tapping the card (toggle) and dragging it (set the position). Covers that report no position have only the toggle. The user wants explicit open and close buttons. We agreed on:
- **Buttons:** open, stop and close. Each shows only when the cover supports it (`supported_features`).
- **Placement:** small round buttons at the card's end, with a solid backing like the icon and badge, so they stay readable over the window scene.
- **Default:** off. A new `cover_buttons: true` turns them on, and the editor gets a toggle for it.
- **Scope:** every `cover.*` entity, including covers that report no position.

When execution starts, this plan is copied to `Plans/cover-buttons.md` (the project rule).

## Approach

### 1. Config type: `src/core/types.ts`
- Add `cover_buttons?: boolean;` to `ButtonCardConfig`, next to `cover_style`.

### 2. Gesture isolation: `src/core/gestures.ts`
- In `down()`, ignore presses that start on an element marked `[data-no-gesture]`:
  `if (e.composedPath().some(n => n instanceof Element && n.hasAttribute("data-no-gesture"))) return;`
  Without this, pressing a button also arms a drag, a hold or the card's toggle tap. Also check the keyboard-tap path: Enter or Space on a focused inner button must not toggle the card.
- Add a case to `test/gestures.test.ts`: a pointerdown on a marked child fires no tap.

### 3. Rendering: `src/cards/button.ts`
- Feature bits: OPEN=1, CLOSE=2, STOP=8 (HA `CoverEntityFeature`).
- Add `private get coverButtons()`. It is true when `domainOf(entity) === "cover"` and `config.cover_buttons` is set.
- Add `renderCoverButtons(s)`, which returns `<div class="cover-btns" data-no-gesture>` with up to three `<button class="round">`:
  - Blind: open is `mdi:arrow-up`, stop is `mdi:stop`, close is `mdi:arrow-down`.
  - Curtain (`isCurtain`): open is `mdi:arrow-split-vertical`, close is `mdi:arrow-collapse-horizontal`.
  - Open is disabled when the cover is fully open (`current_position === 100`, or the state is `open` and there is no position). Close is disabled when it is fully closed. Stop is enabled only while the state is `opening` or `closing`.
  - Clicks call `hass.callService("cover", "open_cover" | "stop_cover" | "close_cover", { entity_id })`, then `haptic("light")` and `e.stopPropagation()`.
  - Use the existing i18n `t()` for the aria-labels, adding `open`, `close` and `stop` keys if they are missing.
- Layout:
  - **Tile:** extend the grid template so the buttons sit at the bottom end, beside the text: `"icon badge" auto "text btns" 1fr / 1fr auto`, with `.cover-btns` aligned to the end.
  - **Pill:** the buttons sit at the end of the row and take the place of the badge (the meta line still says "40% Open").
  - **Slim:** the buttons replace the badge in the single row.
- Styles: 32px round buttons (28px for compact and slim), background `var(--gc-surface-solid, var(--gc-surface))` and a `--gc-border` outline, matching `.window .icon`. A `:disabled` button drops to 0.4 opacity, and an active stop button uses the `--domain` tint. Give the buttons `position: relative` so they stack above the fill, drapes and scrim.
- Covers that report no position render the same buttons. The `isCover` and `slider` logic does not change.

### 4. Editor: `src/editor/editor.ts`
- Add `{ name: "cover_buttons", selector: { boolean: {} } }` to the cover grid (with `view`, `view_image` and `cover_style`).
- Label: `cover_buttons: "Open / stop / close buttons"`.

### 5. Docs, playground and version
- `README.md`: document `cover_buttons` in the covers section.
- `playground/main.ts`: add cards with `cover_buttons: true`: a blind tile, a pill curtain, a slim tile, and a cover that reports no position. If `playground/mock-hass.ts` lacks a cover without a position, add one, and make sure the mock covers have `supported_features: 15` and that the mock `callService` updates the state.
- Bump to v0.14.0 in `package.json` and `src/glide-card.ts` (the version-string location). Rebuild `dist/glide-card.js`.

## Verification
- `npm run typecheck && npm test`, including the new gesture test.
- `npm run dev` opens the playground. In Chrome:
  - Clicking open, stop and close calls the right services.
  - Pressing a button never starts a drag and never toggles the card.
  - Disabled states follow the cover's position.
  - Tile, pill and slim, in both RTL and LTR, have no overflow at narrow widths.
- `npm run build` to update `dist/`.

## Status
- [x] Config type, gesture opt-out (`data-no-gesture`) and its test
- [x] Buttons in `button.ts`. Change during build: on tiles the buttons take the badge's top-end corner, not bottom-end, because at 190px they squeezed the name. Narrow pill and slim cards hide stop unless the cover is moving.
- [x] Editor toggle, i18n labels (en and he), README, playground and mock services
- [x] v0.14.0, dist rebuilt, typecheck and tests green, clicks checked in the playground

## Open questions
- None blocking. The default icons for curtains can be adjusted after the first look.
