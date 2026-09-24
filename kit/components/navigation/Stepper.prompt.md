Stepper — Nuxt UI 4.11.1 `UStepper`; classes come straight from themes/stepper.ts.

```jsx
<Stepper orientation="horizontal" size="xs" color="primary">Content</Stepper>
```

Variants: `orientation` (horizontal | vertical), `size` (xs | sm | md | lg | xl), `color` (primary | secondary | success | info | warning | error | neutral)

Defaults: {"size":"md","color":"primary"}

Slots (each is a prop taking ReactNode): root, header, item, container, trigger, indicator, icon, separator, wrapper, title, description, content

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.