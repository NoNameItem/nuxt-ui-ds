import type { ReactNode } from 'react';

export type CheckboxColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type CheckboxVariant = "list" | "card";
export type CheckboxIndicator = "start" | "end" | "hidden";
export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CheckboxRequired = boolean;
export type CheckboxDisabled = boolean;
export type CheckboxHighlight = boolean;
export type CheckboxChecked = boolean;

export interface CheckboxProps {
  /** themes/checkbox.ts -> variants.color */
  color?: CheckboxColor;
  /** themes/checkbox.ts -> variants.variant */
  variant?: CheckboxVariant;
  /** themes/checkbox.ts -> variants.indicator */
  indicator?: CheckboxIndicator;
  /** themes/checkbox.ts -> variants.size */
  size?: CheckboxSize;
  /** themes/checkbox.ts -> variants.required */
  required?: CheckboxRequired;
  /** themes/checkbox.ts -> variants.disabled */
  disabled?: CheckboxDisabled;
  /** themes/checkbox.ts -> variants.highlight */
  highlight?: CheckboxHighlight;
  /** themes/checkbox.ts -> variants.checked */
  checked?: CheckboxChecked;
  /** indeterminate (mixed) state — shows the minus icon */
  indeterminate?: boolean;
  /** icon shown when checked (default appConfig check) */
  checkedIcon?: string;
  /** icon shown when indeterminate (default appConfig minus) */
  indeterminateIcon?: string;
  /** leading icon, card variant only */
  icon?: string;
  label?: ReactNode;
  description?: ReactNode;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "container" | "base" | "indicator" | "icon" | "wrapper" | "label" | "description", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
