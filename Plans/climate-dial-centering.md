# Climate dial: keep the temperature centered in the arc

## Context
On the main page the big "26.0°" sits too high inside the arc, and the +/- buttons crowd the arc. On the climate page it's centered correctly.

**Root cause** (`src/cards/climate.ts`):
- The card asks for `rows: 7` (`getGridOptions`, line 46). In a sections grid that's a fixed 7×56 + 6×8 = **440px** card. Header, steppers, modes, padding and gaps take ~240px, so `.dial` (`flex: 1; min-height: 190px`) ends up ~190–200px tall.
- The SVG is `width: min(100%, 240px); aspect-ratio: 1`, so it is **240px tall** and spills out of `.dial`. The implicit grid row is sized to the SVG and starts at the top of `.dial`, so the SVG overflows downward (into the steppers).
- `.readout` is `position: absolute` and gets centered in `.dial`'s **190px** box, not the SVG's 240px box. The result is ~25px higher than the arc's center.
- On the climate page the card has enough height, so `.dial` ≥ 240px and both pieces happen to line up.

## Fix
1. **Make the readout always centered on the arc**, whatever space the card gets:
   - Wrap `<svg>` and `.readout` in a new `<div class="ring">` inside `.dial`.
   - `.ring { position: relative; width: min(100%, 240px); aspect-ratio: 1; }`
   - `svg { width: 100%; height: 100%; … }` (drop its own `min(100%, 240px)` sizing)
   - `.readout { position: absolute; inset: 0; justify-content: center; … }` so it's centered on the ring, not on `.dial`.
   - `.dial` keeps `display: grid; place-items: center` and centers `.ring`.
2. **Give the card enough default height** so nothing overflows into the steppers: change `getGridOptions` to `rows: 8` (504px; content needs ~480px with a 240px ring) and `getCardSize` to `8`. That matches what the climate page shows.
   - Note: if a dashboard already sets `grid_options.rows: 7` on this card, HA keeps that value. Step 1 still keeps the number centered there; the ring would just sit a little close to the buttons.
3. Bump the version to **0.6.2** (package.json, `VERSION` in src/glide-card.ts), rebuild `dist/glide-card.js`.
4. Save this plan as `Plans/climate-dial-centering.md` (project planning rule).

## Critical files
- `src/cards/climate.ts`: render (dial markup ~L144–164), styles (`.dial`, `svg`, `.readout` ~L218–223), `getGridOptions` / `getCardSize` (L45–51)
- `dist/glide-card.js` (rebuilt)

## Verification
- `npm run build` and `npm test`.
- Run the playground (`npm run dev`). On the main page both climate cards (rows from `getGridOptions`) should show the number centered in the arc, with a clear gap above the +/- row. Check Hebrew/RTL and LTR, plus the narrow width option.
- Temporarily force `--rows: 7` on a card in devtools. The number should stay centered in the arc even though the ring is squeezed.
- Dragging the dial still works (pointer handlers stay on the `<svg>`; `getBoundingClientRect` now measures the ring-sized SVG, same geometry).

## Status
- [x] Ring wrapper + centered readout
- [x] rows 7 → 8
- [x] Version 0.6.2, dist rebuilt
- [x] Build + tests pass
- [x] Visual check in the playground (readout center = arc center at rows 8 and forced rows 7)

## Open questions
- None
