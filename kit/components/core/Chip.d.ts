import type { ReactNode } from 'react';

export type ChipColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ChipSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type ChipPosition = "top-right" | "bottom-right" | "top-left" | "bottom-left";
export type ChipInset = boolean;
export type ChipStandalone = boolean;

export interface ChipProps {
  /** themes/chip.ts -> variants.color */
  color?: ChipColor;
  /** themes/chip.ts -> variants.size */
  size?: ChipSize;
  /** themes/chip.ts -> variants.position */
  position?: ChipPosition;
  /** themes/chip.ts -> variants.inset */
  inset?: ChipInset;
  /** themes/chip.ts -> variants.standalone */
  standalone?: ChipStandalone;
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

export function Chip(props: ChipProps): JSX.Element;
