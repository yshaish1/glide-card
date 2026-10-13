# Cover tile: curtains (v0.13.0)

## Context
v0.12.0 turned cover tiles into a window: an outdoor view behind a blind that drops from the top. Curtains don't move like that. The user wants curtain covers to look like curtains, and to be able to choose the style.

What the user chose:
- **Two panels part from the centre.** At position `p`, each panel covers `(100 − p) / 2` of the width, and the view shows in the middle gap.
- **Auto + override.** Covers whose HA `device_class` is `curtain` get curtains automatically. `cover_style: curtain | blind` forces either look.
- **Horizontal drag.** It reuses the existing x-axis slider (right opens in LTR, flipped for RTL by the gesture code).
- **Theme-tinted fabric folds.** The fabric is the neutral theme surface by default; `color:` tints it.

## Changes

### 1. `src/cards/button.ts`
- `get isCurtain()`: `isCover && (config.cover_style === "curtain" || (config.cover_style !== "blind" && attributes.device_class === "curtain"))`.
- Gestures: `axis: () => (this.isCover && !this.isCurtain ? "y" : "x")`.
- Render, in window mode with a curtain:
  - surface class `curtain`
  - instead of the blind `.fill`, render a rod plus `<div class="drape start">` and `<div class="drape end">` (logical sides, so it works in RTL)
  - style var `--closed: (100 − value) / 100`
  - each drape: `width: calc(7% + 36% * var(--closed))`. At 100% open a small bunched panel stays on each side, so the tile still reads as a curtain. At 0% open the two drapes meet (7% + 36% = 43% each, plus a slight overlap: use `calc(7% + 44% * var(--closed))` so they touch, about 51% each).
  - `width` transitions like the blind's height, with no transition while dragging (reuse `.dragging`)
- Fabric CSS:
  - `--fabric: var(--gc-fabric, var(--gc-surface-solid, var(--gc-surface)))`; when `config.color` is set, pass `--gc-fabric` = the resolved colour (via the existing `cssColor`)
  - folds: `background: repeating-linear-gradient(to right, color-mix(fabric, black 14%) 0, fabric 25%, color-mix(fabric, white 12%) 50%, fabric 75%, color-mix(fabric, black 14%) 100%)` with `background-size: 25% 100%`, so there are always 4 folds and they bunch up as the panel narrows
  - inner-edge shadow (`box-shadow` toward the gap) and a slightly darker hem at the bottom
  - rod: a 4px bar across the top in `color-mix(var(--gc-text) 30%, fabric)`; the drapes start just under it
- The scrim stays (bottom fade), so the name reads over fabric or view. The icon and badge keep their solid backgrounds.
- `view: color` with a curtain: no window. Add a `.cover.curtain .fill` reset back to the standard width-based fill (start → end), matching the horizontal drag.
- Day/night, scenes, photo, `sun.sun` watching: all shared with blinds, unchanged.

### 2. Types and editor
- `ButtonCardConfig.cover_style?: "blind" | "curtain"` in `src/core/types.ts`.
- Editor: a `cover_style` select (Auto / Blind / Curtain) in the cover grid next to `view`, labelled "Cover style (empty = auto from device class)".
- README "Cover view" section: add curtains plus a `cover_style` example.

### 3. Themes
- Bubble: an accent line on each drape's inner edge, matching the blind's accent rail (`.curtain .drape.start{box-shadow:inset -2px 0 0 accent}` and the mirror; use logical-direction-safe shadows, or `border-inline-end`).
- Glass and Material need nothing extra (`--gc-surface-solid` / solid surface already exist).

### 4. Playground and housekeeping
- `playground/mock-hass.ts`: add `cover.living_curtains` (`device_class: curtain`, position 50) and a forced `cover_style: curtain` tile with `color: "#b38b6d"`.
- Copy this plan to `Plans/cover-curtains.md` and update its status as work goes.
- Bump to 0.13.0 in `package.json` and `src/glide-card.ts`; rebuild `dist` right before committing.

## Reuse
- `isCover`, `view`, `renderView()`, the scrim, `sceneSvg`, the `sun.sun` watch (`src/cards/button.ts`, `src/cards/cover-scenes.ts`)
- the x-axis drag with RTL flip (`src/core/gestures.ts`), the `dragValue` flow, `cssColor` (`src/core/entity.ts`)

## Verification
- `npm test`: add cases to `test/cover-view.test.ts`:
  - `device_class: curtain` renders `.curtain` with two drapes and `--closed: 0.6` at 40%
  - `cover_style: blind` overrides the device class
  - `cover_style: curtain` works on a plain cover
  - the drag axis is "x" for curtains and "y" for blinds (check via the axis getter, or by simulating a horizontal mouse drag)
  - `color` sets `--gc-fabric`
- Then `npm run build`.
- Playground (Chrome):
  - curtains at 0 / 50 / 100%, day and night, Glass dark and light, Bubble, Hebrew RTL
  - mouse-drag horizontally to open and close
  - pill layout
- Commit v0.13.0, then push, tag and release (the user said "publish" last time; confirm before publishing again).

## Status
Done in v0.13.0 (2026-10-13):
- 68 tests pass, and the build works.
- Checked in the playground: Glass dark, and Glass light in Hebrew RTL. Auto (device class), a forced brown curtain on a city view, and a pill all look right.
- A mouse drag sideways sets the position: dragging left in RTL opened the curtain to 80%.
- Not checked: Bubble and Material visually, touch on a phone.

## Open questions
- None blocking. Fold depth and the bunched-panel width get tuned visually.
