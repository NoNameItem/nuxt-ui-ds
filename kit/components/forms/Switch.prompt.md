Switch — Nuxt UI 4.11.1 `USwitch`; classes come straight from themes/switch.ts.

```jsx
<Switch color="primary" size="xs" checked="true">Label</Switch>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `size` (xs | sm | md | lg | xl), `checked` (true), `unchecked` (true), `loading` (true), `highlight` (true), `required` (true), `disabled` (true)

Defaults: {"color":"primary","size":"md"}

Slots (each is a prop taking ReactNode): root, base, container, thumb, icon, wrapper, label, description

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.