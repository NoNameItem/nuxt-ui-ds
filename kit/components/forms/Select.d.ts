import type { ReactNode } from 'react';

export type SelectFieldGroup = "horizontal" | "vertical";
export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SelectVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type SelectColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type SelectLeading = boolean;
export type SelectTrailing = boolean;
export type SelectLoading = boolean;
export type SelectHighlight = boolean;
export type SelectFixed = boolean;
export type SelectType = "file";
export type SelectPosition = "popper" | "item-aligned";
export type SelectMultiple = boolean;

export interface SelectProps {
  /** themes/select.ts -> variants.fieldGroup */
  fieldGroup?: SelectFieldGroup;
  /** themes/select.ts -> variants.size */
  size?: SelectSize;
  /** themes/select.ts -> variants.variant */
  variant?: SelectVariant;
  /** themes/select.ts -> variants.color */
  color?: SelectColor;
  /** themes/select.ts -> variants.leading */
  leading?: SelectLeading;
  /** themes/select.ts -> variants.trailing */
  trailing?: SelectTrailing;
  /** themes/select.ts -> variants.loading */
  loading?: SelectLoading;
  /** themes/select.ts -> variants.highlight */
  highlight?: SelectHighlight;
  /** themes/select.ts -> variants.fixed */
  fixed?: SelectFixed;
  /** themes/select.ts -> variants.type */
  type?: SelectType;
  /** themes/select.ts -> variants.position */
  position?: SelectPosition;
  /** themes/select.ts -> variants.multiple */
  multiple?: SelectMultiple;
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
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"base" | "leading" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "trailing" | "trailingIcon" | "value" | "placeholder" | "arrow" | "content" | "viewport" | "group" | "empty" | "label" | "separator" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemLeadingChip" | "itemLeadingChipSize" | "itemTrailing" | "itemTrailingIcon" | "itemWrapper" | "itemLabel" | "itemDescription", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function Select(props: SelectProps): JSX.Element;
