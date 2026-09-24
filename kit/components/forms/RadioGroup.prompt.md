RadioGroup — Nuxt UI 4.11.1 `URadioGroup`; classes come straight from themes/radio-group.ts.

```jsx
<RadioGroup color="primary" variant="list" orientation="horizontal">Label</RadioGroup>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `variant` (list | card | table), `orientation` (horizontal | vertical), `indicator` (start | end | hidden), `size` (xs | sm | md | lg | xl), `highlight` (true | false), `disabled` (true), `required` (true)

Defaults: {"highlight":false,"size":"md","color":"primary","variant":"list","indicator":"start"}

Slots (each is a prop taking ReactNode): root, fieldset, legend, item, container, base, indicator, wrapper, label, icon, description

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.