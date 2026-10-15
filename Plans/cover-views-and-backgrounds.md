# More cover views + dashboard backgrounds (v0.18.0)

## Context
Cover tiles have four outdoor views today: garden, sky, city and sea. The user wants more. They also want to control the dashboard's own background from Glide, instead of editing HA themes. What we agreed in the interview:
- **New cover views**, each with a day and a night version: mountains, beach (palms), forest, desert, snow, field and pool (with palms). That makes 11 in total.
- **Dashboard background:** a new card, `card_type: background`, that is invisible on the dashboard. It paints the view it sits on by default; `scope: dashboard` makes it the default for every view in that dashboard.
- **Background kinds:** match the Glide theme (auto), a preset gallery, a solid colour or gradient, or an image with blur and dim.
- **Motion:** an optional slow drift, off by default and also off in lite mode and under reduced motion.
- Test in the user's real HA by injecting into the open page only (no saved dashboard changes), then release v0.18.0 with docs and screenshots.

## Part 1 – Cover views (`src/cards/cover-scenes.ts`, `src/cards/button.ts`)
- Add `mountains`, `beach`, `forest`, `desert`, `snow`, `field` and `pool` to `SCENES` and `FOREGROUND`. They use the same flat-SVG style in the 200×120 box (`xMidYMax slice`), reusing `cloud`, `pineTree` and `roundTree`, plus small new helpers: `palm`, `peak`, `dune`, `snowman`/flakes, wheat rows, and a pool deck with a ladder. Night extras: lit pool, fireflies in the forest, a moon on the water at the beach, snow under a starry sky.
- Sky colour per scene: today `.view.day` and `.view.night` set the gradient, so add scene overrides (`.view.day.desert` warm, `.view.day.field` golden hour, `.view.day.snow` pale). New shape colours go in the button's existing `.view .x { fill }` block, next to `.hill` and `.water`.
- Editor: `src/editor/editor.ts`, the view select options (around line 128). Types: `ButtonCardConfig.view` in `src/core/types.ts`.
- `isScene` already guards unknown values (they fall back to garden), so nothing else changes.

## Part 2 – Background card
### Config (`BackgroundCardConfig` in `src/core/types.ts`; add `"background"` to `CardType` and `TYPES` in `src/glide-card.ts` and the editor)
```yaml
type: custom:glide-card
card_type: background
background: theme        # theme | preset | color | image
preset: aurora           # preset only (gallery below)
color: "#1e293b"         # color: solid; with color2 a gradient
color2: "#7c3aed"
angle: 135
image: /local/yard.jpg   # image only
image_night: /local/yard-night.jpg   # optional, used while sun.sun is below the horizon
blur: 12                 # px, image only
dim: 30                  # %, image only (dark overlay; light overlay in light mode)
animate: false           # slow drift for theme/preset/gradient
scope: view              # view | dashboard
```

### Theme backgrounds
- Add an optional `background?: { dark: string; light: string }` (CSS background values) to `GlideTheme` (`src/themes/types.ts`). Fill it in for all 8 themes, moving the gradients that now live in `playground/index.html` and `playground/shots.html` (`body[data-bg=…]` / `.phone[data-bg=…]`) into the theme files.
- The playground and shots then read `getTheme(id).background` instead of duplicating CSS, so there's one source of truth.
- `background: theme` uses the card's `theme`/`mode` (via `resolveThemeId` and `resolveDark`), so it follows the dashboard theme by default.

### Presets (`src/core/backdrops.ts`)
About 10 named mesh and gradient presets, each with a dark and a light value: aurora, sunset, ocean, forest, midnight, dusk, pastel, mint, rose and graphite. The editor shows them as a swatch grid, like the theme picker.

### Painter (`src/core/backdrop.ts`)
- `paint(spec, hass)` / `clear()` manage one layer element, `div.glide-backdrop` (`position: fixed; inset: 0; pointer-events: none`). It holds the background, an inner image with `filter: blur()`, a dim overlay, and `@keyframes` drift on an oversized gradient (`background-size: 200%`). Animation is disabled when lite mode is on (`isLite` from `src/core/base-card.ts`) or under `prefers-reduced-motion`.
- **Mount point:** inside `hui-root`'s shadow root, right where HA's `hui-view-background` sits (same stacking), with HA's own background hidden while ours is shown. Find it by walking up the composed tree from `document.querySelector("home-assistant")`.
  - Step 1 of execution confirms the exact element names in the user's HA version.
  - Fallback if the structure differs: set `--lovelace-background` on `hui-root`. This supports colour, gradient and image, without blur or animation.
