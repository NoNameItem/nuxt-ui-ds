FormField — Nuxt UI 4.11.1 `UFormField`; classes come straight from themes/form-field.ts.

```jsx
<FormField size="xs" required="true" orientation="vertical">Label</FormField>
```

Variants: `size` (xs | sm | md | lg | xl), `required` (true), `orientation` (vertical | horizontal)

Defaults: {"size":"md"}

Slots (each is a prop taking ReactNode): root, wrapper, labelWrapper, label, container, description, error, hint, help

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.