import type { ReactNode } from 'react';

export type StepperOrientation = "horizontal" | "vertical";
export type StepperSize = "xs" | "sm" | "md" | "lg" | "xl";
export type StepperColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export interface StepperProps {
  /** themes/stepper.ts -> variants.orientation */
  orientation?: StepperOrientation;
  /** themes/stepper.ts -> variants.size */
  size?: StepperSize;
  /** themes/stepper.ts -> variants.color */
  color?: StepperColor;
  /** current step: an index, or the step's value */
  modelValue?: string | number;
  defaultValue?: string | number;
  valueKey?: string;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="trigger" */
  "trigger"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "item" | "container" | "trigger" | "indicator" | "icon" | "separator" | "wrapper" | "title" | "description" | "content", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function Stepper(props: StepperProps): JSX.Element;
