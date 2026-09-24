import type { ReactNode } from 'react';

export type TabsColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type TabsVariant = "pill" | "link";
export type TabsOrientation = "horizontal" | "vertical";
export type TabsSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface TabsProps {
  /** themes/tabs.ts -> variants.color */
  color?: TabsColor;
  /** themes/tabs.ts -> variants.variant */
  variant?: TabsVariant;
  /** themes/tabs.ts -> variants.orientation */
  orientation?: TabsOrientation;
  /** themes/tabs.ts -> variants.size */
  size?: TabsSize;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="list" */
  "list"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="trigger" */
  "trigger"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="leadingAvatar" */
  "leadingAvatar"?: ReactNode;
  /** content for data-slot="leadingAvatarSize" */
  "leadingAvatarSize"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="trailingBadge" */
  "trailingBadge"?: ReactNode;
  /** content for data-slot="trailingBadgeSize" */
  "trailingBadgeSize"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "list" | "indicator" | "trigger" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "label" | "trailingBadge" | "trailingBadgeSize" | "content", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Tabs(props: TabsProps): JSX.Element;
