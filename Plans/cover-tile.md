# Cover tile: match the "Motorized Blinds" mockup (v0.5.0)

## Context
The user compared the blinds tile on their HA (`תריסים למטה`, Glass theme, light, Hebrew) with the "Motorized Blinds" tile in `design/c-material-you.png`, and wants them to match.

| | Design | Current |
|---|---|---|
| Fill | rises from the bottom, height = position, with a soft top edge line | grows across the width (start → end) |
| Badge | soft neutral chip showing `40%` | solid orange accent chip `פתוח` |
| Meta | `40% Open` | `67%` |
| Icon / card | neutral circle, neutral card | domain-tinted icon, `--gc-surface-on` card |

What the user chose:
- **Covers only.** Lights and other tiles keep their current look.
- **Vertical drag**: drag up to open more and down to close.

## Changes

### 1. `src/core/gestures.ts`: optional vertical axis
- Add `axis?: "x" | "y"` to `GestureHandlers`, defaulting to `"x"`.
- With `"y"`:
  - the drag starts when `|dy| > |dx|`
  - the value is `start - (dy / height) * 100`, so moving up raises it; there is no RTL flip
- **Mouse/pen**: a vertical drag starts right away.
- **Touch**: `pan-y` lets the browser take vertical swipes as page scroll, so drag uses hold-then-drag:
  - a still press of `ARM_MS` (≈250ms) arms the drag (with a `haptic("selection")` callback via a new optional `arm?()` handler)
  - a non-passive `touchmove` listener calls `preventDefault()` while armed or dragging, so the page doesn't scroll
  - moving before the press is armed is a normal page scroll, unchanged
  - an armed press released without moving still becomes a tap; holding still until `HOLD_MS` (500ms) still fires hold (more-info)
- The `"x"` behaviour stays exactly as it is. Remove the touchmove listener in the cleanup function.

### 2. `src/cards/button.ts`: cover variant
- `const cover = domainOf(entity) === "cover" && !!slider`. Add a `cover` class on `.surface`, and pass `axis: cover ? "y" : "x"` to `attachGestures`. The axis is computed per gesture through a getter, so a config change still works.
- For covers:
  - the badge text is `${value}%`, using the drag value live; fall back to the state text when there is no position
  - meta is `${value}% ${formatState}` → "67% פתוח" / "40% Open"
  - don't add the `on` class, so the card and icon stay neutral as in the mockup
- CSS:
  - `.cover .fill`:
    - drop width/inline-start and use `inset-inline: 0; inset-block-end: 0; height: var(--fill)`
    - transition `height`
    - top hairline `border-top: 1.5px solid color-mix(in srgb, var(--domain) 35%, transparent)` and small top radius
  - `.cover .badge`: soft neutral chip, `background: color-mix(in srgb, var(--gc-text) 7%, transparent)`, no accent and no border
  - `.cover .meta` uses `--gc-text-dim` (monospace meta font is already shared)
  - `.cover .text` sits above the fill: it is already `position: relative`, so check the stacking

### 3. Themes
- Bubble adds `.fill{box-shadow:inset -2px 0 0 accent}`. For covers, override it with `.cover .fill{box-shadow:none}` in the button styles, or move the edge to the top for covers.
- Check the Material `.on .icon` override; it isn't affected because covers no longer get `.on`.

### 4. Housekeeping
- Bump to 0.5.0 in `package.json` and `src/glide-card.ts`.
- Save this plan to `Plans/cover-tile.md`.

## Reuse
- `sliderFor` (`src/core/entity.ts:48`) for the position and `set_cover_position`
- `formatState` (`src/core/i18n.ts:26`): "פתוח"/"סגור" already exist
- `haptic` (`src/core/fire.ts`), `--fill` style var, `dragValue` optimistic flow

## Verification
- `npm test`: add gesture tests in `test/` for the y axis (mouse vertical drag up and down gives the right values, a horizontal move on y-axis cancels) and a regression check that the x axis is unchanged. Then `npm run build`.
- Playground (`npm run dev`, Chrome), using `cover.blinds` at 40%:
  - side by side with the mockup tile in Material light en
  - Glass light he (as on the user's dashboard), Glass dark, Bubble
  - drag up/down with the mouse sets the position, and the badge and meta update live
  - mobile emulation: a quick vertical swipe scrolls the page; a press-hold-then-drag adjusts; a tap toggles; a long still hold opens more-info
- Commit v0.5.0; ask before push/release.

## Status
Done in v0.5.0 (2026-10-09), committed; push/release awaits the user's OK.
- Gestures take `axis()` and `arm()` callbacks. Covers drag vertically: mouse drags start at once, touch needs a 250ms still press first. Covered by `test/gestures.test.ts`.
- Checked in the playground: Glass light he and Material light en against the mockup. A mouse drag up moves 40% to 70%, and the badge and meta update.
- Not checked: touch hold-then-drag on a real phone (the unit test covers the logic).
