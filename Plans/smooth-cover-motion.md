# Smooth cover & curtain motion

## Context
When a cover or curtain opens or closes, the tile moves in steps instead of gliding. Cause (`src/cards/button.ts`): while the motor runs, HA (KNX here) reports `current_position` every second or so, in jumps. Each report starts a **0.45s ease-out** transition (`.cover .fill` height, `.drape` width, `.cover.curtain:not(.window) .fill` width). So the blind moves quickly for 0.45s, stops until the next report, then moves again. That gives the staircase.

Goal: while the cover is `opening`/`closing`, the blind or drapes move at a steady speed that matches the real motor, with no pauses between reports. Nothing changes for drags or for covers that are standing still.

## Approach: steady motion timed to the reports
While the state is `opening` or `closing`, each new position glides **linearly** over a duration equal to the **time since the previous report**. Each glide ends about when the next report arrives, so the pieces join into one continuous motion. This trails the real position by about one report interval (around 1s), but it never overshoots or jumps back. When the cover stops, the usual ease takes over for the final settle.

### Changes: `src/cards/button.ts`
1. **Track report timing** (private fields: `lastPosAt`, `lastPos`, `moveMs`) in `willUpdate`, when `hass` changes and this entity's `current_position` differs from `lastPos`:
   - `now = performance.now()`.
   - If the entity is moving and the previous report was also during motion: `moveMs = clamp(now - lastPosAt, 250, 4000)`.
   - If this is the first report after motion starts: `moveMs = 1000` as a starting guess, so an old timestamp doesn't make it crawl.
   - Then set `lastPosAt = now` and `lastPos = position`.
2. **Render:** add a `moving` class on `.surface` when `s.state` is `opening`/`closing` and no drag is in progress. Add `--gc-move: ${moveMs}ms` to the existing `styleMap`.
3. **CSS:** one rule overrides the three cover transitions while moving:
   ```css
   .surface.moving .fill, .surface.moving .drape { transition-duration: var(--gc-move, 1s); transition-timing-function: linear; }
   ```
   The `.dragging` rules stay as they are (`transition: none`), so drags still feel immediate. `prefers-reduced-motion` already applies through the theme. Check that it still does.
4. The badge and meta % text keep stepping with each report. That's real data and fine as it is.

### Tests: `test/cover-view.test.ts` (existing cover tests; reuse its mount helpers)
- Moving cover with two position reports about 1.2s apart (stub `performance.now`): `.surface` has `moving`, and `--gc-move` is about 1200ms.
- First report after motion starts uses 1000ms. Very long gaps are capped at 4000ms.
- State `open`/`closed`: no `moving` class, so the normal ease applies.
- During a drag: no `moving` class.

### Verify in the browser (playground)
- Start `vite playground/` and open it at phone width in Chrome.
- From the console, drive a cover and a curtain in the mock hass: set the state to `closing` and step `current_position` by 10 every 1s down to 0, then set the state to `closed`. `playground/mock-hass.ts` holds the states; set them through the page's hass object.
- Record a GIF of the blind and the drapes. Check that there are no pauses between steps, the motion runs smoothly in both directions, RTL is fine for the drapes, and dragging still tracks the finger instantly.

### Release
Plan saved to `Plans/smooth-cover-motion.md`. Then `npm run build` and tests, bump to **v0.15.1** (`package.json`, `src/glide-card.ts` VERSION), commit in the repo's message style (no Claude trailers), push, tag, and `gh release create`.

## Open question
- If your KNX covers report position only at the end of a move (not during it), this can't make it smooth. That case would need speed estimation from travel time. Your "step by step" description suggests reports do arrive during the move, so this plan doesn't cover it.

## Status
Done (v0.15.1). Tests: 76 pass. Browser (playground mock now travels 8% per second like a motor): mid-move the blind is never still for more than 1 frame (old ease: about 885ms pauses per step).
