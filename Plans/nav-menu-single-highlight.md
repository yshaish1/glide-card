# Nav menu: no double highlight

## Context
v0.15.0 marks a menu item (e.g. "More") as active whenever the current page is one of its entries. In the user's dashboard, the "תפריט" menu lists every page, including the 13 already in the bar. So the menu button is highlighted on every page, next to the real page's item. That gives two highlights and two `.ind` elements, which also confuses the sliding indicator, since `indRect()` picks the first one.

Goal: the menu button is active only when the current page is in the menu and **not** already shown in the bar. Rows inside the menu still mark the current page either way.

## Change: `src/cards/nav.ts`
- `isCurrent(item)`, for an item with `items`:
  - Active only when no plain bar item (one without `items`) matches `isCurrentPath(...)`, and one of its entries does match.
  - Reuse the existing module-level `isCurrentPath`.
- Plain items stay unchanged. The menu rows (`menuItem`) still use `isCurrentPath` directly, so the current page stays highlighted in the open menu.
- Dot behavior stays unchanged.

## Tests: `test/nav.test.ts` ("nav menu" block)
- The menu repeats a bar page (`/d/main`). On `/d/main`, only "main" is active, there's exactly one `.ind`, and the menu button isn't active. Opening the menu shows the "main" row as `active`.
- A page only in the menu: the menu button is active (the existing test already covers this, so it should keep passing).

## Verify
- `npx tsc --noEmit`, `npx vitest run`, `npm run build`.
- In the playground in Chrome: add a duplicated bar page to the playground's More menu. Check that on that page only the bar item is highlighted, and that a menu-only page highlights More.

## Release
- Save the plan to `Plans/nav-menu-single-highlight.md`.
- Bump to **v0.15.2** (`package.json`, `src/glide-card.ts`).
- Commit in the repo style (no Claude trailers), push, tag, and `gh release create`.
- Note in the docs (`docs/cards/nav.md`, the `items[].items` row) that the menu button is highlighted only for pages that aren't already in the bar.

## Status
Done (v0.15.2). 77 tests pass; checked in the playground (bar page: only its item lit, menu-only page: only More, one indicator each).
