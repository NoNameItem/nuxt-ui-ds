Checkbox — Nuxt UI 4.11.1 `UCheckbox`; classes come straight from themes/checkbox.ts.

```jsx
<Checkbox color="primary" variant="list" indicator="start">Label</Checkbox>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (list | card), `indicator` (start | end | hidden), `size` (xs | sm | md | lg | xl), `required` (true), `disabled` (true), `highlight` (true | false), `checked` (true)

Defaults: {"highlight":false,"size":"md","color":"primary","variant":"list","indicator":"start"}

Slots (each is a prop taking ReactNode): root, container, base, indicator, icon, wrapper, label, description

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.