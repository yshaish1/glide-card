# Five new themes

## Goal
Add 5 built-in themes, each clearly different from the others and from Liquid Glass, Refined Bubble and Material You. Design them as mockups in Stitch first, then turn each one into theme tokens plus signature CSS.

## Context / Constraints
- A theme is one `GlideTheme` object (`src/themes/<id>/index.ts`), registered in `src/themes/index.ts`. Cards only read the `--gc-*` tokens, plus optional per-card CSS in `styles`. No card code changes.
- Each theme needs a dark and a light variant, and `mode: auto` follows HA.
- Each theme must work in RTL (Hebrew), with every card type, and with covers and cover styles.
- Decided with the user: I pick the mix, themes get tokens plus signature CSS, Stitch makes mockups and then I code them. **No release**: commit locally only.

## Themes
| id | name | idea |
|---|---|---|
| `clay` | Soft Clay | Neumorphic: one matte colour, extruded tiles with twin shadows, pressed-in when on |
| `terminal` | Terminal | Retro CRT: black, phosphor green, monospace, scanlines, square corners, glow text |
| `brutal` | Brutalist | Paper, 2–3px black borders, hard offset shadows, flat yellow accent, heavy grotesk |
| `aurora` | Aurora | Deep night with vivid violet/teal/pink gradient glows, gradient fills when on |
| `ink` | E-Ink | Monochrome, serif, hairline borders, no shadows/blur, great on slow wall tablets |

## Steps
- [x] Stitch: project + one dashboard mockup per theme
- [x] Review the mockups and extract tokens (colours, fonts, radius, shadows)
- [x] Implement 5 theme files + register
- [x] Editor theme picker shows them (preview swatches)
- [x] Playground: check every theme, dark/light, LTR/RTL in Chrome
- [x] Tests (registry includes the new ids), tsc, build
- [x] docs/themes.md table
- [x] Commit locally (no push, no release)

## Status
Done and committed locally (not pushed or released). Stitch projects: Soft Clay 5984499356733657160, Terminal 17714093804391436588, Brutalist 15200106164297017731, Aurora 2599913761873314595, E-Ink 15006315205723108917.

## Open questions
- None (released as v0.17.0 with docs/images/themes.webp).
- Web fonts are referenced by name only (fallbacks otherwise); bundling or auto-loading them is not done.
