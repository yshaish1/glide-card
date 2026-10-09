# Popup "עוד" not opening after navigation + page stuck without scroll

## Context
After moving between views, tapping the nav's "עוד" item (a `#hash` popup) sometimes does nothing,
and the page then can't scroll until refresh.

## Root cause (from code)
The sheet registry in `src/cards/sheet.ts` keys sheets by hash only, and it has no record of
which popup cards registered each sheet. HA gives each view its own copy of the cards, so the
same `#more` popup card exists on several views.

1. On navigation, the old view's `GlidePopup` detaches. `src/cards/popup.ts:37` schedules
   `unregisterPopup(hash)` after 1s if it's still detached. The new view's popup card has
   already registered the same hash and reused the same `<glide-sheet>`, so that timer removes
   the sheet the new view depends on. Nothing re-registers it until a view rebuilds, so "עוד"
   does nothing.
2. If the sheet was open, or got opened inside that 1s window, `el.remove()` removes it while
   `open` is true. `lockScroll(false)` never runs, so `openCount` stays at 1 and
   `<html style="overflow:hidden">` sticks. That is the lost scrolling.
3. After that, `location.hash` can stay `#more`. `openPopup` returns early when the hash
   already matches (`src/core/actions.ts:11`), so later taps are no-ops even after the sheet
   comes back.

## Changes
1. **`src/cards/sheet.ts`: owner-counted registry.** Store `Map<hash, { el, owners: Set<object> }>`.
   - `registerPopup(config, owner)` adds the owner.
   - `unregisterPopup(hash, owner)` removes only that owner, and removes the sheet only when
     no owners are left.
2. **`src/cards/popup.ts`.** Pass `this` as the owner in `connectedCallback`, `setConfig` and the
   delayed unregister. Keep the 1s delay, since it still covers HA re-parenting.
3. **`src/cards/sheet.ts`: per-sheet scroll lock.** Add a `locked` flag so each sheet calls
   `lockScroll` at most once in each direction. Add a `disconnectedCallback` that releases the
   lock if it holds it, so removing an open sheet can't leave the page frozen.
4. **`src/core/actions.ts` `openPopup`.** When `location.hash` already equals the target, call
   `syncSheets` (re-dispatch `glide-hash`) instead of returning silently. A stale `#more` then
   still opens the sheet.
5. Bump the version to 0.6.1 (package.json and wherever the version is printed), and rebuild `dist/`.
6. Copy this plan to `Plans/popup-registry-fix.md` (project planning rule).

## Verification
- `npm run typecheck && npm test`. Add a test in `test/` (happy-dom): two owners register `#more`,
  one unregisters, and the sheet must still exist and open. Also open a sheet, remove it, and
  check that `documentElement.style.overflow` is `""`.
- `npm run build`, then manual check in the playground or HA: switch views several times and
  open "עוד" within 1s of switching. It must open every time, and scrolling must keep working
  after closing it.

## Status
- [x] Owner-counted sheet registry (sheet.ts, popup.ts)
- [x] Per-sheet scroll lock, released on disconnect; never taken by a detached sheet
- [x] openPopup re-syncs when the hash is already set
- [x] test/sheet.test.ts (3 cases), typecheck, build, v0.6.1
- [ ] Manual check in HA: switch views, tap "עוד" right after, confirm it opens and scroll works after closing
