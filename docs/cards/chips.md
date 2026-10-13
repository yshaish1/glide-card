# Title and chips

[← Back to README](../../README.md)

![Title and chips](../images/chips.webp)

## Title

A big page greeting with an optional subtitle.

| Option | Type | Description |
| --- | --- | --- |
| `title` | string | The heading. |
| `subtitle` | string | The smaller line under it. |
| `icon` | icon | Optional icon. |
| `align` | `center` \| `start` | Default `center`. |

```yaml
type: custom:glide-card
card_type: title
title: Good evening
subtitle: 3 lights on · 22° outside
```

## Chips

A row of small info pills that scrolls sideways when it doesn't fit. Weather shows "condition · temp", timestamp sensors show a time ("06:40"), and numbers keep their unit.

| Option | Type | Description |
| --- | --- | --- |
| `chips` | list | **Required.** |
| `chips[].entity` | entity | The entity to show. |
| `chips[].name` | string | Label above the value. `""` hides it. |
| `chips[].icon` / `color` | | Icon and its color (HA color name or CSS). |
| `chips[].attribute` | string | Show an attribute instead of the state. |
| `chips[].value` | string | Static text instead of the entity value. |
| `chips[].tap_action` / `hold_action` | action | Standard HA actions. |
| `chips[].visibility` | conditions | Show the chip only while every condition passes (see below). |
| `align` | `center` \| `start` | Default `center`. |

```yaml
type: custom:glide-card
card_type: chips
chips:
  - entity: weather.home
  - entity: sensor.sun_next_setting
    name: Sunset
    icon: mdi:weather-sunset-down
    color: deep-orange
  - entity: sensor.lights_on
    icon: mdi:lightbulb-group
    color: amber
    tap_action:
      action: navigate
      navigation_path: "#lights"
```

<details>
<summary>Chip visibility</summary>

The format is the same as HA's card visibility: `state` (`state` / `state_not`, one value or a list), `numeric_state` (`above` / `below`), `and`, `or`. Hidden chips leave no gap.

```yaml
chips:
  - entity: sensor.candle_lighting
    name: Candle lighting
    icon: mdi:candle
    color: amber
    visibility:
      - condition: state
        entity: sensor.shabbat_phase
        state: candle_lighting
```
</details>
