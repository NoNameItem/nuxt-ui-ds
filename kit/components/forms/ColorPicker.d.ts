import type { ReactNode } from 'react';

export type ColorPickerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ColorPickerProps {
  /** themes/color-picker.ts -> variants.size */
  size?: ColorPickerSize;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="picker" */
  "picker"?: ReactNode;
  /** content for data-slot="selector" */
  "selector"?: ReactNode;
  /** content for data-slot="selectorBackground" */
  "selectorBackground"?: ReactNode;
  /** content for data-slot="selectorThumb" */
  "selectorThumb"?: ReactNode;
  /** content for data-slot="track" */
  "track"?: ReactNode;
  /** content for data-slot="trackThumb" */
  "trackThumb"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "picker" | "selector" | "selectorBackground" | "selectorThumb" | "track" | "trackThumb", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ColorPicker(props: ColorPickerProps): JSX.Element;
