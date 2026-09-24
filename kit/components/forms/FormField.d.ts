import type { ReactNode } from 'react';

export type FormFieldSize = "xs" | "sm" | "md" | "lg" | "xl";
export type FormFieldRequired = boolean;
export type FormFieldOrientation = "vertical" | "horizontal";

export interface FormFieldProps {
  /** themes/form-field.ts -> variants.size */
  size?: FormFieldSize;
  /** themes/form-field.ts -> variants.required */
  required?: FormFieldRequired;
  /** themes/form-field.ts -> variants.orientation */
  orientation?: FormFieldOrientation;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="labelWrapper" */
  "labelWrapper"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="error" */
  "error"?: ReactNode;
  /** content for data-slot="hint" */
  "hint"?: ReactNode;
  /** content for data-slot="help" */
  "help"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "wrapper" | "labelWrapper" | "label" | "container" | "description" | "error" | "hint" | "help", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function FormField(props: FormFieldProps): JSX.Element;
