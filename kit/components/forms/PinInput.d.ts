import type { ReactNode } from 'react';

export type PinInputSize = "xs" | "sm" | "md" | "lg" | "xl";
export type PinInputVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type PinInputColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type PinInputHighlight = boolean;
export type PinInputFixed = boolean;

export interface PinInputProps {
  /** themes/pin-input.ts -> variants.size */
  size?: PinInputSize;
  /** themes/pin-input.ts -> variants.variant */
  variant?: PinInputVariant;
  /** themes/pin-input.ts -> variants.color */
  color?: PinInputColor;
  /** themes/pin-input.ts -> variants.highlight */
  highlight?: PinInputHighlight;
  /** themes/pin-input.ts -> variants.fixed */
  fixed?: PinInputFixed;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "separator", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PinInput(props: PinInputProps): JSX.Element;
