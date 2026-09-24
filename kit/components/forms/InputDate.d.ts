import type { ReactNode } from 'react';

export type InputDateFieldGroup = "horizontal" | "vertical";
export type InputDateSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputDateVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type InputDateColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type InputDateLeading = boolean;
export type InputDateTrailing = boolean;
export type InputDateLoading = boolean;
export type InputDateHighlight = boolean;
export type InputDateFixed = boolean;
export type InputDateType = "file";

export interface InputDateProps {
  /** themes/input-date.ts -> variants.fieldGroup */
  fieldGroup?: InputDateFieldGroup;
  /** themes/input-date.ts -> variants.size */
  size?: InputDateSize;
  /** themes/input-date.ts -> variants.variant */
  variant?: InputDateVariant;
  /** themes/input-date.ts -> variants.color */
  color?: InputDateColor;
  /** themes/input-date.ts -> variants.leading */
  leading?: InputDateLeading;
  /** themes/input-date.ts -> variants.trailing */
  trailing?: InputDateTrailing;
  /** themes/input-date.ts -> variants.loading */
  loading?: InputDateLoading;
  /** themes/input-date.ts -> variants.highlight */
  highlight?: InputDateHighlight;
  /** themes/input-date.ts -> variants.fixed */
  fixed?: InputDateFixed;
  /** themes/input-date.ts -> variants.type */
  type?: InputDateType;
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
  /** content for data-slot="segment" */
  "segment"?: ReactNode;
  /** content for data-slot="separatorIcon" */
  "separatorIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"base" | "leading" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "trailing" | "trailingIcon" | "segment" | "separatorIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function InputDate(props: InputDateProps): JSX.Element;
