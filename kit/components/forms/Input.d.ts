import type { ReactNode } from 'react';

export type InputFieldGroup = "horizontal" | "vertical";
export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type InputColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type InputLeading = boolean;
export type InputTrailing = boolean;
export type InputLoading = boolean;
export type InputHighlight = boolean;
export type InputFixed = boolean;
export type InputType = "file";

export interface InputProps {
  /** themes/input.ts -> variants.fieldGroup */
  fieldGroup?: InputFieldGroup;
  /** themes/input.ts -> variants.size */
  size?: InputSize;
  /** themes/input.ts -> variants.variant */
  variant?: InputVariant;
  /** themes/input.ts -> variants.color */
  color?: InputColor;
  /** themes/input.ts -> variants.leading */
  leading?: InputLeading;
  /** themes/input.ts -> variants.trailing */
  trailing?: InputTrailing;
  /** themes/input.ts -> variants.loading */
  loading?: InputLoading;
  /** themes/input.ts -> variants.highlight */
  highlight?: InputHighlight;
  /** themes/input.ts -> variants.fixed */
  fixed?: InputFixed;
  /** themes/input.ts -> variants.type */
  type?: InputType;
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
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "leading" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "trailing" | "trailingIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Input(props: InputProps): JSX.Element;
