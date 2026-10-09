# Tile names wrap to two lines

## Context
On the tablet, the name on a long-named tile button (the default 2-row square tile) gets cut off with "…" and can't be read. In `src/cards/button.ts`, `.name` is forced onto one line (`white-space: nowrap; overflow: hidden; text-overflow: ellipsis`). The user chose: wrap to 2 lines, with slightly smaller text on narrow tiles, and "…" only past 2 lines. Pill buttons stay as they are.

## Space check
A 2-row HA sections tile is about 120px tall. Today: 16px padding ×2, a 44px icon, a 16px name and a ~15px meta line → about 107px. A second name line (~19px) brings it to about 126px, which overflows. So the tile has to give back a few pixels when it's narrow.

## Changes (all in `src/cards/button.ts` styles)
1. `:host { container-type: inline-size; }` so tiles can react to their own width (works inside shadow DOM).
2. Tile name (`.tile .name`):
   - `white-space: normal; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden;`
   - `line-height: 1.2; overflow-wrap: anywhere; text-wrap: balance;` (balanced two lines, and long single words still break)
   - Keep the existing one-line ellipsis rule for `.pill .name` (move the nowrap/ellipsis rule under `.pill .name`).
3. Narrow tiles (`@container (max-width: 260px)`):
   - `.tile { padding: 12px; }`, `.tile .icon { width: 38px; height: 38px; }`, `.tile .name { font-size: 14px; }`
   - Breakpoint raised from 200px to 260px after testing: tablet tiles in 4 columns are ~200px wide.
   - Budget: 24 + 38 + 2×17 + 15 ≈ 111px, which fits inside 120px with the meta line.
4. Tile text row: keep `align-self: end` so a 1-line name still sits at the bottom like today. Add `min-height: 0` on `.tile .text` so the grid row can't push the card taller than its slot.
5. Bump to v0.6.5 (`package.json`, `VERSION` in `src/glide-card.ts`), rebuild `dist/`.
6. Save this plan to `Plans/tile-name-wrap.md` (project rule).

## Verification
- `npm run build` (typecheck + build) and `npm test`.
- Playground (`npx vite playground/`), Phone and tablet widths, Hebrew and English. Temporarily give a button a long name (e.g. "מנורת תקרה בסלון הגדול"). Check that the name wraps to 2 lines with no "…", the icon, badge and meta line don't overlap or get clipped, a 3-line name shows "…" at the end of line 2, pills are unchanged, and a short name looks the same as before.
- Screenshot a tile with a long name in each theme (glass, bubble, material).
- Then commit and publish v0.6.5 the same way as v0.6.4 (commit, push, tag, GitHub release with `dist/glide-card.js`). The user asked for commit and publish last time; confirm again for this release.

## Status
Done and verified in the playground (tablet width, Hebrew, fixed 120px tiles, glass + material). Not committed yet.
