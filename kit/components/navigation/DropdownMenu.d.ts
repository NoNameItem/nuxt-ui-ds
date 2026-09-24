import type { ReactNode } from 'react';

export type DropdownMenuColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type DropdownMenuActive = boolean;
export type DropdownMenuLoading = boolean;
export type DropdownMenuSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface DropdownMenuProps {
  /** themes/dropdown-menu.ts -> variants.color */
  color?: DropdownMenuColor;
  /** themes/dropdown-menu.ts -> variants.active */
  active?: DropdownMenuActive;
  /** themes/dropdown-menu.ts -> variants.loading */
  loading?: DropdownMenuLoading;
  /** themes/dropdown-menu.ts -> variants.size */
  size?: DropdownMenuSize;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="input" */
  "input"?: ReactNode;
  /** content for data-slot="empty" */
  "empty"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="arrow" */
  "arrow"?: ReactNode;
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
  ui?: Partial<Record<"content" | "input" | "empty" | "viewport" | "arrow" | "group" | "label" | "separator" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemTrailing" | "itemTrailingIcon" | "itemTrailingKbds" | "itemTrailingKbdsSize" | "itemWrapper" | "itemLabel" | "itemDescription" | "itemLabelExternalIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DropdownMenu(props: DropdownMenuProps): JSX.Element;
