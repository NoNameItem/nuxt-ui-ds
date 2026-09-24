PageLinks — Nuxt UI 4.11.1 `UPageLinks`; classes come straight from themes/page-links.ts.

```jsx
<PageLinks active="true">Content</PageLinks>
```

Variants: `active` (true | false)

Slots (each is a prop taking ReactNode): root, title, list, item, link, linkLeadingIcon, linkLabel, linkLabelExternalIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.