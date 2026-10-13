# README, docs and screenshots refresh

## Goal
New screenshots, GIFs and a README laid out like the top HACS cards (Mushroom, Bubble Card), so new users quickly see what Glide Card looks like and how to install and set it up.

## Context / Constraints
- What the user chose:
  - media: a hero image with 3 themes side by side, per-card screenshots, animated GIFs, and light + dark pairs
  - demo data: English with neutral names (no personal data), plus one Hebrew RTL shot
  - layout: a short README, with full docs per card in `docs/`
  - publishing: push only, no release (HACS renders the README from the repo)
- Patterns taken from Mushroom and Bubble Card:
  - badges (HACS, release, downloads, license) and an "Open in HACS" My Home Assistant button
  - a hero image, a feature list, and install steps in collapsible `<details>` (HACS recommended, manual fallback, cache tip)
  - a card gallery with links to `docs/cards/*.md`
  - GitHub `> [!TIP]` callouts
  - each card page follows the same template: image, short intro, options table, YAML examples
- Screenshots must be reproducible: a `playground/shots.html` page plus `scripts/screenshots.mjs` (Playwright with a Vite dev server, ffmpeg for the GIFs).

## Steps
- [x] `playground/shots.html` + `shots.ts`: English demo states, and compositions picked by `?shot=` (phone panels side by side; `transform` on each panel holds the fixed nav and sheet inside it)
- [x] `scripts/screenshots.mjs`: writes PNGs to `docs/images/`, and GIFs from frame captures through ffmpeg
- [x] Images:
  - `hero-dark`, `hero-light` (Glass, Bubble, Material phones)
  - per card: button, covers, climate, media, chips, heading/title, nav, popup, sizes (dark | light pair each)
  - `rtl`
- [x] GIFs: cover drag (blind + curtain), pop-up opening, tap animations
- [x] `docs/cards/*.md`: button, cover, popup, nav, climate, media, chips, heading; `docs/options.md`, `docs/themes.md`
- [x] README rewrite
- [x] Remove the old `design/*.png` from the README (keep the files; they're the mockups)
- [x] Commit, push

## Status
Done (2026-10-13):
- 13 PNGs and 3 GIFs are in `docs/images/`, made with `npm run shots`.
- The docs are in `docs/cards/`, `docs/options.md` and `docs/themes.md`, and the README is rewritten.
- Follow-up: a slim cover tile wraps its meta line ("40% / Open"). The sizes shot uses a lamp for now.

## Open questions
- None.
