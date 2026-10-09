# Nav bar: indicator lands on the wrong item (RTL / view switching), v0.3.1

## Context
The user reports that the bottom nav's highlight sometimes slides to, or stays on, the wrong item while switching between many items, and suspects RTL.

Findings:
- **HA view cache:** reproduced in the playground. Each HA view has its own nav card and HA re-attaches cached views. A cached nav comes back showing a stale item (Home showed "Kitchen", Kitchen showed "Kids"). It missed route events while detached, and the render guard skips unrelated `hass` updates.
- **RTL coordinates:** the indicator is a single absolutely positioned element in the RTL scroll container. It's placed with `left: 0` + `translateX(a.left - s.left + scrollLeft)`. That math depends on how the engine anchors `left: 0` and signs `scrollLeft` in RTL scrollers.
  - Chrome gets it right (tested LTR/RTL, wide and scrolling, 14 Hebrew items, rapid taps, frame-sampled).
  - The HA iOS app and Safari tablets run WebKit, which has historically differed there, and the error grows with the scroll overflow. That matches "sometimes another element".
- Measuring while the view is hidden (rects = 0) and resize/rotation can also leave it misplaced.

## Approach: indicator lives inside the active button (FLIP)
All changes are in `src/cards/nav.ts`.
- Delete the shared `.indicator` and its scroll-coordinate math. The active button renders its own `<span class="ind">` (absolute, `inset 0`, accent fill + border).
  - The button gets `isolation: isolate` and the ind `z-index: -1`, so the icon and label stay on top.
  - Pinned items use the same ind, so the separate `.pinned button.active` style goes.
- Effect: the resting position is always exactly the active button, in any direction, engine, scroll offset or size. No measuring is needed to be correct.
- Slide animation (FLIP, viewport rects only, direction-agnostic):
  - In `willUpdate`, store the current `.ind` `getBoundingClientRect()` (it includes in-flight transforms, so rapid taps retarget smoothly).
  - In `updated()`, if there is a stored rect, both rects are non-zero and the item changed, run `ind.animate()` on the new ind:
    - from `{transform: translateX(prev.left - new.left), width: prev.width px}`
    - to `{transform: none, width: 100%}`
    - ind anchored with physical `left: 0`, so `translateX` maps directly
    - spring easing from `src/core/spring.ts` (`springEasing`), skipped under `reducedMotion()`
- Cached views: track the last rendered route. In `connectedCallback`, if it differs from `location`, `requestUpdate()` with "no animation" (jump), so a re-attached nav just shows the right item.
- Keep the existing "centre the active item once per route" scroll logic, which uses rect deltas only and works the same in RTL.

## Steps
- [x] Copy this plan to `Plans/nav-indicator-fix.md` in the repo
- [x] Implement the in-button indicator + FLIP + reconnect refresh in `nav.ts`
- [x] Vitest:
  - a re-attached nav after a route change marks the right `button.active` and contains `.ind`
  - only one `.ind` exists
- [x] `npm test` + `npm run build`
- [x] Browser tests on the playground (Chrome):
  - 14 Hebrew items, RTL + LTR, wide + scrolling, rapid taps, frame-sampled
  - per-view cached navs simulation
  - check: the end item always equals the route, and the path only crosses items between start and target
- [x] WebKit test:
  - install Playwright's WebKit build into its cache (`npx playwright@1.62.1 install webkit`, a one-time download of about 70MB)
  - run the same RTL script headless from the scratchpad, against both the old build (to confirm the bug) and the new one
- [x] Bump to 0.3.1 (package.json, `VERSION`), commit; ask before push/release

## Status
Done in v0.3.1 (2026-10-09), committed; push/release awaits the user's OK.
- Reproduced live on the user's dashboard (16 sections views, each with its own nav). Kitchen to Home showed "סלון"; Office to Kitchen showed "ראשי".
- WebKit and Chrome both got the old RTL math right, so RTL itself was not the cause; cached views were.
- Also added a handoff of the indicator position and scroll, so the slide continues across views.
- Results: WebKit + Chromium cached-views and RTL/LTR scripts clean, 17 tests green.

## Verification
- The Chrome and WebKit scripts report the correct end item and no stray detours in RTL and LTR
- The cached-views simulation shows the right item on every switch
- Tests and build are green; the user retests on the phone after updating via HACS
