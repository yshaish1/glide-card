# Glide Card - a better Bubble Card for Home Assistant

## Context
The user wants their own take on Bubble Card (HA custom Lovelace card). Bubble Card's pain points: config is YAML/CSS-heavy, pop-ups are hash-routed vertical-stack hacks, animations are basic, theming is inconsistent, and it gets slow on wall tablets. The goal is a separate project (not tied to SmartAssistantBuilder), personal-first and later released publicly on HACS. Focus areas: visual design + animation, an easy visual editor, real pop-up sheets, and tablet performance.

Working name: **Glide Card** (`custom:glide-card`). Check that the name is free on GitHub/HACS before scaffolding, and fall back to "Lumen Card" if it's taken.

## Decisions (from interview)
- Separate project at `Projects/glide-card/`
- One JS bundle with many types: `type: custom:glide-card` + `card_type: button | popup | nav | climate | media`
- MVP card types: button/tile + slider, pop-up sheet, horizontal nav bar, climate, and media
- Platforms: iPhone + Android HA app, wall tablet, desktop browser
- Hebrew + English with full RTL mirroring (sliders, nav, sheets)
- Supports both sections view (`getGridOptions`) and masonry/panel (`getCardSize`)
- Pop-ups: bottom sheet on phones (drag-to-dismiss, back-gesture aware) and a centered glass modal on wide screens
- Gestures: tap = toggle, long-press = sheet, swipe on a tile to dim or set position, haptics through the HA `haptic` event, and a morph animation from tile to sheet
- Visual editor: full ha-form editor with entity pickers, style presets and live preview
- Design: ALL three Stitch directions ship as themes - `glass` (default), `bubble`, `material` (mockups in `design/`)
- Theme system (pluggable, versioned):
  - Each theme = one folder `src/themes/<id>/` exporting a `GlideTheme` object: `id`, `name`, `version`, `tokens` (dark + light CSS vars), optional `styles` (extra CSS per card type), optional `layout` hints (e.g. bubble = full-width pill rows, glass = 2-col tiles)
  - Cards ONLY consume semantic tokens (`--gc-surface`, `--gc-accent`, `--gc-radius`, `--gc-blur`, `--gc-font`...) - never theme-specific values
  - Registry `src/themes/index.ts` auto-loads themes; adding a new design = add a folder + one register line, zero card changes
  - Selection: global default per dashboard (via a `custom:glide-card` `card_type: theme` config or nav card), per-card `theme:` override, and a theme picker with live previews in the visual editor
  - Third-party themes possible later via `window.glideCardThemes.register()`
- Dev: a local Vite playground with a mock `hass` object, then testing against the user's real HA
- Bubble YAML import: after the MVP

## Tech stack
- Lit 3 + TypeScript and Vite in library mode, building to a single `glide-card.js`
- No CSS-in-YAML. Theming uses CSS custom properties derived from HA theme tokens, with a per-card `accent` and `preset`
- Animations use Web Animations API + FLIP for the morph, plus a small spring helper, with no heavy libraries
- Performance:
  - Re-render only when the tracked entities change (`shouldUpdate` diffs `hass.states` for the card's own entities)
  - Lazy-render sheet content
  - Animate `transform`/`opacity` only
  - Fall back from `backdrop-filter` blur on low-end devices (a `prefers-reduced-transparency` + perf flag)
- Pop-up architecture: one global sheet host appended to `document.body`, so it escapes stack and z-index issues. The URL hash provides deep links and back-button support, and the host renders a card list defined in the popup's config
- Verify the current Lit, Vite and HA frontend APIs (`getGridOptions`, ha-form selectors) with Context7 before coding

## Steps
1. [x] Create `Projects/glide-card/` and copy this plan to `Plans/glide-card.md`, then confirm the name is available
2. [x] Design: Stitch mockups for 3 directions; user chose to ship all three as switchable themes
3. [x] Scaffold: Vite + Lit + TS, ESLint, Vitest, a mock-hass playground with fake entities, and `hacs.json`
4. [x] Core:
   - base card class
   - theme registry + semantic token contract + glass/bubble/material themes
   - action handler (tap/hold/double-tap)
   - haptics
   - i18n (he/en) + RTL utilities
   - entity-diff render guard
5. [x] Button/tile card covering toggle, slider, swipe-to-dim, and state icons/colors per domain
6. [x] Pop-up sheet:
   - global host
   - bottom sheet vs modal
   - drag-to-dismiss
   - hash deep links and back button
   - FLIP morph from tile to sheet
7. [x] Horizontal nav bar: a floating pill with room/page links and an active indicator
8. [x] Climate card (dial + modes) and media card (artwork, controls, volume)
9. [x] Visual editor for each card type with presets and live preview
10. [~] Performance pass (render guard verified: 60 cards x 200 unrelated updates = 0 renders; lite mode added; real-tablet profiling pending): test with 50+ cards on a tablet and Lighthouse-style profiling, with a blur fallback
11. [ ] Test on real HA (copy to `/config/www`, add as a resource) across iPhone, Android, tablet and desktop
12. [ ] Later: Bubble YAML importer, README/docs, GitHub release, and HACS submission

## Verification
- `npm run build` must succeed after every phase (the user's check-build rule)
- `npm test`: Vitest unit tests for action handling, entity diffing and the config schema
- Playground: `npm run dev` and look at every card type in dark, light and RTL at both phone and desktop widths
- Real HA: load the bundle as a dashboard resource, then check sections and masonry views, the iOS/Android app (haptics, back gesture) and the wall tablet (smoothness)
- After each phase, write a 2-sentence summary of what changed and how to see it

## Open questions
- ~~Final name~~ - confirmed "Glide Card" (no HA/HACS conflict, 2026-10-08)
- ~~Design direction~~ - all three, as pluggable themes

## Status (2026-10-08)
- Steps 1-9 done. All 5 card types, 3 themes, editor, playground, 9 unit tests green, build 24 KB gzip
- Step 10 partly done; step 11 (real HA) needs the user's HA access
- Popup `cards` are edited as YAML inside the visual editor (no nested visual card editor yet)

## To verify on real HA
- `card-visibility-changed` / hiding of the popup placeholder in sections view
- Event forwarding from sheet children (more-info, hass-action) to the `home-assistant` root
- `object` selector with `fields` for nav items (needs a recent HA)
- Haptics in the iOS/Android companion apps; back gesture closing the sheet
