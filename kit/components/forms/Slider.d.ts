import type { ReactNode } from 'react';

export type SliderColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type SliderSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SliderOrientation = "horizontal" | "vertical";
export type SliderDisabled = boolean;

export interface SliderProps {
  /** themes/slider.ts -> variants.color */
  color?: SliderColor;
  /** themes/slider.ts -> variants.size */
  size?: SliderSize;
  /** themes/slider.ts -> variants.orientation */
  orientation?: SliderOrientation;
  /** themes/slider.ts -> variants.disabled */
  disabled?: SliderDisabled;
  min?: number;
  max?: number;
  /** single value or [lo, hi] for a range */
  value?: number | number[];
  defaultValue?: number | number[];
  modelValue?: number | number[];
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="track" */
  "track"?: ReactNode;
  /** content for data-slot="range" */
  "range"?: ReactNode;
  /** content for data-slot="thumb" */
  "thumb"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "track" | "range" | "thumb", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Slider(props: SliderProps): JSX.Element;
