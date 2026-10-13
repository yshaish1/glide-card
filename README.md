# Glide Card

[![HACS][hacs-badge]][hacs-url]
[![Release][release-badge]][release-url]
[![License][license-badge]](https://github.com/yshaish1/glide-card/blob/main/LICENSE)

**Themeable Home Assistant cards that feel like a native app.** Swipe-to-dim buttons, covers that look like real blinds and curtains, pop-up sheets, a floating nav bar, and climate and media cards. Three built-in designs, dark and light, with full RTL support.

![Glide Card in Liquid Glass, Refined Bubble and Material You](https://raw.githubusercontent.com/yshaish1/glide-card/main/docs/images/hero-dark.webp)

[![Open your Home Assistant instance and open this repository in HACS.][my-hacs-badge]][my-hacs-url]

## Features

- **One card, eight widgets.** Button, pop-up, nav bar, climate, media, chips, title and heading, all as `custom:glide-card`, all in the visual editor.
- **Three designs.** Liquid Glass, Refined Bubble and Material You, each in dark and light. Switch per card or for the whole dashboard.
- **Made for touch.** Swipe a tile to set brightness or position, hold for more-info, drag the climate dial. Haptics, plus 17 tap animations (or a random one each tap).
- **Covers you can read at a glance.** An outdoor view behind a blind or curtains, with day and night following the sun.
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
theme: glass      # glass | bubble | material
```

## Cards

| Card | What it does |
| --- | --- |
| **[Button](https://github.com/yshaish1/glide-card/blob/main/docs/cards/button.md)** | Tile or pill. Tap to toggle, hold for more-info, swipe to set brightness, speed or position. Templates and soft colors. |
| **[Cover](https://github.com/yshaish1/glide-card/blob/main/docs/cards/cover.md)** | A blind or curtains over a garden, sky, city or sea view (or your own photo), with night following the sun. Optional open, stop and close buttons. |
| **[Pop-up](https://github.com/yshaish1/glide-card/blob/main/docs/cards/popup.md)** | A sheet opened by a `#hash`, holding any cards. |
| **[Nav bar](https://github.com/yshaish1/glide-card/blob/main/docs/cards/nav.md)** | A floating bar with a sliding indicator, scrolling items and pinned items. |
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
      - { type: custom:glide-card, card_type: button, entity: cover.blinds }
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
      - { name: Media, icon: mdi:play-circle, navigation_path: /dashboard-home/media }
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
