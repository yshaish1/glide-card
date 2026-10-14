# README refresh for v0.16

## Goal
Put a GIF of every cover style moving right at the top of the README (seen on GitHub and on the HACS page), describe the latest features, and regenerate every screenshot so it matches the current build.

## Context / Constraints
- HACS renders the README outside GitHub: markdown images only, with absolute raw URLs (v0.14.2 / v0.14.3).
- The top GIF shows all 8 styles moving together, in Liquid Glass dark, right after the tagline (before the hero image and the HACS button).
- Refresh: covers still (all styles), nav with the More menu open, hero images (new cover style plus a More item), and re-run everything else.
- `.phone` in shots.html has a transform, so the fixed nav menu was placed using the wrong coordinates. Fix that in the card: measure where the menu actually lands and shift it. That also makes it work in any transformed container.

## Steps
- [x] nav.ts: correct the menu position against its real containing block
- [x] shots.ts: 8 style entities, `gif-styles` composition (4 × 2), `moveCover` hook (opening/closing states, so the smooth glide shows), `openMenus` hook
- [x] shots.ts: covers / covers-night show all 8 styles; the hero dashboard uses a Venetian tile and a More menu in the nav
- [x] screenshots.mjs: `cover-styles` GIF; the nav shot opens the menus before capture
- [x] `npm run shots`, then review every image
- [x] README: top GIF, What's new (v0.15–v0.16), features (8 styles, smooth motion, More menu), example dashboard nav
- [x] docs/cards/cover.md: styles GIF/still; nav.md: menu screenshot
- [x] Tests, build, commit, push (docs only plus a nav fix → v0.16.1 release)

## Status
Done (v0.16.1).

## Open questions
- None.
