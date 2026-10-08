# Chips + Page Title cards (v0.2.0)

## Goal
Add two simple header cards, based on the user's screenshots: a row of small info chips (icon, small label, value) for the top of a page, and a page title card (large title plus a subtitle).

## Context / Constraints
- Reference: the user's current dashboard uses HA `entity` cards as chips, e.g. "מזגנים דולקים 3", sunrise/sunset times and weather "לילה בהיר · 25.7 °C"
- Must support `color` (HA color names such as `light-green`), `icon`, `name`, and `tap_action` (navigate etc.), plus RTL
- Uses theme tokens only, so all 3 themes work
- Another session is committing nav fixes in parallel, so keep shared-file edits minimal

## Steps
- [x] `card_type: chips` with a `chips: [...]` list
  - each chip: entity, name, icon, color, attribute, tap/hold actions
  - smart values: weather = condition · temperature; timestamp sensors = local HH:mm; numbers include their unit
  - one row, centered when it fits, horizontal scroll with snap when it doesn't
- [x] `card_type: title` with title, subtitle, icon and align (center/start)
- [x] Register both types, add editor schemas, add them to the playground
- [x] Tests for value formatting; build; README
- [x] Commit as v0.2.0 (ask before push/release)

## Status
Done in v0.2.0 (2026-10-08): 15 tests green. Push/release awaiting the user's OK

## Open questions
- Templates in the subtitle (e.g. a greeting by time of day): later
