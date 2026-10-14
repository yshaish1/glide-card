# Cover open styles

## Context
Cover tiles have only two looks today: `cover_style: blind` (drops from the top) and `curtain` (two drapes part from the center). Real windows open in more ways, so the tile should match the actual window. Decisions from the interview:
- **Styles:** center split, one side to the other, top-down, bottom-up, Roman shade, Venetian (tilt shown), vertical blinds, outdoor roller shutter.
- **Side:** chosen as start/end, which follows the text direction (in Hebrew, start = right).
- **Default:** auto from device class. Today's looks are kept: curtain → center split, everything else → top-down. The one exception is that `shutter` gets the new roller-shutter look.
- **Tilt:** Venetian slats only *show* `current_tilt_position`. Dragging still sets the position, and tilt is changed from more-info (hold).
- **Drag:** follows the style's motion direction.
- **Plain fill** (`view: color`): grows from the edge or center that matches the style.

## Config
`cover_style` (in `src/core/types.ts`, and a select in `src/editor/editor.ts`):

| value | motion | drag |
|---|---|---|
| `blind` | top-down, as today | y |
| `bottom_up` | rises from the sill | -y |
| `roman` | top-down, soft stacked folds, a fold bunch at the hem | y |
| `venetian` | top-down slats; the slat gap follows `current_tilt_position` | y |
| `shutter` | outdoor aluminium slats from a top box, opaque | y |
| `curtain` | two drapes from the center, as today | x |
| `curtain_side` | one drape, stacks at `cover_side` when open | ±x |
| `vertical` | vertical slats, stack at `cover_side` when open | ±x |

New option: `cover_side: start | end` (default `start`). It applies to `curtain_side` and `vertical`.

Auto (`cover_style` unset): device class `curtain` → `curtain`, `shutter` → `shutter`, anything else → `blind`. `blind` and `curtain` keep exactly today's rendering, so existing tiles don't change, apart from shutters.

## Implementation: `src/cards/button.ts`
1. Replace `isCurtain` with a `coverStyle` getter that returns one of the values above (auto rules included). Add `horizontal` (curtain, curtain_side, vertical) and `side` helpers. Put the style list and auto map in one table near the top, next to `COVER_OPEN` etc.
2. **Gestures:** `axis()` returns the direction per style. Extend `src/core/gestures.ts` so `axis` can be `"x" | "-x" | "y" | "-y"`, where a minus sign flips the delta. RTL handling stays in the existing x branch. Rule: dragging in the direction the cover opens raises the value.
3. **Render:** add the classes `style-<value>` and `side-<start|end>` on `.surface`. Keep the existing `--fill` / `--closed` vars, add `--tilt` (0–1 from `current_tilt_position`, default 0.5), and draw the panel:
   - Top-down family (`blind`, `roman`, `venetian`, `shutter`): the existing `.fill` with the window look, plus one CSS block per style for its texture.
     - Roman: horizontal fold shading, and a thicker hem band.
     - Venetian: slats from a repeating gradient. The slat-to-gap ratio comes from `--tilt`, so slats look open at 50% tilt and closed at 0 or 100.
     - Shutter: opaque metal slats plus a `.box` strip at the top that is always visible.
   - `bottom_up`: the same `.fill`, but anchored at the bottom (`inset-block: auto 0`), with the bar on the top edge.
   - `curtain`: the existing rod and two drapes, unchanged.
   - `curtain_side`: rod plus one `.drape`, anchored at `inset-inline-start/end` per side. Width is `calc(7% + 93% * var(--closed))`, and the shadow is on the free edge.
   - `vertical`: rod (head rail) plus one panel with vertical slat stripes, anchored and sized like `curtain_side`.
   - Plain fill (`view: color`): `.fill` grows from the matching edge. Center split grows from the center using `inset-inline` math. This extends the existing `.cover.curtain:not(.window) .fill` rule.
4. The smooth-motion rule from v0.15.1 (`.surface.moving .fill/.drape`) has to cover the new panel elements. Use `.drape` / `.fill` for all of them, so no new selectors are needed.
5. Themes: `src/themes/bubble/index.ts` has accent borders on `.drape.start/.end`. Give the single drape the same accent edge on its free side.
6. The `cover_buttons` icons follow the style: up/down arrows for vertical motion, split/collapse for center split, and a sideways arrow pair for one-side styles.

## Docs and playground
- Docs: `docs/cards/button.md`, or wherever the cover options are documented. Add a style table with the YAML for each style.
- Playground: add one tile per style in `playground/main.ts`, so they can be compared side by side. The mock already moves covers step by step. Add a Venetian cover with `current_tilt_position`.
- README screenshots: no change (`npm run shots` is untouched).

## Tests: `test/cover-view.test.ts`
- Auto rules: curtain → curtain, shutter → shutter, other → blind. An explicit `cover_style` wins.
- Each style renders its class and the expected panel elements: one drape for `curtain_side`, two for `curtain`, and a `.box` for `shutter`.
- `--tilt` comes from `current_tilt_position` and defaults to 0.5.
- Gesture direction: unit-test in `test/gestures.test.ts` that `-x` and `-y` flip the delta, with x still RTL-aware.
- Existing cover tests stay green, since `blind` and `curtain` are unchanged.

## Verify
`npx tsc --noEmit`, `npx vitest run` and `npm run build`. Then in the playground in Chrome, at phone width, in LTR and Hebrew RTL, and in dark and light:
- Every style at about 50% looks right.
- Opening and closing with the mock motor runs smoothly in the right direction.
- Dragging in the opening direction opens.
- `side: start` flips correctly in RTL.

Take screenshots of a grid of all styles.

## Release
- Save the plan as `Plans/cover-open-styles.md`.
- Feature release **v0.16.0**: bump `package.json` and `src/glide-card.ts`.
- Commit in the repo style (no Claude trailers), push, tag, and `gh release create` with a style list.

## Status
Done (v0.16.0). 84 tests pass; all 8 styles checked in the playground (dark LTR, light Hebrew RTL), plain fills and side buttons included.
