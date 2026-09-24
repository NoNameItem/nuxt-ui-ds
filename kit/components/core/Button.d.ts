import type { ReactNode } from 'react';

export type ButtonFieldGroup = "horizontal" | "vertical";
export type ButtonColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ButtonVariant = "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonBlock = boolean;
export type ButtonSquare = boolean;
export type ButtonLeading = boolean;
export type ButtonTrailing = boolean;
export type ButtonLoading = boolean;
export type ButtonActive = boolean;

export interface ButtonProps {
  /** themes/button.ts -> variants.fieldGroup */
  fieldGroup?: ButtonFieldGroup;
  /** themes/button.ts -> variants.color */
  color?: ButtonColor;
  /** themes/button.ts -> variants.variant */
  variant?: ButtonVariant;
  /** themes/button.ts -> variants.size */
  size?: ButtonSize;
  /** themes/button.ts -> variants.block */
  block?: ButtonBlock;
  /** themes/button.ts -> variants.square */
  square?: ButtonSquare;
  /** themes/button.ts -> variants.leading */
  leading?: ButtonLeading;
  /** themes/button.ts -> variants.trailing */
  trailing?: ButtonTrailing;
  /** themes/button.ts -> variants.loading */
  loading?: ButtonLoading;
  /** themes/button.ts -> variants.active */
  active?: ButtonActive;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="leadingAvatar" */
  "leadingAvatar"?: ReactNode;
  /** content for data-slot="leadingAvatarSize" */
  "leadingAvatarSize"?: ReactNode;
  /** content for data-slot="trailingIcon" */
  "trailingIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"base" | "label" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "trailingIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
