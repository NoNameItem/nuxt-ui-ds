import type { ReactNode } from 'react';

export type SwitchColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SwitchChecked = boolean;
export type SwitchUnchecked = boolean;
export type SwitchLoading = boolean;
export type SwitchHighlight = boolean;
export type SwitchRequired = boolean;
export type SwitchDisabled = boolean;

export interface SwitchProps {
  /** themes/switch.ts -> variants.color */
  color?: SwitchColor;
  /** themes/switch.ts -> variants.size */
  size?: SwitchSize;
  /** themes/switch.ts -> variants.checked */
  checked?: SwitchChecked;
  /** themes/switch.ts -> variants.unchecked */
  unchecked?: SwitchUnchecked;
  /** themes/switch.ts -> variants.loading */
  loading?: SwitchLoading;
  /** themes/switch.ts -> variants.highlight */
  highlight?: SwitchHighlight;
  /** themes/switch.ts -> variants.required */
  required?: SwitchRequired;
  /** themes/switch.ts -> variants.disabled */
  disabled?: SwitchDisabled;
  loadingIcon?: string;
  checkedIcon?: string;
  uncheckedIcon?: string;
  label?: ReactNode;
  description?: ReactNode;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="thumb" */
  "thumb"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "container" | "thumb" | "icon" | "wrapper" | "label" | "description", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Switch(props: SwitchProps): JSX.Element;
