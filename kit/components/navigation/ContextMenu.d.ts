import type { ReactNode } from 'react';

export type ContextMenuColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ContextMenuActive = boolean;
export type ContextMenuLoading = boolean;
export type ContextMenuSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ContextMenuProps {
  /** themes/context-menu.ts -> variants.color */
  color?: ContextMenuColor;
  /** themes/context-menu.ts -> variants.active */
  active?: ContextMenuActive;
  /** themes/context-menu.ts -> variants.loading */
  loading?: ContextMenuLoading;
  /** themes/context-menu.ts -> variants.size */
  size?: ContextMenuSize;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="group" */
  "group"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="itemLeadingIcon" */
  "itemLeadingIcon"?: ReactNode;
  /** content for data-slot="itemLeadingAvatar" */
  "itemLeadingAvatar"?: ReactNode;
  /** content for data-slot="itemLeadingAvatarSize" */
  "itemLeadingAvatarSize"?: ReactNode;
  /** content for data-slot="itemTrailing" */
  "itemTrailing"?: ReactNode;
  /** content for data-slot="itemTrailingIcon" */
  "itemTrailingIcon"?: ReactNode;
  /** content for data-slot="itemTrailingKbds" */
  "itemTrailingKbds"?: ReactNode;
  /** content for data-slot="itemTrailingKbdsSize" */
  "itemTrailingKbdsSize"?: ReactNode;
  /** content for data-slot="itemWrapper" */
  "itemWrapper"?: ReactNode;
  /** content for data-slot="itemLabel" */
  "itemLabel"?: ReactNode;
  /** content for data-slot="itemDescription" */
  "itemDescription"?: ReactNode;
  /** content for data-slot="itemLabelExternalIcon" */
  "itemLabelExternalIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"content" | "viewport" | "group" | "label" | "separator" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemTrailing" | "itemTrailingIcon" | "itemTrailingKbds" | "itemTrailingKbdsSize" | "itemWrapper" | "itemLabel" | "itemDescription" | "itemLabelExternalIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function ContextMenu(props: ContextMenuProps): JSX.Element;
