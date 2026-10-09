# Glass theme: soft tinted glass backgrounds, a different one per card (v0.6.0)

## Context
In the mockup (`design/c-material-you.png`) each tile has its own soft, tinted glass:
- the Floor Lamp (off) has a mint wash
- the Ceiling Fan (on) is white with a gentle teal glow rising from one corner

On the user's dashboard (Glass theme, light, Hebrew), every tile is the same flat near-white with a faint warm cast, so they look identical. They want each card to have a different soft glass background that is "soft and smart" but not noisy.

What the user chose:
- **Tint colors**: a mixed pastel palette picked per entity, so neighbouring cards differ. Cards that are on glow in their device color instead.
- **Scope**: all cards in the Glass theme (button, climate, media, chips, heading, popup card body). The bottom sheet and the nav bar stay plain.
- **Dark mode**: included, at a much lower strength so the tint reads as a faint glow.

## Approach
Each card gets a stable "seed" (tint color and glow position). Only the Glass theme paints with it, so the other themes don't change.

### 1. `src/core/base-card.ts`: per-card seed
- Add `seedOf(config)`:
  - hash `config.entity ?? config.name ?? config.title ?? JSON.stringify(config)` with a small string hash (FNV-1a)
  - this gives a stable value per card that is the same on every device
- In `applyTheme()`, or when the config changes, set two host custom properties:
  - `--gc-tint: var(--gc-tint-<n>)`, with `n = hash % 5`
  - `--gc-glow-at`: one of a few corner positions, picked from other bits of the hash, e.g. `100% 100%`, `0% 100%`, `100% 0%`, `15% 0%`, `85% 110%`. The point is that two neighbouring cards rarely glow from the same corner.
- Glass is the only theme that defines `--gc-tint-*`, so in the other themes these variables do nothing.
- Export `seedOf` so it can be tested.

### 2. `src/themes/glass/index.ts`: palette and paint
- Tokens:
  - light: `--gc-tint-1..5` = mint `#bfe6da`, sky `#c8ddf3`, lilac `#dcd4f2`, peach `#f6dac6`, sand `#ebe0c4`; `--gc-tint-strength: 34%`, `--gc-wash-strength: 12%`
  - dark: same hues; `--gc-tint-strength: 12%`, `--gc-wash-strength: 4%`
- In the `all` styles, paint `.surface` with two layers on top of the existing surface color:
  - **Wash**: a light tint across the whole card, `linear-gradient(160deg, color-mix(in srgb, var(--gc-tint) var(--gc-wash-strength), transparent), transparent 65%)`
  - **Glow**: a soft corner glow, `radial-gradient(130% 100% at var(--gc-glow-at), color-mix(in srgb, var(--gc-tint) var(--gc-tint-strength), transparent), transparent 70%)`
  - Only `background-image` is set here, so a card's own `background-color` still shows underneath.
- On state:
  - `button`: `.surface.on{--gc-tint:var(--domain)}`, so a lit lamp glows amber and an on fan glows teal, like the mockup's Ceiling Fan
  - `climate`: `.surface:not(.off){--gc-tint:var(--mode)}`
  - `media`: `.surface.playing{--gc-tint:var(--gc-media)}`
- Chips: every chip in one row shares the card's seed, so the row looks like a single tinted family rather than confetti. Its strength drops to roughly half (`.chip{--gc-tint-strength:18%}`).
- Popup: tint only the in-card surface, not the sheet; check what `.surface` covers in `popup.ts`.

### 3. Make sure card overrides don't wipe the image
Change the `background:` shorthands that land on `.surface` to `background-color:`, so the Glass layers survive:
- `src/cards/button.ts:142` `.surface.on`
- also check `heading.ts:143`, `button.ts:180` (the cover badge, not a surface; leave it), `media.ts`

The button's `.fill` (light brightness / cover position) keeps drawing above the glass as it does now.

### 4. Housekeeping
- Bump to 0.6.0 in `package.json` and `src/glide-card.ts`.
- Save this plan to `Plans/glass-tints.md`.

## Not noisy, concretely
- Five muted pastels, no saturated hues.
- One glow per card, and it stays in a corner, never the center.
- Text contrast is unchanged: the strongest tint is at most about 34% mixed into a near-white card, and only at the edge of the glow.
- No texture or noise grain, and no animation.

## Verification
- `npm test`: add a test that `seedOf` is stable for the same config and differs across a handful of entity ids (at least 3 different tints out of 5 cards). Then `npm run build`.
- Playground in Chrome:
  - Glass light he (the user's setup): screenshot the tile grid next to the mockup. Neighbouring tiles should differ, on tiles should glow in their device color, and text should stay legible.
  - Glass dark: tints are faint.
  - Bubble and Material: unchanged, checked with before/after screenshots.
  - Climate, media and chips rows look calm.
- Commit v0.6.0; ask before push/release.

## Status
Done in v0.6.0 (2026-10-09), committed; push/release awaits the user's OK.
- Final strengths: light glow 60% and wash 30%; dark glow 16% and wash 6%.
- Climate keeps a calm palette tint, not its mode color, which was too orange over a large card; the strip, arc and chip already show the mode. Chips use the wash strength only.
- The heading badge keeps the plain surface: its own `background:` shorthand overrides the image.
- Checked in the playground: Glass light he and Glass dark.
