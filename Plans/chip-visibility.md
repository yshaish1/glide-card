# chip-visibility

## Goal
Let a single chip in a chips card show or hide on conditions, so the HA dashboard can show a "כניסת שבת" / "יציאת שבת" chip only around Shabbat.

## Context / Constraints
- Same format as HA card `visibility`, evaluated in the browser: state (state / state_not), numeric_state (above / below), and, or.
- Hidden chips are not rendered; gestures rebind when the visible set changes.
- Requested from the ha repo (Plans/shabbat-chip.md there).

## Steps
- [x] src/core/conditions.ts + ChipConfig.visibility
- [x] chips.ts: render only the visible chips, watch condition entities, rebind gestures
- [x] test/conditions.test.ts, README section
- [x] v0.10.0 build, commit, tag, release

## Status
Done 2026-10-09.

## Open questions
- No visual editor field for chip visibility yet (YAML only).
