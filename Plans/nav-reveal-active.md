# Nav: always reveal the selected item

## Context
When the bottom nav has more items than fit (mostly on mobile), it scrolls sideways. After a tap, the selected item
should end up centred in the bar; if it can't be centred (it's near either end), the bar should scroll to that end so
the item is still fully visible. Today it sometimes stays off-screen or half-hidden.

`src/cards/nav.ts` already tries this: `updated()` centres `button.active` once per route via `scroller.scrollBy(...)`
(lines 118–126). It fails in these cases:

1. **No layout yet.** HA gives each view its own nav card. The new view's card often runs its first `updated()` before
   it has been laid out (`clientWidth === 0`), so the guard skips centring. Nothing triggers another update, so it
   never centres, and the scroll inherited from the old card (`handoff.scroll`) can leave the item off-screen. The same
   thing happens to a cached view that is re-attached before it's visible.
2. **The edge fade hides end items.** When an item can't be centred, the browser clamps the scroll so the item sits
   flush against the edge. That puts it under the 18px `mask-image` fade. On mobile, buttons have only 6px of
   padding, so part of the icon and label fades out.
3. **Stale `overflow` class.** The class is only toggled in `updated()`. If the bar is resized (rotation, the view
   becoming visible), the class doesn't change.

## Approach (single file: `src/cards/nav.ts`)
1. **Move centring into `private reveal(smooth: boolean)`.** It finds `.scroller` and `button.active`, and returns
   early if the scroller has no width yet. Otherwise it toggles the `overflow` class, does the current rect-delta
   `scrollBy` (which works the same in LTR and RTL; the browser clamps it at the ends, which gives "centre if
   possible, otherwise show it"), and sets `this.centred = route()`. `updated()` calls it under the existing
   condition (`this.centred !== now`).
2. **Retry when layout arrives.** Add a `ResizeObserver` on `.scroller`: create it in `firstUpdated`, re-observe in
   `connectedCallback` if it already exists, and disconnect it in `disconnectedCallback`. Guard it with
   `typeof ResizeObserver` for happy-dom. On resize it re-toggles `overflow`, and calls `reveal(false)` if
   `this.centred !== route()`. This means a card that was 0-wide at first update centres as soon as it gets a size,
   and the user's own scrolling is still never undone.
3. **Keep end items clear of the fade.** Add `padding-inline: 12px` to `.scroller.overflow`. The ends of the scroll
   range then leave room, so a first or last item that is clamped against the edge stays clear of most of the 18px
   fade. Decide whether the bar overflows by comparing against the width without that padding, so the class doesn't
   flip back and forth.
4. Don't change the `inherit`/handoff logic. It still sets the starting scroll so the slide continues smoothly, and
   then `reveal` corrects it.

## Plan persistence
On execution, also save this plan as `Plans/nav-reveal-active.md` (project rule).

## Verification
- `npm test`: the existing `test/nav.test.ts` must pass. Add a test that mounts the nav with `clientWidth` stubbed to
  0, then stubs it to a non-zero width with fake rects, triggers the observer callback (or calls `reveal`), and
  checks that `scrollBy` was called once for the route and not again after a later state update.
- `npm run typecheck && npm run build`.
- Manual (playground `npm run dev` or HA on a phone-width viewport): set up 8+ items. Tap a middle item: it centres.
  Tap the first and last items: the bar scrolls to that end and the item is fully visible, not faded. Switch views
  repeatedly: the new view's bar always shows the selected item. Rotate or resize: the overflow fade updates.

## Status
- [x] reveal() + ResizeObserver retry
- [x] Edge padding while overflowing
- [x] Test added; tests, typecheck, build pass
- [ ] Manual check on a phone-width dashboard
