# Cover text: frosted glass chip

## Context
Cover cards in the window look (a built-in scene or `view_image`) put the name and the "40% Open" line straight over the view. Today a gradient scrim sits under that text. It is drawn *below* the blind and the drapes, so where fabric covers the view, or over a bright or busy photo, the text gets hard to read. The user wants a semi-transparent backing behind the text. Agreed in the interview:
- **Style:** a frosted glass chip. It is a rounded, semi-transparent panel that blurs what's behind it, wrapped tightly around the name and meta line. It matches the solid backings the icon and badge already have (`.window .icon, .window .badge`).
- **Scope:** every cover with a view (scenes and photos), in tile, pill and slim, for blinds and curtains. Plain-colour covers (`view: color`) don't change.

At execution this plan is copied to `Plans/cover-text-chip.md`, following the project rule.

## Approach (all in `src/cards/button.ts`)
1. **Chip on `.window .text`.**
   - Padding `4px 10px`, `border-radius: var(--gc-radius-control)`.
   - `background: color-mix(in srgb, var(--gc-surface-solid, var(--gc-surface)) 55%, transparent)`.
   - `backdrop-filter: blur(10px) saturate(1.2)`, with the `-webkit-` prefix too.
   - A thin `var(--gc-border)` outline.
   - It already has `position: relative`, so it sits above the view, fill, drapes and scrim.
2. **Hug the content.**
   - Tile: `justify-self: start; max-width: 100%`, so the chip wraps the text and doesn't span the card. The existing two-line name clamp keeps working.
   - Pill and slim: `flex: 0 1 auto; min-width: 0` in window mode, so the chip wraps the text and the ellipsis still works.
   - Keep the text's left edge visually aligned with the icon by offsetting the chip with a small negative `margin-inline-start` (about −4px).
3. **Drop the scrim.** The chip does its job now, and removing it shows more of the view. Remove the `<div class="scrim">` from `renderView()` and its CSS rules.
4. **Sizes.** Use slightly less padding for compact and slim (`2px 8px`), so the slim one-row tile and the pill keep their heights.
5. **Themes.** The chip uses only theme tokens (`--gc-surface-solid`, `--gc-border`, `--gc-radius-control`), so liquid-glass, bubble and the light and dark modes all follow. Check bubble's overrides for conflicts.
6. **Version.** v0.14.2 in `package.json` (stage only the version line, because the other session's edits are still uncommitted in that file) and in `src/glide-card.ts`. Rebuild `dist/`.

## Verification
- `npm run typecheck && npm test`.
- In the playground in Chrome (`npm run dev`), zoom in on the cover cards:
  - garden, sky, city, sea, the photo view, and the Hebrew curtain;
  - pill and slim;
  - day and night, light and dark mode, LTR and RTL.
- The text is readable over the drapes and the blind, the chip hugs the text, and no card height changes.
- `npm run build`. Commit only when the user asks.

## Status
- [x] Frosted chip on `.window .text`, scrim removed, size tweaks
- [x] Built and checked. Two changes from the plan: the outline is an inset shadow, not a border, and slim has no vertical padding, so no card height changes (slim stays at 65px, tile at 120, pill at 60).
- [x] Released as v0.14.4
- [x] v0.14.5: the chip corner is concentric with the card's, chosen from real-card mockups (variant C of pill / wider pill / 12px / 6px). It is 12px with 12px sides on full tiles and 11px on compact; slim keeps 8px sides and a 10px corner so no height changes.

## Open questions
- None.
