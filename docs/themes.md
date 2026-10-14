# Themes

[← Back to README](../README.md)

| Theme | `theme:` | Look |
| --- | --- | --- |
| Liquid Glass | `glass` | Frosted translucent tiles with a warm glow (default) |
| Refined Bubble | `bubble` | Solid carbon surfaces, full-width pill rows, one electric accent; fast on tablets |
| Material You | `material` | Soft tonal surfaces from a teal seed |
| Soft Clay | `clay` | Neumorphic: tiles pressed out of one matte colour, sunk in with a coral rim when on |
| Terminal | `terminal` | Retro CRT: phosphor green on black, monospace, scanlines, inverse video when on, amber heat |
| Brutalist | `brutal` | Paper, thick black outlines, hard offset shadows, flat poster colours (yellow, cyan, red, cobalt) |
| Aurora | `aurora` | Night glass lit by violet, teal and pink; lit tiles burn in a gradient with a coloured glow |
| E-Ink | `ink` | Monochrome paper and serif type, hairlines, no colour, blur or shadow; tiles invert when on, levels are hatched. Light on slow wall tablets |

The newer themes name fonts like Nunito Sans, JetBrains Mono, Space Grotesk, Outfit/Sora and Newsreader, and fall back to similar system fonts when those aren't installed. To get the exact look, load the font in HA (for example a Google Fonts stylesheet as a dashboard resource).

![Themes, dark](images/hero-dark.webp)

Each theme has a dark and a light variant, and `mode: auto` follows HA.

## How themes work

A theme is one object: semantic tokens (`--gc-surface`, `--gc-accent`, `--gc-radius`, `--gc-backdrop`, ...), optional extra CSS per card type, and layout defaults. Cards only read tokens, so a new design never touches card code.

- **Built-in:** add `src/themes/<id>/index.ts` (copy `glass`) and list it in `src/themes/index.ts`.
- **From another HACS resource:**

  ```js
  window.glideCardThemes.register({ id, name, version, preview, tokens: { dark, light } });
  ```

See [`src/themes/types.ts`](../src/themes/types.ts) for the full token contract.
