Calendar — Nuxt UI 4.11.1 `UCalendar`; classes come straight from themes/calendar.ts.

```jsx
<Calendar color="primary" variant="solid" size="xs">Content</Calendar>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (solid | outline | soft | subtle), `size` (xs | sm | md | lg | xl), `view` (day | month | year), `weekNumbers` (true)

Defaults: {"size":"md","color":"primary","variant":"solid","view":"day"}

Slots (each is a prop taking ReactNode): root, header, body, heading, headingLabel, grid, gridRow, gridWeekDaysRow, gridBody, headCell, headCellWeek, cell, cellTrigger, cellWeek

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.