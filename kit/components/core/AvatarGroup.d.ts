import type { ReactNode } from 'react';

export type AvatarGroupSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type AvatarGroupColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export interface AvatarGroupProps {
  /** themes/avatar-group.ts -> variants.size */
  size?: AvatarGroupSize;
  /** themes/avatar-group.ts -> variants.color */
  color?: AvatarGroupColor;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function AvatarGroup(props: AvatarGroupProps): JSX.Element;
