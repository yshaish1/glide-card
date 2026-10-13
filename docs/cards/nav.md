# Nav bar

[← Back to README](../../README.md)

![Nav bar](../images/nav.webp)

A floating pill bar pinned to the bottom of the screen. A sliding indicator follows the current page. If the items don't fit, the bar scrolls sideways and keeps the active one centred.

## Options

| Option | Type | Description |
| --- | --- | --- |
| `items` | list | **Required.** The buttons. |
| `items[].name` | string | Label. |
| `items[].icon` | icon | Icon. |
| `items[].navigation_path` | string | A dashboard path, or a `#hash` to open a [pop-up](popup.md). |
| `items[].entity` | entity | Shows a dot while the entity is on. |
| `items[].pinned` | boolean | Kept at the end, outside the scrolling part (for example a "More" pop-up). |

## Example

```yaml
type: custom:glide-card
card_type: nav
items:
  - { name: Home, icon: mdi:home, navigation_path: /dashboard-home/0 }
  - { name: Kitchen, icon: mdi:silverware-fork-knife, navigation_path: "#kitchen", entity: light.kitchen }
  - { name: Climate, icon: mdi:thermostat, navigation_path: /dashboard-home/climate }
  - { name: More, icon: mdi:dots-grid, navigation_path: "#more", pinned: true }
```

> [!TIP]
> Add the same nav card to every view. The indicator slides over from where it was on the previous page.
