FooterColumns — Nuxt UI 4.11.1 `UFooterColumns`; classes come straight from themes/footer-columns.ts.

```jsx
<FooterColumns active="true">Label</FooterColumns>
```

Variants: `active` (true | false)

Slots (each is a prop taking ReactNode): root, left, center, right, label, list, item, link, linkLeadingIcon, linkLabel, linkLabelExternalIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.