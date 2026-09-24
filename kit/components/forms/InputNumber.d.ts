import type { ReactNode } from 'react';

export type InputNumberFieldGroup = "horizontal" | "vertical";
export type InputNumberColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type InputNumberSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputNumberVariant = "outline" | "soft" | "subtle" | "ghost" | "none";
export type InputNumberDisabled = boolean;
export type InputNumberOrientation = "horizontal" | "vertical";
export type InputNumberHighlight = boolean;
export type InputNumberFixed = boolean;
export type InputNumberIncrement = boolean;
export type InputNumberDecrement = boolean;

export interface InputNumberProps {
  /** themes/input-number.ts -> variants.fieldGroup */
  fieldGroup?: InputNumberFieldGroup;
  /** themes/input-number.ts -> variants.color */
  color?: InputNumberColor;
  /** themes/input-number.ts -> variants.size */
  size?: InputNumberSize;
  /** themes/input-number.ts -> variants.variant */
  variant?: InputNumberVariant;
  /** themes/input-number.ts -> variants.disabled */
  disabled?: InputNumberDisabled;
  /** themes/input-number.ts -> variants.orientation */
  orientation?: InputNumberOrientation;
  /** themes/input-number.ts -> variants.highlight */
  highlight?: InputNumberHighlight;
  /** themes/input-number.ts -> variants.fixed */
  fixed?: InputNumberFixed;
  /** themes/input-number.ts -> variants.increment */
  increment?: InputNumberIncrement;
  /** themes/input-number.ts -> variants.decrement */
  decrement?: InputNumberDecrement;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="increment" */
  "increment"?: ReactNode;
  /** content for data-slot="decrement" */
  "decrement"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "increment" | "decrement", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function InputNumber(props: InputNumberProps): JSX.Element;
