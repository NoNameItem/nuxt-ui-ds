PageAnchors — Nuxt UI 4.11.1 `UPageAnchors`; classes come straight from themes/page-anchors.ts.

```jsx
<PageAnchors active="true">Content</PageAnchors>
```

Variants: `active` (true | false)

Slots (each is a prop taking ReactNode): root, list, item, link, linkLeading, linkLeadingIcon, linkLabel, linkLabelExternalIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.