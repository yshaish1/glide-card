# Selectable tap animations

## Context
The user tried the 16 tap animations on the comparison page (https://claude.ai/artifact/1znRLUavhvFLS6bdBE1F9a) and wants all of them in the card, with a choice per card. Their decisions:
- **Where the choice lives:** a per-card setting plus one dashboard-wide default.
- **Default:** Glass shine (#07).
- **Scope:** everything tappable (button tiles and pills, chips, heading badges and linked headings, nav bar items). The small climate and media buttons keep their current `:active` press.

Today a card only has a CSS `:active` scale (`src/cards/button.ts:140`, `chips.ts:111`) and does nothing after a quick tap.

## Config
- New option `tap_animation` on `BaseCardConfig` (`src/core/types.ts`). Values: `shine` (default), `press` (today's shrink only), `spring`, `ripple`, `glow`, `jelly`, `tilt`, `icon-pop`, `ring`, `deep-press`, `bloom`, `breathe`, `sparks`, `icon-flip`, `border-trace`, `nudge`, `badge-pop`, `none`.
- Which one applies: the card's `tap_animation`, else the HA theme variable `glide-tap-animation` (read as `--glide-tap-animation`, the same way `resolveThemeId` reads `--glide-theme` in `src/themes/registry.ts`), else `shine`. Unknown values fall back to `shine`.
- Pop-up children inherit the pop-up's `tap_animation`, as they already inherit `theme` (`src/cards/sheet.ts:75`).

## New module `src/core/tap-fx.ts`
- `TAP_EFFECTS` (id list + editor labels), `type TapEffect`, `resolveTapEffect(config, host)`.
- `playTap(el, effect, { x, y, color, icon?, badge? })` ports each effect from the comparison page using the Web Animations API (transform, opacity and box-shadow only):
  - Overlay effects (ripple, ring, bloom, shine, border-trace, sparks) draw into a temporary layer added inside `el` (`position:absolute; inset:0; overflow:hidden; border-radius:inherit; pointer-events:none`) and remove themselves when finished. If `el` is `position: static`, set it to relative. Sparks stay inside the card's own bounds, because `.surface` clips overflow.
  - `icon-pop`, `icon-flip`, `sparks` and `badge-pop` target `icon` / `badge` when they are passed. If not (e.g. nav items), fall back to a light press on the card.
  - Use `springEasing` from `src/core/spring.ts` where a spring is wanted.
- Do nothing when `reducedMotion()` (`src/core/spring.ts`) is true. Restarting while an effect is running cancels the previous one (keep the `Animation` objects on a WeakMap per element).
- `none` also turns off the `:active` shrink: set a `tap-fx` attribute on the host, plus `:host([tap-fx="none"]) …:active { transform: none }`.

## Wiring
- `src/core/gestures.ts`: `tap(point?: {x, y})` receives the pointerdown client coordinates. Keyboard taps pass none, so effects use the centre.
- `src/core/base-card.ts`: add `protected playTapFx(el, point?, parts?)`. It resolves the effect, converts the point to element-local coordinates, reads `--domain` / `--chip` / `--c` / `--gc-accent` for the colour, and calls `playTap`. Set the `tap-fx` host attribute in `applyTheme`.
- Call it from:
  - `src/cards/button.ts`: gesture `tap` and `doubleTap`, with `.icon` and `.badge`. Not on drag or hold.
  - `src/cards/chips.ts`: per-chip `tap`, with the chip's `ha-icon`.
  - `src/cards/heading.ts`: badge click and linked-row click (`e.clientX/Y`).
  - `src/cards/nav.ts`: item click, with its `ha-icon`.
- `src/editor/editor.ts`: append a shared field `{ name: "tap_animation", selector: { select: { mode: "dropdown", options } } }` to the schema of button, chips, heading and nav. Label: "Tap animation (empty = dashboard default)". Keep `tap_animation` in `setType`'s shared fields.

## Docs, tests, version
- README: options table row for `tap_animation`, the list of effect ids, and the dashboard-wide `glide-tap-animation: ripple` example next to `glide-theme`.
- Tests (`test/core.test.ts`, `test/gestures.test.ts`):
  - `resolveTapEffect` precedence and fallback.
  - `playTap` is a no-op under reduced motion and removes its overlay layer when done.
  - The gesture tap receives the pointer point.
- Playground: add a "Tap" select that sets `--glide-tap-animation` on the document, so the global path gets exercised.
- Version 0.7.0. Save this plan as `Plans/tap-animation.md`.

## Verification
- `npm run build` and `npm test`.
- Playground in Chrome, tablet width, Hebrew:
  - Tap a tile, chip, heading badge and nav item with the default (shine). Then switch the global select through several effects (ripple, sparks, tilt, border-trace, none) and screenshot or GIF a few.
  - Confirm that dragging a light slider and hold-to-drag on a cover do not trigger the effect.
  - Confirm that overlays are removed afterwards (no leftover nodes in the shadow root).
  - Confirm that `none` removes the press shrink.
  - Confirm that per-card `tap_animation` overrides the global value.
- Commit and publish only when the user asks.

## Status
Implemented, v0.7.0, not committed.
- [x] `src/core/tap-fx.ts` with all 16 effects + `none`, default `shine`
- [x] Wired into button, chips, heading (badges + linked row), nav; pop-up passes it on
- [x] Editor dropdown, README, playground "Tap" select
- [x] Tests: 32 passing (resolve order, reduced motion, layer cleanup, every effect runs, tap point)
- [x] Playground check: effects run and draw (ripple, sparks seen); layer sits above the fill, below icon/text
- [ ] Hands-on look on a real device (the test Chrome window was hidden, so frames were only partly checkable)
