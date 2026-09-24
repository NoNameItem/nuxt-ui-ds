import type { ReactNode } from 'react';

export type FieldGroupSize = "xs" | "sm" | "md" | "lg" | "xl";
export type FieldGroupOrientation = "horizontal" | "vertical";

export interface FieldGroupProps {
  /** themes/field-group.ts -> variants.size */
  size?: FieldGroupSize;
  /** themes/field-group.ts -> variants.orientation */
  orientation?: FieldGroupOrientation;

  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function FieldGroup(props: FieldGroupProps): JSX.Element;
