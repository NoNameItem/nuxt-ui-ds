import type { ReactNode } from 'react';

export type ProgressGroupColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ProgressGroupSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ProgressGroupOrientation = "horizontal" | "vertical";

export interface ProgressGroupProps {
  /** themes/progress-group.ts -> variants.color */
  color?: ProgressGroupColor;
  /** themes/progress-group.ts -> variants.size */
  size?: ProgressGroupSize;
  /** themes/progress-group.ts -> variants.orientation */
  orientation?: ProgressGroupOrientation;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="segment" */
  "segment"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="status" */
  "status"?: ReactNode;
  /** content for data-slot="list" */
  "list"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="itemLeadingIcon" */
  "itemLeadingIcon"?: ReactNode;
  /** content for data-slot="itemLeadingDot" */
  "itemLeadingDot"?: ReactNode;
  /** content for data-slot="itemLabel" */
  "itemLabel"?: ReactNode;
  /** content for data-slot="itemTrailing" */
  "itemTrailing"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "segment" | "indicator" | "status" | "list" | "item" | "itemLeadingIcon" | "itemLeadingDot" | "itemLabel" | "itemTrailing", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function ProgressGroup(props: ProgressGroupProps): JSX.Element;
