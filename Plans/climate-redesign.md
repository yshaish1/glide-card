# Climate card: match the Material mockup layout (v0.4.0)

## Context
The user compared the climate card on their HA with the design mockup (`design/c-material-you.png`, "Climate Control") and wants it refined to match.
- Their HA cards use the default Glass theme in light mode (on top of HA's macaron_theme), for example `climate.l7_016` with 6 hvac modes.
- Decision (asked): the new layout goes into **all themes**. Each theme keeps its own colors and fonts, and `theme: material` gives the exact mockup look.
- v0.3.1 (nav fix) is committed but not pushed, so this becomes v0.4.0 and both ship together.

## Differences to close (design vs actual)
1. **Header**:
   - icon: change from a circle to a rounded square (12px radius), tinted with the mode color
   - subtitle in the mode color, always informative: "Heating to 21.5°" while heating; "Idle · 25°" instead of just "idle"; "Off" when off
   - status chip at the end, filled and tinted with a dot, "ACTIVE" / "פעיל", shown when hvac_action is heating/cooling/drying/fan
2. **Accent strip**:
   - a 4px gradient bar along the card's top edge, from the theme accent to the mode color, mirrored in RTL and dimmed when off
   - the card gets `position: relative; overflow: hidden` so the strip follows the corner radius
3. **Dial**:
   - the value arc becomes a gradient: a lighter tint at the start, full mode color at the knob, via an SVG `linearGradient` with `stop-color: var(--mode)`
   - the track gets a soft neutral tint, and the base glow is removed (the Glass theme keeps a subtle glow through its theme styles)
4. **Readout**:
   - large number with a small mode-colored °
   - label "TARGET TEMP" / "יעד": uppercase, letter-spaced, meta font
   - current temperature in a rounded pill: "Current 22.0°" / "נוכחי 25.8°"
5. **Steppers**:
   - larger round −/+ buttons (52px) on a soft tinted background, not white
   - the center label becomes "Step: 0.5°" / "צעד: 0.5°"
6. **Divider**: a visible hairline above the modes, `color-mix(text 10%)`. `--gc-border` is transparent in some themes, which is why it was missing.
7. **Modes**:
   - always one row of equal tiles (`grid-auto-flow: column; grid-auto-columns: 1fr`): rounded squares (16px), soft tinted background, icon over label
   - active tile: mode-tinted background, border and text, as in the mockup's "Heat"
   - all of the entity's modes are kept (6 for the user's AC)
   - auto icon changes to `mdi:alpha-a-circle-outline`, as in the design

## Files
- `src/cards/climate.ts`: markup and styles for everything above. Keep the existing behaviour: the dial drag math (`polar`/`arc`/`onDial`), `setTarget` debounce, and `modeColor`.
- `src/core/i18n.ts`: add the keys `active`, `step`, `target_temp`, and "Heating to" phrasing if missing (en + he).
- `src/themes/glass/index.ts`: add a subtle `climate` glow on `.value` so Glass keeps its character.
- `src/themes/material/index.ts`: check the existing `climate` override (`.round, .modes button` use `--gc-surface-on`) still fits.
- `package.json`, `src/glide-card.ts`: bump to 0.4.0.
- README: one-line changelog note.

## Steps
- [x] Copy this plan to `Plans/climate-redesign.md`
- [x] Header (square icon, subtitle, status chip) + accent strip
- [x] Dial gradient + readout (° color, label, current pill)
- [x] Steppers + divider + single-row modes
- [x] i18n keys, Glass glow, version bump
- [x] `npm test` + `npm run build`
- [x] Playground check (Chrome):
  - side-by-side with the mockup
  - Glass/Bubble/Material × light/dark × en/he
  - heat/cool/off/idle states, 4 and 6 modes, phone + desktop widths
- [x] Commit v0.4.0; ask before push/release (ships together with the v0.3.1 nav fix)

## Status
Done in v0.4.0 (2026-10-09), committed; push/release awaits the user's OK (ships with v0.3.1 nav fix).
- Checked in the playground: Material light en vs mockup, Glass light he with 6 modes (as on the user's dashboard), Glass dark, Bubble dark, off state
- Extra fix: temperatures are wrapped in LTR isolates so "°" stays after the number in Hebrew
- No changelog in the README, so the notes go in the GitHub release

## Verification
- Playground screenshots of the Material theme (light, English, heating) match the mockup element by element: strip, header, chip, arc gradient, readout, step row, divider, mode tiles
- In Glass (light, Hebrew) with 6 modes, as on the user's dashboard: modes fit on one row at phone width, RTL is mirrored correctly, and the dial drag still works
- Tests and build are green. After release, the user checks their real dashboard.
