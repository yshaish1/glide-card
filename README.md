# Glide Card

[![HACS][hacs-badge]][hacs-url]
[![Release][release-badge]][release-url]
[![License][license-badge]](https://github.com/yshaish1/glide-card/blob/main/LICENSE)

**Themeable Home Assistant cards that feel like a native app.** Swipe-to-dim buttons, covers that look like your real blinds and curtains, pop-up sheets, a floating nav bar, and climate and media cards. Eight built-in designs, dark and light, with full RTL support.

![Eight cover styles opening and closing: blind, bottom-up shade, Roman shade, Venetian, roller shutter, curtains, one-side curtain and vertical blinds](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/cover-styles.gif)

*Your covers, the way they really open. Eight styles, moving smoothly while the motor runs. [See them all →](https://github.com/yshaish1/glide-card/blob/main/docs/cards/cover.md#styles)*

![Glide Card in Liquid Glass, Refined Bubble and Material You](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/hero-dark.webp)

[![Open your Home Assistant instance and open this repository in HACS.][my-hacs-badge]][my-hacs-url]

## What's new

- **v0.17: Five new themes.** Soft Clay (neumorphic), Terminal (green-screen CRT), Brutalist (thick outlines, hard shadows), Aurora (night glass with vivid gradients) and E-Ink (monochrome paper and serif type). Each has dark and light versions. [Themes](https://github.com/yshaish1/glide-card/blob/main/docs/themes.md)

![Soft Clay, Terminal, Brutalist, Aurora and E-Ink themes](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/themes.webp)

- **v0.16: Cover styles.** Choose how each window opens: blind, bottom-up shade, Roman shade, Venetian (the slats show the tilt), outdoor roller shutter, curtains from the middle, a one-side curtain or vertical blinds. Dragging, the plain fill and the button arrows all follow the motion. [Cover docs](https://github.com/yshaish1/glide-card/blob/main/docs/cards/cover.md#styles)
- **v0.15.1: Smooth cover motion.** While a cover opens or closes, it glides steadily instead of jumping from one position report to the next.
- **v0.15: "More" menu in the nav bar.** Give a nav item its own `items` list, and it opens a small glass menu above the bar. [Nav docs](https://github.com/yshaish1/glide-card/blob/main/docs/cards/nav.md)

![Nav bar with the More menu open](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/nav.webp)

## Features

- **One card, eight widgets.** Button, pop-up, nav bar, climate, media, chips, title and heading, all as `custom:glide-card`, all in the visual editor.
- **Eight designs.** Liquid Glass, Refined Bubble, Material You, Soft Clay, Terminal, Brutalist, Aurora and E-Ink, each in dark and light. Switch per card or for the whole dashboard.
- **Made for touch.** Swipe a tile to set brightness or position, hold for more-info, drag the climate dial. Haptics, plus 17 tap animations (or a random one each tap).
- **Covers that match your windows.** Eight open styles over an outdoor view, with day and night following the sun. They move smoothly while the motor runs.
- **A floating nav bar.** A sliding indicator, items that scroll, and a "More" menu for everything else.
- **Real pop-ups.** A bottom sheet on phones and a centred modal on desktop. The tile morphs into it, and any HA card works inside.
- **Templates.** Name, icon, color, badge and secondary line accept HA templates, like Mushroom.
- **Three sizes.** Full, compact and slim, per card or dashboard-wide.
- **Fast.** One small file with no dependencies at runtime. A lite mode drops the blur on slow wall tablets.
- **RTL.** Hebrew and Arabic dashboards mirror correctly, gestures included.

![Light themes](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/hero-light.webp)

![Blinds and curtains](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/covers.gif) ![Pop-up sheet](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/popup.gif)

## Installation

<details open>
<summary><b>HACS (recommended)</b></summary>

1. Click the **Open in HACS** button above, or in HACS go to the menu (⋮) → **Custom repositories** and add `https://github.com/yshaish1/glide-card` with the type **Dashboard**.
2. Install **Glide Card**.
3. Reload the browser.

</details>

<details>
<summary><b>Manual</b></summary>

1. Download [`dist/glide-card.js`](https://raw.githubusercontent.com/yshaish1/glide-card/main/dist/glide-card.js) from this repo.
2. Copy it to `/config/www/`.
3. In **Settings → Dashboards → ⋮ → Resources**, add `/local/glide-card.js?v=1` as a **JavaScript module**.
4. Reload the browser. After each update, bump `?v=` so browsers don't keep the old file.

</details>

> [!TIP]
> If a new version doesn't show up, clear the browser cache. In the Companion app, use **Settings → Companion app → Debugging → Reset frontend cache**.

## Quick start

Add a card, pick **Glide Card** in the card picker, and choose a type. In YAML:

```yaml
type: custom:glide-card
card_type: button
entity: light.living_room
theme: glass      # glass | bubble | material | clay | terminal | brutal | aurora | ink
```

## Cards

| Card | What it does |
| --- | --- |
| **[Button](https://github.com/yshaish1/glide-card/blob/main/docs/cards/button.md)** | Tile or pill. Tap to toggle, hold for more-info, swipe to set brightness, speed or position. Templates and soft colors. |
| **[Cover](https://github.com/yshaish1/glide-card/blob/main/docs/cards/cover.md)** | A window over a garden, sky, city or sea view (or your own photo), with night following the sun. 8 styles that match how your cover opens (blind, bottom-up shade, Roman, Venetian, roller shutter, curtains from the middle or to one side, vertical blinds). Optional open, stop and close buttons. |
| **[Pop-up](https://github.com/yshaish1/glide-card/blob/main/docs/cards/popup.md)** | A sheet opened by a `#hash`, holding any cards. |
| **[Nav bar](https://github.com/yshaish1/glide-card/blob/main/docs/cards/nav.md)** | A floating bar with a sliding indicator, scrolling items, pinned items and a "More" menu. |
| **[Climate](https://github.com/yshaish1/glide-card/blob/main/docs/cards/climate.md)** | A drag dial with −/+, and mode buttons. |
| **[Media](https://github.com/yshaish1/glide-card/blob/main/docs/cards/media.md)** | Artwork, progress, transport and volume. |
| **[Title and chips](https://github.com/yshaish1/glide-card/blob/main/docs/cards/chips.md)** | A page greeting and a row of info pills, with per-chip visibility conditions. |
| **[Heading](https://github.com/yshaish1/glide-card/blob/main/docs/cards/heading.md)** | A section heading with an icon, badges and an optional link. |

![Cards](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/button.webp)

**More:** [shared options, sizes and tap animations](https://github.com/yshaish1/glide-card/blob/main/docs/options.md) · [themes](https://github.com/yshaish1/glide-card/blob/main/docs/themes.md)

## Example dashboard

<details>
<summary>The dashboard from the screenshot</summary>

```yaml
type: grid
columns: 1
square: false
cards:
  - type: custom:glide-card
    card_type: title
    title: Good evening
    subtitle: 3 lights on · 22° outside
  - type: custom:glide-card
    card_type: chips
    chips:
      - entity: weather.home
      - entity: sensor.sun_next_setting
        name: Sunset
        icon: mdi:weather-sunset-down
        color: deep-orange
      - entity: sensor.lights_on
        name: ""
        icon: mdi:lightbulb-group
        color: amber
  - type: custom:glide-card
    card_type: heading
    title: Living Room
    icon: mdi:sofa
    color: orange
    badges:
      - entity: sensor.living_temp
        icon: mdi:thermometer
  - type: grid
    columns: 2
    square: false
    cards:
      - { type: custom:glide-card, card_type: button, entity: light.ceiling }
      - { type: custom:glide-card, card_type: button, entity: light.floor_lamp }
      - { type: custom:glide-card, card_type: button, entity: cover.blinds, cover_style: venetian }
      - { type: custom:glide-card, card_type: button, entity: cover.curtains }
  - type: custom:glide-card
    card_type: climate
    entity: climate.living
    size: slim
  - type: custom:glide-card
    card_type: media
    entity: media_player.living
    size: slim
  - type: custom:glide-card
    card_type: nav
    items:
      - { name: Home, icon: mdi:home, navigation_path: /dashboard-home/0 }
      - { name: Lights, icon: mdi:lightbulb-group, navigation_path: "#lights", entity: light.ceiling }
      - { name: Climate, icon: mdi:thermostat, navigation_path: /dashboard-home/climate }
      - name: More
        icon: mdi:dots-horizontal
        pinned: true
        items:
          - { name: Media, icon: mdi:play-circle, navigation_path: /dashboard-home/media }
          - { name: Cameras, icon: mdi:cctv, navigation_path: /dashboard-home/cameras }
          - { name: Settings, icon: mdi:cog, navigation_path: /config }
```

In a sections dashboard, Glide cards size themselves to the grid, so you can drop them in directly.

</details>

## Develop

```bash
npm install
npm run dev     # playground with a mock HA: themes, dark/light, Hebrew RTL, phone/tablet/desktop
npm test
npm run build   # -> dist/glide-card.js
npm run shots   # regenerate the README images in docs/images (needs ffmpeg)
```

Ideas and bug reports are welcome in [issues](https://github.com/yshaish1/glide-card/issues).

## License

[MIT](https://github.com/yshaish1/glide-card/blob/main/LICENSE)

[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=flat-square
[hacs-url]: https://hacs.xyz/docs/faq/custom_repositories/
[release-badge]: https://img.shields.io/github/v/release/yshaish1/glide-card?style=flat-square
[release-url]: https://github.com/yshaish1/glide-card/releases/latest
[license-badge]: https://img.shields.io/github/license/yshaish1/glide-card?style=flat-square
[my-hacs-badge]: https://my.home-assistant.io/badges/hacs_repository.svg
[my-hacs-url]: https://my.home-assistant.io/redirect/hacs_repository/?owner=yshaish1&repository=glide-card&category=plugin
