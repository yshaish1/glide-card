# Section heading card + tile cleanup (v0.3.0)

## Goal
Restyle the section titles above card groups (currently HA `heading` cards like "תריסים" and "כיבוי לפי אזורים") with a Glide design, and remove the duplicated state text on tiles.

## Context / Constraints
- From the user's screenshot (2026-10-08): plain heading text, and tiles showing "כבוי" twice (badge + meta), including on scripts/scenes
- Must work in all 3 themes and in RTL
- Another session sometimes commits here, so check git state before committing

## Steps
- [x] `card_type: heading`:
  - title, optional icon (small accent bubble) and subtitle
  - optional trailing mini badges (entities, same value formatting as chips)
  - optional tap_action shown as a chevron
  - `style: title | subtitle` size variants
- [x] Button tiles:
  - the badge shows the state
  - the meta line shows only extra info (slider %, otherwise nothing)
  - no state badge for scene/script/button entities
- [x] Editor schema, playground examples, README, tests, build
- [x] Commit v0.3.0 and ask before push/release

## Status
Done in v0.3.0 (2026-10-08). Also: Hebrew/Arabic meta text uses the body font (mono letter-spacing broke Hebrew)

## Open questions
- None
