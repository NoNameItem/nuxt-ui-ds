import type { ReactNode } from 'react';

export type BadgeFieldGroup = "horizontal" | "vertical";
export type BadgeColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type BadgeVariant = "solid" | "outline" | "soft" | "subtle";
export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeSquare = boolean;

export interface BadgeProps {
  /** themes/badge.ts -> variants.fieldGroup */
  fieldGroup?: BadgeFieldGroup;
  /** themes/badge.ts -> variants.color */
  color?: BadgeColor;
  /** themes/badge.ts -> variants.variant */
  variant?: BadgeVariant;
  /** themes/badge.ts -> variants.size */
  size?: BadgeSize;
  /** themes/badge.ts -> variants.square */
  square?: BadgeSquare;
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

export function Badge(props: BadgeProps): JSX.Element;
