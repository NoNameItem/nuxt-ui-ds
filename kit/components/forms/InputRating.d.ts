import type { ReactNode } from 'react';

export type InputRatingOrientation = "horizontal" | "vertical";
export type InputRatingSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputRatingColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type InputRatingReadonly = boolean;
export type InputRatingDisabled = boolean;

export interface InputRatingProps {
  /** themes/input-rating.ts -> variants.orientation */
  orientation?: InputRatingOrientation;
  /** themes/input-rating.ts -> variants.size */
  size?: InputRatingSize;
  /** themes/input-rating.ts -> variants.color */
  color?: InputRatingColor;
  /** themes/input-rating.ts -> variants.readonly */
  readonly?: InputRatingReadonly;
  /** themes/input-rating.ts -> variants.disabled */
  disabled?: InputRatingDisabled;
  /** number of items rendered (defineProps default 5) */
  length?: number;
  value?: number;
  defaultValue?: number;
  modelValue?: number;
  /** filled icon (default appConfig star) */
  icon?: string;
  emptyIcon?: string;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="emptyIcon" */
  "emptyIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "item" | "indicator" | "icon" | "emptyIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function InputRating(props: InputRatingProps): JSX.Element;
