CheckboxGroup — Nuxt UI 4.11.1 `UCheckboxGroup`; classes come straight from themes/checkbox-group.ts.

```jsx
<CheckboxGroup orientation="horizontal" color="primary" variant="list">Content</CheckboxGroup>
```

Variants: `orientation` (horizontal | vertical), `color` (primary | secondary | success | info | warning | error | neutral), `variant` (list | card | table), `size` (xs | sm | md | lg | xl), `required` (true), `highlight` (true | false), `disabled` (true)

Defaults: {"highlight":false,"size":"md","variant":"list","color":"primary"}

Slots (each is a prop taking ReactNode): root, fieldset, legend, item

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.