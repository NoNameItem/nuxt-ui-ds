Breadcrumb — Nuxt UI 4.11.1 `UBreadcrumb`; classes come straight from themes/breadcrumb.ts.

```jsx
<Breadcrumb active="true" disabled="true" to="true">Content</Breadcrumb>
```

Variants: `active` (true | false), `disabled` (true), `to` (true), `color` (primary | secondary | success | info | warning | error | neutral)

Defaults: {"color":"primary"}

Slots (each is a prop taking ReactNode): root, list, item, link, linkLeadingIcon, linkLeadingAvatar, linkLeadingAvatarSize, linkLabel, separator, separatorIcon

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.