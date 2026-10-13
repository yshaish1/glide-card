# Cover: blinds and curtains

[← Back to README](../../README.md)

![Covers](../images/covers.webp)

A cover button with a position looks like a window. An outdoor view sits behind it, and a blind comes down from the top or a pair of sheer curtains closes in from the sides. You can tell at a glance how open it is. Blinds drag up and down, curtains drag sideways.

![Cover drag](../images/covers.gif)

The view turns to night (moon, stars, lit windows) when `sun.sun` is below the horizon:

![Covers at night](../images/covers-night.webp)

## Options

Everything from [Button](button.md), plus:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `view` | `garden` \| `sky` \| `city` \| `sea` \| `color` | `garden` | The outdoor scene. `color` keeps the plain colored fill. |
| `view_image` | URL | | Your own photo, for example `/local/yard.jpg`. Used when `view` is not set, and dimmed at night. |
| `cover_style` | `blind` \| `curtain` | from device class | Curtains part two drapes from the centre. Covers with the HA device class `curtain` get them automatically. |
| `color` | color | theme | On curtains, this tints the fabric. |
| `cover_buttons` | boolean | `false` | Open, stop and close buttons in place of the badge. |

## Examples

<details>
<summary>Blind with a city view</summary>

```yaml
type: custom:glide-card
card_type: button
entity: cover.office
view: city
```
</details>

<details>
<summary>Brown curtains</summary>

```yaml
type: custom:glide-card
card_type: button
entity: cover.bedroom
cover_style: curtain
color: "#b38b6d"
```
</details>

<details>
<summary>Your own photo</summary>

Put the photo in `/config/www/` and refer to it as `/local/...`:

```yaml
type: custom:glide-card
card_type: button
entity: cover.garden
view_image: /local/yard.jpg
```
</details>

<details>
<summary>Open, stop and close buttons</summary>

`cover_buttons: true` adds small round open, stop and close buttons where the badge was; the line under the name still shows the position. Each button shows only when the cover supports it. Open greys out when the cover is fully open, close greys out when it's closed, and stop lights up while the cover moves. This also works on covers without a position, such as a garage door:

```yaml
type: custom:glide-card
card_type: button
entity: cover.garage
cover_buttons: true
```
</details>

> [!NOTE]
> Clouds drift and stars twinkle slowly. Both stop when the device asks for reduced motion.
