import type { ReactNode } from 'react';

export type TextareaFieldGroup = "horizontal" | "vertical";
export type TextareaSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TextareaVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type TextareaColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type TextareaLeading = boolean;
export type TextareaTrailing = boolean;
export type TextareaLoading = boolean;
export type TextareaHighlight = boolean;
export type TextareaFixed = boolean;
export type TextareaType = "file";
export type TextareaAutoresize = boolean;

export interface TextareaProps {
  /** themes/textarea.ts -> variants.fieldGroup */
  fieldGroup?: TextareaFieldGroup;
  /** themes/textarea.ts -> variants.size */
  size?: TextareaSize;
  /** themes/textarea.ts -> variants.variant */
  variant?: TextareaVariant;
  /** themes/textarea.ts -> variants.color */
  color?: TextareaColor;
  /** themes/textarea.ts -> variants.leading */
  leading?: TextareaLeading;
  /** themes/textarea.ts -> variants.trailing */
  trailing?: TextareaTrailing;
  /** themes/textarea.ts -> variants.loading */
  loading?: TextareaLoading;
  /** themes/textarea.ts -> variants.highlight */
  highlight?: TextareaHighlight;
  /** themes/textarea.ts -> variants.fixed */
  fixed?: TextareaFixed;
  /** themes/textarea.ts -> variants.type */
  type?: TextareaType;
  /** themes/textarea.ts -> variants.autoresize */
  autoresize?: TextareaAutoresize;
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

export function Textarea(props: TextareaProps): JSX.Element;
