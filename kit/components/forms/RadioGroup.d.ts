import type { ReactNode } from 'react';

export type RadioGroupColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type RadioGroupVariant = "list" | "card" | "table";
export type RadioGroupOrientation = "horizontal" | "vertical";
export type RadioGroupIndicator = "start" | "end" | "hidden";
export type RadioGroupSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioGroupHighlight = boolean;
export type RadioGroupDisabled = boolean;
export type RadioGroupRequired = boolean;

export interface RadioGroupProps {
  /** themes/radio-group.ts -> variants.color */
  color?: RadioGroupColor;
  /** themes/radio-group.ts -> variants.variant */
  variant?: RadioGroupVariant;
  /** themes/radio-group.ts -> variants.orientation */
  orientation?: RadioGroupOrientation;
  /** themes/radio-group.ts -> variants.indicator */
  indicator?: RadioGroupIndicator;
  /** themes/radio-group.ts -> variants.size */
  size?: RadioGroupSize;
  /** themes/radio-group.ts -> variants.highlight */
  highlight?: RadioGroupHighlight;
  /** themes/radio-group.ts -> variants.disabled */
  disabled?: RadioGroupDisabled;
  /** themes/radio-group.ts -> variants.required */
  required?: RadioGroupRequired;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="fieldset" */
  "fieldset"?: ReactNode;
  /** content for data-slot="legend" */
  "legend"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "fieldset" | "legend" | "item" | "container" | "base" | "indicator" | "wrapper" | "label" | "icon" | "description", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function RadioGroup(props: RadioGroupProps): JSX.Element;
