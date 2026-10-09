# Random tap animation

## Context
The user wants a "random" tap animation: each tap plays a different effect. Their decisions:
- **Which effects:** only effects that suit the widget. Skip `press` and `none`; skip icon-only effects (icon-pop, icon-flip) when the element has no icon, and badge-pop when it has no badge.
- **Repeats:** never the same effect twice in a row on the same element.
- **Where:** `random` works per card (`tap_animation: random`, editor dropdown) and dashboard-wide (`glide-tap-animation: random` in the HA theme).

Cost: the effect is already looked up on every tap (`playTapFx` → `resolveTapEffect`), so picking one at random adds nothing measurable.

## Changes
- `src/core/tap-fx.ts`
  - Add `random: "Random (different each tap)"` to `TAP_EFFECTS` (placed after `shine`). `TapEffect` now includes `random`, and `resolveTapEffect` accepts it with no change.
  - Add `pickRandomEffect(el, ctx)`:
    - Pool: all effects except `random`, `press` and `none`.
    - Drop `icon-pop` and `icon-flip` without `ctx.icon`. Drop `badge-pop` without `ctx.badge`.
    - Exclude the previous pick for this element, tracked in a `WeakMap<Element, TapEffect>`.
  - In `playTap`, if `effect === "random"`, replace it with `pickRandomEffect(el, ctx)` before the switch. Reduced motion still returns early.
  - `sparks` works without an icon (it centres on the tap point), so it stays in the pool.
- `src/core/base-card.ts`: no change; `playTapFx` passes `random` through to `playTap`.
- `src/editor/editor.ts`: no change; the dropdown is built from `TAP_EFFECTS`, so it picks up the new entry.
- README: add `random` to the effect list, and note that it skips effects the widget can't show and never repeats one back-to-back.
- `test/tap-fx.test.ts`:
  - `random` resolves from the config and from the CSS var.
  - The pick is never `press`, `none` or `random`.
  - No icon effects without an icon; no badge-pop without a badge.
  - The same element never gets the same effect twice in a row (run about 50 taps).
- Playground: the "Tap" select lists `random` automatically if it is built from `TAP_EFFECTS`; otherwise add it.
- Version 0.9.0. Save this plan as `Plans/random-tap-animation.md`.

## Verification
- `npm run build` and `npm test`.
- Playground: set Tap = random, tap a tile, a chip and a nav item several times. Log the chosen effect, or check that a varied overlay or animation runs each time, with no back-to-back repeats.
- Commit and publish only when the user asks.

## Status
Implemented, v0.9.0, not committed.
- [x] `random` in TAP_EFFECTS, `pickRandomEffect` (fitting pool, no back-to-back repeat), wired in `playTap`
- [x] README, tests (42 passing), build
- [x] Playground: Tap = random plays an animation on every tap
