import type { ReactNode } from 'react';

export type ProgressAnimation = "carousel" | "carousel-inverse" | "swing" | "elastic";
export type ProgressColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ProgressSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ProgressStep = "active" | "first" | "other" | "last";
export type ProgressOrientation = "horizontal" | "vertical";
export type ProgressInverted = boolean;

export interface ProgressProps {
  /** themes/progress.ts -> variants.animation */
  animation?: ProgressAnimation;
  /** themes/progress.ts -> variants.color */
  color?: ProgressColor;
  /** themes/progress.ts -> variants.size */
  size?: ProgressSize;
  /** themes/progress.ts -> variants.step */
  step?: ProgressStep;
  /** themes/progress.ts -> variants.orientation */
  orientation?: ProgressOrientation;
  /** themes/progress.ts -> variants.inverted */
  inverted?: ProgressInverted;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="status" */
  "status"?: ReactNode;
  /** content for data-slot="steps" */
  "steps"?: ReactNode;
  /** content for data-slot="step" */
  "step"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "indicator" | "status" | "steps" | "step", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Progress(props: ProgressProps): JSX.Element;
