import type { ReactNode } from 'react';

export type SelectMenuFieldGroup = "horizontal" | "vertical";
export type SelectMenuSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SelectMenuVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type SelectMenuColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type SelectMenuLeading = boolean;
export type SelectMenuTrailing = boolean;
export type SelectMenuLoading = boolean;
export type SelectMenuHighlight = boolean;
export type SelectMenuFixed = boolean;
export type SelectMenuType = "file";
export type SelectMenuPosition = "popper" | "item-aligned";
export type SelectMenuMultiple = boolean;
export type SelectMenuVirtualize = boolean;

export interface SelectMenuProps {
  /** themes/select-menu.ts -> variants.fieldGroup */
  fieldGroup?: SelectMenuFieldGroup;
  /** themes/select-menu.ts -> variants.size */
  size?: SelectMenuSize;
  /** themes/select-menu.ts -> variants.variant */
  variant?: SelectMenuVariant;
  /** themes/select-menu.ts -> variants.color */
  color?: SelectMenuColor;
  /** themes/select-menu.ts -> variants.leading */
  leading?: SelectMenuLeading;
  /** themes/select-menu.ts -> variants.trailing */
  trailing?: SelectMenuTrailing;
  /** themes/select-menu.ts -> variants.loading */
  loading?: SelectMenuLoading;
  /** themes/select-menu.ts -> variants.highlight */
  highlight?: SelectMenuHighlight;
  /** themes/select-menu.ts -> variants.fixed */
  fixed?: SelectMenuFixed;
  /** themes/select-menu.ts -> variants.type */
  type?: SelectMenuType;
  /** themes/select-menu.ts -> variants.position */
  position?: SelectMenuPosition;
  /** themes/select-menu.ts -> variants.multiple */
  multiple?: SelectMenuMultiple;
  /** themes/select-menu.ts -> variants.virtualize */
  virtualize?: SelectMenuVirtualize;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="leadingAvatar" */
  "leadingAvatar"?: ReactNode;
  /** content for data-slot="leadingAvatarSize" */
  "leadingAvatarSize"?: ReactNode;
  /** content for data-slot="trailing" */
  "trailing"?: ReactNode;
  /** content for data-slot="trailingIcon" */
  "trailingIcon"?: ReactNode;
  /** content for data-slot="value" */
  "value"?: ReactNode;
  /** content for data-slot="placeholder" */
  "placeholder"?: ReactNode;
  /** content for data-slot="arrow" */
  "arrow"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="group" */
  "group"?: ReactNode;
  /** content for data-slot="empty" */
  "empty"?: ReactNode;
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
  /** content for data-slot="itemLeadingChip" */
  "itemLeadingChip"?: ReactNode;
  /** content for data-slot="itemLeadingChipSize" */
  "itemLeadingChipSize"?: ReactNode;
  /** content for data-slot="itemTrailing" */
  "itemTrailing"?: ReactNode;
  /** content for data-slot="itemTrailingIcon" */
  "itemTrailingIcon"?: ReactNode;
  /** content for data-slot="itemWrapper" */
  "itemWrapper"?: ReactNode;
  /** content for data-slot="itemLabel" */
  "itemLabel"?: ReactNode;
  /** content for data-slot="itemDescription" */
  "itemDescription"?: ReactNode;
  /** content for data-slot="input" */
  "input"?: ReactNode;
  /** content for data-slot="focusScope" */
  "focusScope"?: ReactNode;
  /** content for data-slot="trailingClear" */
  "trailingClear"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"base" | "leading" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "trailing" | "trailingIcon" | "value" | "placeholder" | "arrow" | "content" | "viewport" | "group" | "empty" | "label" | "separator" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemLeadingChip" | "itemLeadingChipSize" | "itemTrailing" | "itemTrailingIcon" | "itemWrapper" | "itemLabel" | "itemDescription" | "input" | "focusScope" | "trailingClear", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function SelectMenu(props: SelectMenuProps): JSX.Element;
