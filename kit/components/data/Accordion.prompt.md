Accordion — Nuxt UI 4.11.1 `UAccordion`; classes come straight from themes/accordion.ts.

```jsx
<Accordion disabled="true">Label</Accordion>
```

Variants: `disabled` (true)

Slots (each is a prop taking ReactNode): root, item, header, trigger, content, body, leadingIcon, trailingIcon, label

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.