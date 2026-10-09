# Climate card: room-temperature dot on the dial ring

## Context
The ring shows only the set temperature: the coloured arc runs from the start to the knob. The
user wants to see the room temperature on the ring too. Agreed with the user:
- **On:** the coloured arc and knob stay at the set temperature (as in their screenshot). A
  **small dot** on the ring marks the current room temperature (Nest / HA thermostat style).
- **Off:** everything stays grey and locked, as built in the previous change, including the
  room dot.

## Changes (`src/cards/climate.ts`)
1. In `render()`, read `a.current_temperature`. When it's a number, compute
   `cpct = clamp((current - min) / (max - min), 0, 1)` and `[cx, cy] = polar(START + cpct * SWEEP)`.
2. Draw `<circle class="room" cx cy r="4">` in the svg after the value arc and **before the knob**,
   so the knob covers it when the two temperatures match. Draw it even without a target and even
   when off.
3. CSS:
   - `.room { fill: var(--gc-text); stroke: var(--gc-sheet-bg, #000); stroke-width: 2; pointer-events: none; }`
     A thin outline keeps it readable on both the grey track and the coloured arc.
   - `svg.off .room { fill: var(--gc-text-dim); }`
   - Short transition on `cx`/`cy`, so it glides when the room temperature updates.
4. Accessibility: add `aria-valuetext` to the slider, giving the set temperature plus the current
   temperature.
5. Version 0.6.3 is already bumped (uncommitted, with the off-state change). Keep 0.6.3, since
   both changes ship together. Rebuild `dist/`.
6. Save as `Plans/climate-room-dot.md`.

## Verification
- `npm run typecheck && npm test && npm run build`.
- Playground: on heat, the dot sits at 22.0 just past the knob at 21.5. Set the target to 25: the
  dot stays at 22 inside the coloured arc and is still visible. Turn it off: everything is grey,
  and the dot is still shown. Check both LTR and Hebrew RTL.

## Status
- [x] Room-temp dot on the ring (under the knob, outlined), grey when off
- [x] aria-valuetext with target + current
- [x] typecheck, tests, build; checked in playground: heat (dot inside arc), cool RTL (dot on track), off (all grey)
