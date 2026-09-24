import type { ReactNode } from 'react';

export type SeparatorColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SeparatorPosition = "start" | "center" | "end";
export type SeparatorType = "solid" | "dashed" | "dotted";

export interface SeparatorProps {
  /** themes/separator.ts -> variants.color */
  color?: SeparatorColor;
  /** themes/separator.ts -> variants.orientation */
  orientation?: SeparatorOrientation;
  /** themes/separator.ts -> variants.size */
  size?: SeparatorSize;
  /** themes/separator.ts -> variants.position */
  position?: SeparatorPosition;
  /** themes/separator.ts -> variants.type */
  type?: SeparatorType;
  /** text between the two borders — also accepted as children */
  label?: ReactNode;
  /** icon between the two borders */
  icon?: string;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "border" | "container" | "icon" | "avatar" | "avatarSize" | "label", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Separator(props: SeparatorProps): JSX.Element;
