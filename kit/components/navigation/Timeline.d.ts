import type { ReactNode } from 'react';

export type TimelineOrientation = "horizontal" | "vertical";
export type TimelineColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type TimelineSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type TimelineReverse = boolean;

export interface TimelineProps {
  /** themes/timeline.ts -> variants.orientation */
  orientation?: TimelineOrientation;
  /** themes/timeline.ts -> variants.color */
  color?: TimelineColor;
  /** themes/timeline.ts -> variants.size */
  size?: TimelineSize;
  /** themes/timeline.ts -> variants.reverse */
  reverse?: TimelineReverse;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="date" */
  "date"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "item" | "container" | "indicator" | "separator" | "wrapper" | "date" | "title" | "description", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function Timeline(props: TimelineProps): JSX.Element;
