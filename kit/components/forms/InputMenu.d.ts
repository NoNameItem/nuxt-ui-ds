import type { ReactNode } from 'react';

export type InputMenuFieldGroup = "horizontal" | "vertical";
export type InputMenuSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputMenuVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type InputMenuColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type InputMenuLeading = boolean;
export type InputMenuTrailing = boolean;
export type InputMenuLoading = boolean;
export type InputMenuHighlight = boolean;
export type InputMenuFixed = boolean;
export type InputMenuType = "file";
export type InputMenuVirtualize = boolean;
export type InputMenuMultiple = boolean;

export interface InputMenuProps {
  /** themes/input-menu.ts -> variants.fieldGroup */
  fieldGroup?: InputMenuFieldGroup;
  /** themes/input-menu.ts -> variants.size */
  size?: InputMenuSize;
  /** themes/input-menu.ts -> variants.variant */
  variant?: InputMenuVariant;
  /** themes/input-menu.ts -> variants.color */
  color?: InputMenuColor;
  /** themes/input-menu.ts -> variants.leading */
  leading?: InputMenuLeading;
  /** themes/input-menu.ts -> variants.trailing */
  trailing?: InputMenuTrailing;
  /** themes/input-menu.ts -> variants.loading */
  loading?: InputMenuLoading;
  /** themes/input-menu.ts -> variants.highlight */
  highlight?: InputMenuHighlight;
  /** themes/input-menu.ts -> variants.fixed */
  fixed?: InputMenuFixed;
  /** themes/input-menu.ts -> variants.type */
  type?: InputMenuType;
  /** themes/input-menu.ts -> variants.virtualize */
  virtualize?: InputMenuVirtualize;
  /** themes/input-menu.ts -> variants.multiple */
  multiple?: InputMenuMultiple;
  /** content for data-slot="root" */
  "root"?: ReactNode;
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
  /** content for data-slot="trailingClear" */
  "trailingClear"?: ReactNode;
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
  /** content for data-slot="tagsItem" */
  "tagsItem"?: ReactNode;
  /** content for data-slot="tagsItemText" */
  "tagsItemText"?: ReactNode;
  /** content for data-slot="tagsItemDelete" */
  "tagsItemDelete"?: ReactNode;
  /** content for data-slot="tagsItemDeleteIcon" */
  "tagsItemDeleteIcon"?: ReactNode;
  /** content for data-slot="tagsInput" */
  "tagsInput"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "leading" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "trailing" | "trailingIcon" | "trailingClear" | "arrow" | "content" | "viewport" | "group" | "empty" | "label" | "separator" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemLeadingChip" | "itemLeadingChipSize" | "itemTrailing" | "itemTrailingIcon" | "itemWrapper" | "itemLabel" | "itemDescription" | "tagsItem" | "tagsItemText" | "tagsItemDelete" | "tagsItemDeleteIcon" | "tagsInput", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function InputMenu(props: InputMenuProps): JSX.Element;
