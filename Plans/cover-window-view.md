# Cover tile: window view with a dropping blind (v0.12.0)

## Context
Right now the cover tile shows a flat colour fill that rises from the bottom (height = position). The user finds it hard to tell whether the cover is open or closed. The fix is to turn the tile into a small window. An outdoor scene (sky, clouds, trees) sits behind it, and a slatted blind comes down from the top. At 40% open, the top 60% is slats and the bottom 40% shows the view. Seeing "outside" makes the meaning obvious right away.

What the user chose:
- **Metaphor:** the blind drops from the top. The slat panel height is `100 − position`, and the scene is always behind it. The drag direction stays as it is (up = open).
- **Built-in vector scenes** (inline SVG, no asset files): `garden` (the default), `sky`, `city`, `sea`.
- **Day/night from `sun.sun`:** below_horizon gives a night variant (dark sky, moon, stars). If `sun.sun` is missing, it falls back to day.
- **On by default** for covers that have a position. Config: `view: garden|sky|city|sea|color`, plus `view_image: /local/x.jpg` for the user's own photo. `color` keeps today's flat fill.
- **Slats:** theme-neutral (the theme surface colour, with thin shadow lines between slats and a bottom rail).
- **Legibility:** a soft scrim behind the text, a gradient from the theme surface at the bottom edge.
- **Motion:** clouds drift slowly and stars twinkle. Both are off under `prefers-reduced-motion`.

## Changes

### 1. `src/cards/cover-scenes.ts` (new)
- `sceneSvg(name: "garden"|"sky"|"city"|"sea", night: boolean): TemplateResult` returns a Lit `svg` template:
  - `viewBox="0 0 200 120"`, `preserveAspectRatio="xMidYMax slice"`, so the ground stays at the bottom whatever the tile size
- Shared layers:
  - the sky gradient (day: light blue → pale; night: navy → indigo)
  - the sun or moon
  - cloud groups (class `cloud` for the drift) or star dots (class `star` for the twinkle)
- Per-scene foreground:
  - garden: two hill paths and 3–4 simple trees (round and conifer)
  - city: a skyline of rects with lit windows at night
  - sea: a horizon band and wave paths
  - sky: clouds only
- Night is the same geometry with a darker palette, plus dimmed foreground silhouettes.
- Gradient ids are scoped per instance so several tiles on a page don't collide.

### 2. `src/cards/button.ts`
- `get view()`: returns `config.view ?? (config.view_image ? "image" : "garden")`, applied only when `isCover`.
- `watched()` override: adds `"sun.sun"` when it's a cover with a scene, so day/night changes re-render.
- Render, when it's a cover and `view !== "color"`:
  - surface class `window`
  - a `.view` layer (absolute, inset 0, behind everything) holding `sceneSvg(...)` or `<img src=view_image>` (`object-fit: cover`)
  - the `.fill` element becomes the blind: `--fill` is set to `100 - value`
  - a `.scrim` layer sits under the text
- CSS (`.window …`):
  - `.fill`: anchored to the top (`inset-block: 0 auto`), `height: var(--fill)`, `background` = theme surface (`var(--gc-surface-solid, var(--gc-surface))`, mixed opaque enough to hide the scene) plus a `repeating-linear-gradient` of slat lines (≈9px pitch, 1px shadow line), a bottom-rail `border-bottom` and a small drop shadow; the same height transition and `.dragging` rule as today
  - `.scrim`: `linear-gradient(to top, color-mix(var(--gc-surface-solid) 85%, transparent), transparent 60%)` at the bottom
  - the icon and badge keep their own backgrounds, so they read fine over the slats
  - keyframes `gc-drift` (translateX on `.cloud`, about 60–90s, alternate) and `gc-twinkle` (opacity on `.star`), all wrapped in `@media (prefers-reduced-motion: no-preference)`
- `view: color` and non-cover tiles: rendered exactly as today (regression-safe).
- Slim/pill sizes: the same layering. The blind still drops vertically, and the scene's `slice` crops it nicely.
- Check the base `surface` styles for `overflow: hidden` / radius clipping so the view stays inside the rounded corners.

### 3. Themes
- Bubble: `.cover .fill{box-shadow:inset 0 2px 0 accent}`. For `.window` the edge moves to the blind's bottom (`inset 0 -2px 0`), or is dropped. Check how Glass blurs the surface: the blind should look solid, not see-through.
- If a theme has no solid surface token, add an optional `--gc-surface-solid` token per theme (Glass light/dark, Material, Bubble) and document it in `src/themes/types.ts`.

### 4. Types and editor
- `ButtonCardConfig` (`src/core/types.ts`): `view?: "garden"|"sky"|"city"|"sea"|"color"`, `view_image?: string`.
- `src/editor/editor.ts`: a `view` select (Garden / Sky / City / Sea / Plain colour) and a `view_image` text field, plus labels. Simplest: always in the button schema, with the label "Cover view (covers only)".
- README: document `view` / `view_image` with an example.

### 5. Housekeeping
- Copy this plan to `Plans/cover-window-view.md` (project rule) and update its Status as work goes.
- Bump to 0.12.0 in `package.json` and `src/glide-card.ts`.
- Playground: add `sun.sun` to `playground/mock-hass.ts` with a day/night toggle, and add tiles `view: city`, `view: sea`, `view_image` alongside `cover.blinds`.

## Reuse
- `sliderFor` (`src/core/entity.ts:83`), the gestures `axis: "y"` path, the `dragValue` optimistic flow and the `--fill` var: all unchanged, only inverted for the blind height
- the `watched()` / `shouldUpdate` filter (`src/core/base-card.ts:127`)
- the `size` host attribute rules that already exist in button.ts

## Verification
- `npm test`:
  - add a test that the cover renders `.window` with `--fill = 100 - position`
  - `view: color` renders the old fill
  - `sun.sun` below_horizon picks night
  - non-cover tiles are unchanged
- Then `npm run build`.
- Playground (`npm run dev`, Chrome):
  - `cover.blinds` at 0 / 40 / 100%
  - every scene, day and night
  - Glass light he, Glass dark, Material, Bubble
  - full / compact / slim and pill
  - mouse drag up/down moves the blind live
  - text stays readable
  - reduced-motion stops the drift
- Commit v0.12.0; ask before push/release.

## Status
Done in v0.12.0 (2026-10-13):
- 64 tests pass (new `test/cover-view.test.ts`), and the build works.
- Checked in the playground: Glass dark and light, day and night, and Bubble; every scene, the photo view, plain colour, and a pill.
- Tweaked after looking: the sun and moon moved lower so the badge doesn't hide them, and the text fade is lighter.
- Not checked: Material, compact/slim sizes, touch drag on a real phone (the gesture code is unchanged).

## Open questions
- None blocking. Exact scene artwork gets tuned visually in the playground.
