import type { ReactNode } from 'react';

export type InputTimeFieldGroup = "horizontal" | "vertical";
export type InputTimeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputTimeVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type InputTimeColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type InputTimeLeading = boolean;
export type InputTimeTrailing = boolean;
export type InputTimeLoading = boolean;
export type InputTimeHighlight = boolean;
export type InputTimeFixed = boolean;
export type InputTimeType = "file";

export interface InputTimeProps {
  /** themes/input-time.ts -> variants.fieldGroup */
  fieldGroup?: InputTimeFieldGroup;
  /** themes/input-time.ts -> variants.size */
  size?: InputTimeSize;
  /** themes/input-time.ts -> variants.variant */
  variant?: InputTimeVariant;
  /** themes/input-time.ts -> variants.color */
  color?: InputTimeColor;
  /** themes/input-time.ts -> variants.leading */
  leading?: InputTimeLeading;
  /** themes/input-time.ts -> variants.trailing */
  trailing?: InputTimeTrailing;
  /** themes/input-time.ts -> variants.loading */
  loading?: InputTimeLoading;
  /** themes/input-time.ts -> variants.highlight */
  highlight?: InputTimeHighlight;
  /** themes/input-time.ts -> variants.fixed */
  fixed?: InputTimeFixed;
  /** themes/input-time.ts -> variants.type */
  type?: InputTimeType;
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

export function InputTime(props: InputTimeProps): JSX.Element;
