import type { ReactNode } from 'react';

export type InputTagsFieldGroup = "horizontal" | "vertical";
export type InputTagsSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputTagsVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type InputTagsColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type InputTagsLeading = boolean;
export type InputTagsTrailing = boolean;
export type InputTagsLoading = boolean;
export type InputTagsHighlight = boolean;
export type InputTagsFixed = boolean;
export type InputTagsType = "file";

export interface InputTagsProps {
  /** themes/input-tags.ts -> variants.fieldGroup */
  fieldGroup?: InputTagsFieldGroup;
  /** themes/input-tags.ts -> variants.size */
  size?: InputTagsSize;
  /** themes/input-tags.ts -> variants.variant */
  variant?: InputTagsVariant;
  /** themes/input-tags.ts -> variants.color */
  color?: InputTagsColor;
  /** themes/input-tags.ts -> variants.leading */
  leading?: InputTagsLeading;
  /** themes/input-tags.ts -> variants.trailing */
  trailing?: InputTagsTrailing;
  /** themes/input-tags.ts -> variants.loading */
  loading?: InputTagsLoading;
  /** themes/input-tags.ts -> variants.highlight */
  highlight?: InputTagsHighlight;
  /** themes/input-tags.ts -> variants.fixed */
  fixed?: InputTagsFixed;
  /** themes/input-tags.ts -> variants.type */
  type?: InputTagsType;
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
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="itemText" */
  "itemText"?: ReactNode;
  /** content for data-slot="itemDelete" */
  "itemDelete"?: ReactNode;
  /** content for data-slot="itemDeleteIcon" */
  "itemDeleteIcon"?: ReactNode;
  /** content for data-slot="input" */
  "input"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "leading" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "trailing" | "trailingIcon" | "item" | "itemText" | "itemDelete" | "itemDeleteIcon" | "input", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function InputTags(props: InputTagsProps): JSX.Element;
