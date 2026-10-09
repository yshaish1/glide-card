# popup-ha-context

## Goal
Tile features inside a glide pop-up (e.g. "מהירות מאוורר" climate-fan-modes in the bedroom room pop-ups) rendered empty.

## Context / Constraints
- HA 2026.10 frontend hands entity state to card features via Lit context (`_stateObj` comes from a context consumer).
- Sheets were appended to document.body, outside <home-assistant>, so the context request never reached a provider: `_stateObj` stayed undefined and the feature rendered null (0x0).
- Light-DOM children of <home-assistant> are not rendered (no slot), so the sheet goes in its shadow root.

## Steps
- [x] Mount sheets in `document.querySelector("home-assistant").shadowRoot` (fallback document.body)
- [x] Test in test/sheet.test.ts
- [x] Verified in Chrome by moving the live sheets: fan modes render 542x42 in #room-parents
- [x] v0.10.1 release, HACS install

## Status
Done 2026-10-09.

## Open questions
- None.