- **Global watcher** (installed once when the module loads):
  - On load and on HA's `location-changed` event, read `hui-root.lovelace.config`.
  - Find the background card for the current view by searching that view's `cards` and `sections` recursively, including stacks. Otherwise use the first one with `scope: dashboard` in any view. Otherwise clear.
  - Repaint when the `sun.sun` state changes (`image_night`) or HA's dark mode flips (`hass.themes.darkMode`, through `hui-root.hass`).
  - This also works when a view has no Glide card at all, and on a direct load into a view.
  - Leaving the dashboard (a different `lovelace.config` or no `hui-root`) clears the background.
- **The card element** (`src/cards/background.ts`, `glide-background`):
  - Outside edit mode it renders nothing (`:host { display: none }`).
  - In edit mode and the editor preview, it shows a small glass chip ("Background: Aurora · this view") and calls `paint()` with its live config, so editing previews instantly.
  - `getGridOptions` returns `{ columns: 12, rows: 1 }`. How it collapses in sections view is checked in real HA.

## Part 3 – Editor, docs, playground
- Editor schema for `background`:
  - kind select, preset swatches, colour pickers (`ui_color` or text), number sliders for angle, blur and dim, a text field for the image, booleans for animate, and a scope select.
  - Only the fields for the chosen kind are shown, the same way the button schema switches on cover (`schemaFor` in `editor.ts`).
- Docs:
  - New `docs/cards/background.md`.
  - `docs/cards/cover.md`: add the new views to the options table, plus a gallery image.
  - README: What's new for v0.18, features, and the "one card, nine widgets" line.
- Playground:
  - A background picker (theme / each preset / image) in the top bar. It drives the same `paint()` against the playground page, with `document.body` as the mount point when there's no `hui-root`.
  - A row of cover tiles, one per view.
- Shots (`playground/shots.ts` and `scripts/screenshots.mjs`):
  - `views` and `views-night`: all 11 views.
  - `backgrounds`: one dashboard on 4–5 backgrounds.
  - Re-run `covers` too.

## Verify
1. `npx tsc --noEmit`, `npx vitest run` (new tests below) and `npm run build`.
2. Tests:
   - Each scene renders for day and night.
   - Unknown views fall back to garden.
   - Watcher config lookup: view card beats the dashboard scope, stacks and sections are searched, and nothing is found when the config has no background card.
   - Preset and theme resolution for dark and light.
   - Animation is off under lite.
3. Playground in Chrome:
   - Every view, day and night.
   - Every background kind, in dark and light, LTR and RTL, at phone and desktop widths.
   - Drift on and off.
4. **Real HA (browser only, nothing saved):** open the user's dashboard in Chrome and confirm the `hui-root` and `hui-view-background` structure. Then:
   - Inject a background spec through the painter on the live page and check the theme, preset, gradient and image + blur kinds.
   - Navigate between views and confirm view vs dashboard scope via a patched in-memory `lovelace.config`.
   - Check that nothing else on the page breaks: popups, the nav bar, scrolling.
   - Reload, so the page is back to normal.
5. `npm run shots` and review the images.

## Release
- Save this plan as `Plans/cover-views-and-backgrounds.md`.
- Bump to 0.18.0 in `package.json` and `src/glide-card.ts`.
- Commit in the repo style (no Claude trailers), push, tag, and run `gh release create v0.18.0` with notes and images.
- Stop the playground and close the Chrome tabs.

## Status
Done, released as v0.18.0. Verified in the playground (all views day/night, every background kind, dark/light, RTL, drift) and in the real HA 2026.10.1 page by injection (preset, photo + blur, view vs dashboard scope across views; nothing saved). Also fixed: Terminal scanlines leaking from heading badges over the whole page.

## Open questions
- Not yet seen in real HA: the background card inside the card editor preview and in sections edit mode (needs a saved card).
