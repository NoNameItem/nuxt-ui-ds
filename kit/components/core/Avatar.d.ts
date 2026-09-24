import type { ReactNode } from 'react';

export type AvatarColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type AvatarSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface AvatarProps {
  /** themes/avatar.ts -> variants.color */
  color?: AvatarColor;
  /** themes/avatar.ts -> variants.size */
  size?: AvatarSize;
  /** image url — renders the image slot */
  src?: string;
  alt?: string;
  /** initials shown when there is no src */
  text?: string;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="image" */
  "image"?: ReactNode;
  /** content for data-slot="fallback" */
  "fallback"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "image" | "fallback" | "icon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Avatar(props: AvatarProps): JSX.Element;
