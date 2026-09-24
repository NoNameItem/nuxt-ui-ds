import type { ReactNode } from 'react';

export type NavigationMenuColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type NavigationMenuHighlightColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type NavigationMenuVariant = "pill" | "link";
export type NavigationMenuOrientation = "horizontal" | "vertical";
export type NavigationMenuContentOrientation = "horizontal" | "vertical";
export type NavigationMenuActive = boolean;
export type NavigationMenuDisabled = boolean;
export type NavigationMenuHighlight = boolean;
export type NavigationMenuLevel = boolean;
export type NavigationMenuCollapsed = boolean;

export interface NavigationMenuProps {
  /** themes/navigation-menu.ts -> variants.color */
  color?: NavigationMenuColor;
  /** themes/navigation-menu.ts -> variants.highlightColor */
  highlightColor?: NavigationMenuHighlightColor;
  /** themes/navigation-menu.ts -> variants.variant */
  variant?: NavigationMenuVariant;
  /** themes/navigation-menu.ts -> variants.orientation */
  orientation?: NavigationMenuOrientation;
  /** themes/navigation-menu.ts -> variants.contentOrientation */
  contentOrientation?: NavigationMenuContentOrientation;
  /** themes/navigation-menu.ts -> variants.active */
  active?: NavigationMenuActive;
  /** themes/navigation-menu.ts -> variants.disabled */
  disabled?: NavigationMenuDisabled;
  /** themes/navigation-menu.ts -> variants.highlight */
  highlight?: NavigationMenuHighlight;
  /** themes/navigation-menu.ts -> variants.level */
  level?: NavigationMenuLevel;
  /** themes/navigation-menu.ts -> variants.collapsed */
  collapsed?: NavigationMenuCollapsed;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="list" */
  "list"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="link" */
  "link"?: ReactNode;
  /** content for data-slot="linkLeadingIcon" */
  "linkLeadingIcon"?: ReactNode;
  /** content for data-slot="linkLeadingAvatar" */
  "linkLeadingAvatar"?: ReactNode;
  /** content for data-slot="linkLeadingAvatarSize" */
  "linkLeadingAvatarSize"?: ReactNode;
  /** content for data-slot="linkLeadingChipSize" */
  "linkLeadingChipSize"?: ReactNode;
  /** content for data-slot="linkTrailing" */
  "linkTrailing"?: ReactNode;
  /** content for data-slot="linkTrailingBadge" */
  "linkTrailingBadge"?: ReactNode;
  /** content for data-slot="linkTrailingBadgeSize" */
  "linkTrailingBadgeSize"?: ReactNode;
  /** content for data-slot="linkTrailingIcon" */
  "linkTrailingIcon"?: ReactNode;
  /** content for data-slot="linkLabel" */
  "linkLabel"?: ReactNode;
  /** content for data-slot="linkLabelExternalIcon" */
  "linkLabelExternalIcon"?: ReactNode;
  /** content for data-slot="childList" */
  "childList"?: ReactNode;
  /** content for data-slot="childLabel" */
  "childLabel"?: ReactNode;
  /** content for data-slot="childItem" */
  "childItem"?: ReactNode;
  /** content for data-slot="childLink" */
  "childLink"?: ReactNode;
  /** content for data-slot="childLinkWrapper" */
  "childLinkWrapper"?: ReactNode;
  /** content for data-slot="childLinkIcon" */
  "childLinkIcon"?: ReactNode;
  /** content for data-slot="childLinkLabel" */
  "childLinkLabel"?: ReactNode;
  /** content for data-slot="childLinkLabelExternalIcon" */
  "childLinkLabelExternalIcon"?: ReactNode;
  /** content for data-slot="childLinkDescription" */
  "childLinkDescription"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="viewportWrapper" */
  "viewportWrapper"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="arrow" */
  "arrow"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "list" | "label" | "item" | "link" | "linkLeadingIcon" | "linkLeadingAvatar" | "linkLeadingAvatarSize" | "linkLeadingChipSize" | "linkTrailing" | "linkTrailingBadge" | "linkTrailingBadgeSize" | "linkTrailingIcon" | "linkLabel" | "linkLabelExternalIcon" | "childList" | "childLabel" | "childItem" | "childLink" | "childLinkWrapper" | "childLinkIcon" | "childLinkLabel" | "childLinkLabelExternalIcon" | "childLinkDescription" | "separator" | "viewportWrapper" | "viewport" | "content" | "indicator" | "arrow", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function NavigationMenu(props: NavigationMenuProps): JSX.Element;
