# Climate card: clear "off" state for the dial

## Context
When the thermostat is off, `src/cards/climate.ts` hides the value arc and the knob (`!off` at
line 156). The dial's `onDial` and the −/+ steppers still respond, though. Dragging an empty
ring silently changes the target and calls `set_temperature` on a device that's off, so the user
gets no feedback. Many integrations also reject that call or ignore it.

## Recommended experience (Nest / HA thermostat style)
When it's off, the dial should look and behave clearly off:
- **Visible but muted:** the arc and knob still render at the saved target, but in a neutral
  grey (`--gc-text-dim`), with the arc at low opacity. You can see where it will resume.
- **Not interactive:** the dial and the steppers ignore input. No haptic and no service call.
  The cursor is `default`, and the stepper buttons are `disabled` and dimmed.
- **Readout:** the big number stays, dimmed, and the label under it changes from "יעד" (target)
  to "כבוי" (off). The current-temperature pill stays.
- **Step label:** the "step" text under the steppers is hidden while off, since it doesn't apply.
- To turn it on, you use the existing mode row (heat/cool/…), which is unchanged. The arc and knob
  regain their colour as soon as the state changes.

## Changes (all in `src/cards/climate.ts`)
1. `onDial`: return early when `this.s?.state === "off"`. `setTarget`: same guard, so the steppers
   are covered too.
2. Render: always draw the value arc and knob when `target !== undefined`, and add class `off`
   to the svg when off. CSS: `svg.off { cursor: default }`, `.off .value { opacity: .35 }`,
   `.off .knob { stroke: var(--gc-text-dim) }`. `--mode` already resolves to dim grey when off
   through `modeColor("off")`.
3. Readout: add class `dim` to `.target` when off (`opacity: .45`). The label shows
   `t(hass,"off")` instead of `t(hass,"target")`.
4. Steppers: add `?disabled=${off}` to both buttons, plus CSS `button:disabled { opacity:.35;
   cursor:default; transform:none }`. Hide the step label when off.
5. Set `aria-disabled` on the slider svg when off.
6. Bump the version to 0.6.3 (`package.json`, `src/glide-card.ts`), and rebuild `dist/`.
7. Save this plan as `Plans/climate-off-state.md`.

## Verification
- `npm run typecheck && npm test && npm run build`.
- Playground (`npm run dev`): set the mock climate to `off`. Check that the arc and knob are grey
  and muted, the label reads "כבוי"/"Off", and dragging or tapping +/− does nothing. Then switch
  the mode to heat and check the colours come back and the dial works.

## Status
- [x] Dial and steppers locked while off (no haptic, no service call), verified in playground
- [x] Arc and knob shown muted grey (value arc opacity 0.6 so it reads against the track), label "Off"/"כבוי"
- [x] Steppers disabled, step label hidden, aria-disabled
- [x] typecheck, tests, build, v0.6.3
