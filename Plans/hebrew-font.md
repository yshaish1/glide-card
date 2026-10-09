# Hebrew font

## Goal
Use one consistent Hebrew typeface on Glide cards. Before this change, Hebrew fell back to the system font, so it looked different on every device.

## Context / Constraints
- Chosen font: **Rubik** (#2 on the comparison page).
- Bundled, not loaded from Google: the Hebrew subset is 9 KB (variable weight 300-900), works offline, no third-party request. SIL OFL 1.1.
- @font-face does not work inside shadow roots, so the face is registered once on the document.
- Registered as "Glide Hebrew" with a Hebrew-only unicode-range, so Latin text and digits keep each theme's font.

## Steps
- [x] Comparison page of 10 Hebrew fonts on mock glass cards
- [x] User picked Rubik
- [x] `src/assets/rubik-hebrew.woff2` + `src/core/fonts.ts` (`ensureFonts`, `withHebrew`)
- [x] `themeCss` prepends "Glide Hebrew" to `--gc-font` and `--gc-font-meta` (also covers third-party themes)
- [x] Test for the font stacks; build, typecheck, tests pass
- [x] Verified in playground (he locale): font loaded, Hebrew labels in Rubik, digits/Latin in Inter
- [x] Version 0.6.4

## Status
Done, not committed yet.

## Open questions
- None.
