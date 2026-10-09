# Glass dark on a light dashboard

## Goal
Liquid Glass in dark mode is unreadable on a light dashboard: its surface is 6% white, so a light page shows through and the near-white text and icons disappear.

## Context / Constraints
- Only glass uses translucent white for dark surfaces; bubble and material use solid dark colours.
- Keep the dark-on-dark look about the same.

## Steps
- [x] Dark glass surfaces get a dark smoky base (`--gc-surface`, `--gc-surface-on`) so they stay dark over any page
- [x] Playground: compare dark cards on a dark page and on a light page, before/after
- [x] Build, tests, v0.7.1

## Status
Done and verified in the playground (near-white page and dark wallpaper). Not committed.

## Open questions
- None.
