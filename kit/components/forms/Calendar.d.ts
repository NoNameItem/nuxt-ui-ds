import type { ReactNode } from 'react';

export type CalendarColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type CalendarVariant = "solid" | "outline" | "soft" | "subtle";
export type CalendarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CalendarView = "day" | "month" | "year";
export type CalendarWeekNumbers = boolean;

export interface CalendarProps {
  /** themes/calendar.ts -> variants.color */
  color?: CalendarColor;
  /** themes/calendar.ts -> variants.variant */
  variant?: CalendarVariant;
  /** themes/calendar.ts -> variants.size */
  size?: CalendarSize;
  /** themes/calendar.ts -> variants.view */
  view?: CalendarView;
  /** themes/calendar.ts -> variants.weekNumbers */
  weekNumbers?: CalendarWeekNumbers;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="heading" */
  "heading"?: ReactNode;
  /** content for data-slot="headingLabel" */
  "headingLabel"?: ReactNode;
  /** content for data-slot="grid" */
  "grid"?: ReactNode;
  /** content for data-slot="gridRow" */
  "gridRow"?: ReactNode;
  /** content for data-slot="gridWeekDaysRow" */
  "gridWeekDaysRow"?: ReactNode;
  /** content for data-slot="gridBody" */
  "gridBody"?: ReactNode;
  /** content for data-slot="headCell" */
  "headCell"?: ReactNode;
  /** content for data-slot="headCellWeek" */
  "headCellWeek"?: ReactNode;
  /** content for data-slot="cell" */
  "cell"?: ReactNode;
  /** content for data-slot="cellTrigger" */
  "cellTrigger"?: ReactNode;
  /** content for data-slot="cellWeek" */
  "cellWeek"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "body" | "heading" | "headingLabel" | "grid" | "gridRow" | "gridWeekDaysRow" | "gridBody" | "headCell" | "headCellWeek" | "cell" | "cellTrigger" | "cellWeek", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Calendar(props: CalendarProps): JSX.Element;
