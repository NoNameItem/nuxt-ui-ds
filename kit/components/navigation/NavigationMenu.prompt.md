NavigationMenu — Nuxt UI 4.11.1 `UNavigationMenu`; classes come straight from themes/navigation-menu.ts.

```jsx
<NavigationMenu color="primary" highlightColor="primary" variant="pill">Label</NavigationMenu>
```

Variants: `color` (primary | secondary | success | info | warning | error | neutral), `highlightColor` (primary | secondary | success | info | warning | error | neutral), `variant` (pill | link), `orientation` (horizontal | vertical), `contentOrientation` (horizontal | vertical), `active` (true | false), `disabled` (true), `highlight` (true), `level` (true), `collapsed` (true)

Defaults: {"color":"primary","highlightColor":"primary","variant":"pill"}

Slots (each is a prop taking ReactNode): root, list, label, item, link, linkLeadingIcon, linkLeadingAvatar, linkLeadingAvatarSize, linkLeadingChipSize, linkTrailing, linkTrailingBadge, linkTrailingBadgeSize, linkTrailingIcon, linkLabel, linkLabelExternalIcon, childList, childLabel, childItem, childLink, childLinkWrapper, childLinkIcon, childLinkLabel, childLinkLabelExternalIcon, childLinkDescription, separator, viewportWrapper, viewport, content, indicator, arrow

Override any slot with `ui={{ slot: "classes" }}`. Overlays take `open` as a prop — no behaviour.