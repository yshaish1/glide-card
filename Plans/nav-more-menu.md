# Nav "More" menu

## Goal
Tapping a nav item that has its own `items` list opens a small glass menu above it, instead of a full-screen pop-up.

## Context / Constraints
- `nav` has `overflow: hidden` and `backdrop-filter`, so the menu is rendered as a sibling of `<nav>` (fixed position), not inside it.
- Items without `items` behave exactly as before.
- Release as v0.15.0 (feature).

## Steps
- [x] Types: `NavItem.items?: NavMenuItem[]`, `navigation_path` optional when `items` is set
- [x] nav.ts: menu render, positioning (LTR/RTL), spring open, close on outside tap / Escape / route change / resize
- [x] Active state: menu button is active when the route matches a child; dot when a child entity is on
- [x] Editor: nested `items` field
- [x] Tests in test/nav.test.ts
- [x] Playground: a "More" item; check in browser (LTR + RTL, phone width)
- [x] Docs, version bump, commit, push, release

## Status
Done.

## Open questions
- None.
