# Clock

[← Back to README](../../README.md)

A large clock with the weekday and date in the user's language. It has no surface and sits on the dashboard background, like the title card. It updates on the minute (or every second with `seconds: true`).

## Options

| Option | Type | Description |
| --- | --- | --- |
| `secondary_entity` | entity | Its state is shown after the date, e.g. the Jewish Calendar integration's `sensor.jewish_calendar_date`. |
| `seconds` | boolean | Show seconds. Default `false`. |
| `size` | string | `full`, `compact` or `slim` make the time smaller. |

## Example

```yaml
type: custom:glide-card
card_type: clock
secondary_entity: sensor.jewish_calendar_date
```
