# Card sizes: Full / Compact / Slim

## Context
The slimmer nav (v0.10.2) landed well, so the user wants every Glide widget to be available in a slimmer version.
The size is the user's choice, with three levels: **Full** (today's look), **Compact** and **Slim**. It can be set
on each card and for the whole dashboard, the same way tap animations work. It has to work on both sections and
masonry dashboards.

The constraint that shapes this: in a sections dashboard, HA snaps cards to 56px rows with 8px gaps. A tile is
2 rows (120px) and a pill is 1 row (56px). A card can only shrink there by a whole row, so a slim tile becomes a
1-row tile with the icon beside the name, like HA's own tile card. Cards on masonry, and content-sized cards (nav,
heading, chips, title, the pop-up sheet), shrink by any amount.

## Step 1: mockup (now)
Build one HTML page and publish it as a private Artifact so it can be opened on the phone.
- At the top, a segmented control (Full / Compact / Slim) that switches every widget at once. Next to it, a
  "side by side" view that shows the three sizes of each widget next to each other.
- Widgets, using the real glass look, Hebrew RTL items and real MDI icons:
  - Tile (on, with a brightness fill) and Tile (off)
  - Pill
  - Chips row
  - Heading (with a badge and a chevron)
  - Title
  - Media player
  - Climate (the dial and the mode row)
  - Nav
  - Pop-up sheet header
- Each widget shows its measured height, plus the HA grid rows it would take in sections.
- Proposed values:

| Widget | Full (today) | Compact | Slim |
|---|---|---|---|
| Tile | 2 rows, 16px pad, 44px icon, 16px name | 2 rows, 12px pad, 38px icon, 15px name | 1 row, horizontal: 36px icon, name + state |
| Pill | 56px (1 row), 44px icon | 1 row, 38px icon, tighter gap | 1 row, 32px icon, 14px name |
| Chips | 7px pad, 22px icon, two-line | 5px pad, 20px icon | one line ("label value"), 18px icon, about 32px tall |
| Heading | 30px icon box, 19px title | 26px, 17px | 22px, 15px, smaller badges |
| Title | 26–36px | 22–30px | 18–24px, subtitle 13px |
| Media | 4 rows, 64px art, 60px play | 3 rows, 52px art, 48px play | 2 rows: art, title and play/pause on one line, then progress |
| Climate | 8 rows, 240px dial | 7 rows, 200px dial | 5 rows, 160px dial, modes as small chips |
| Nav | as v0.10.2 | the same | icon-only, labels hidden on inactive items |
| Sheet header | 22px title, 40px buttons | 19px, 36px | 17px, 32px |

## Step 2: after the user picks or adjusts values
- `src/core/types.ts`: `size?: "full" | "compact" | "slim"` on `BaseCardConfig`.
- `src/core/base-card.ts`: `resolveSize(config, host)`. The card config wins, then the HA theme variable
  `--glide-size`, then `full`. This mirrors `resolveTapEffect` in `src/core/tap-fx.ts`. Reflect it as a host
  attribute `size="…"` beside `tap-fx`.
- Each card: `:host([size="compact"])` / `:host([size="slim"])` style overrides in its `static styles`. Each card's
  `getGridOptions()` / `getCardSize()` reads the size (tile 2→1 row when slim, media 4→3→2, climate 8→7→5). Slim
  tile and slim media get their small layout change in `render()`.
- Sheet: children inherit `size` the same way they inherit `tap_animation` (`src/cards/sheet.ts:76`).
- Editor: a "Size" dropdown next to the tap animation one (`src/editor/editor.ts`), plus the base keys passed through
  at line 211.
- README: document `size` and `glide-size`. Add tests for `resolveSize` and the grid options per size.

## Verification
- Mockup: the user checks it on the phone and picks or adjusts values.
- Implementation: `npm test`, `npm run build`. In the playground, try each size in Hebrew at phone width.
- On HA: set `glide-size: slim` in the theme, and check that a sections dashboard reflows with no gaps and no
  clipped text.

## Status
- [x] Mockup published: https://claude.ai/artifact/GHWusTFM3pLbuU9v7pt15Y
- [x] Values agreed: all three levels on every widget, as mocked
- [x] Implemented, tested, published (v0.11.0)

Project copy: `Plans/card-sizes.md`.
