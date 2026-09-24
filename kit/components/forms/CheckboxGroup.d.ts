import type { ReactNode } from 'react';

export type CheckboxGroupOrientation = "horizontal" | "vertical";
export type CheckboxGroupColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type CheckboxGroupVariant = "list" | "card" | "table";
export type CheckboxGroupSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CheckboxGroupRequired = boolean;
export type CheckboxGroupHighlight = boolean;
export type CheckboxGroupDisabled = boolean;

export interface CheckboxGroupProps {
  /** themes/checkbox-group.ts -> variants.orientation */
  orientation?: CheckboxGroupOrientation;
  /** themes/checkbox-group.ts -> variants.color */
  color?: CheckboxGroupColor;
  /** themes/checkbox-group.ts -> variants.variant */
  variant?: CheckboxGroupVariant;
  /** themes/checkbox-group.ts -> variants.size */
  size?: CheckboxGroupSize;
  /** themes/checkbox-group.ts -> variants.required */
  required?: CheckboxGroupRequired;
  /** themes/checkbox-group.ts -> variants.highlight */
  highlight?: CheckboxGroupHighlight;
  /** themes/checkbox-group.ts -> variants.disabled */
  disabled?: CheckboxGroupDisabled;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="fieldset" */
  "fieldset"?: ReactNode;
  /** content for data-slot="legend" */
  "legend"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "fieldset" | "legend" | "item", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function CheckboxGroup(props: CheckboxGroupProps): JSX.Element;
