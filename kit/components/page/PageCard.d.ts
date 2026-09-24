import type { ReactNode } from 'react';

export type PageCardOrientation = "horizontal" | "vertical";
export type PageCardReverse = boolean;
export type PageCardVariant = "solid" | "outline" | "soft" | "subtle" | "ghost" | "naked";
export type PageCardTo = boolean;
export type PageCardTitle = boolean;
export type PageCardHighlight = boolean;
export type PageCardHighlightColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type PageCardSpotlight = boolean;
export type PageCardSpotlightColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export interface PageCardProps {
  /** themes/page-card.ts -> variants.orientation */
  orientation?: PageCardOrientation;
  /** themes/page-card.ts -> variants.reverse */
  reverse?: PageCardReverse;
  /** themes/page-card.ts -> variants.variant */
  variant?: PageCardVariant;
  /** themes/page-card.ts -> variants.to */
  to?: PageCardTo;
  /** themes/page-card.ts -> variants.title */
  title?: PageCardTitle;
  /** themes/page-card.ts -> variants.highlight */
  highlight?: PageCardHighlight;
  /** themes/page-card.ts -> variants.highlightColor */
  highlightColor?: PageCardHighlightColor;
  /** themes/page-card.ts -> variants.spotlight */
  spotlight?: PageCardSpotlight;
  /** themes/page-card.ts -> variants.spotlightColor */
  spotlightColor?: PageCardSpotlightColor;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="spotlight" */
  "spotlight"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "spotlight" | "container" | "wrapper" | "header" | "body" | "footer" | "leading" | "leadingIcon" | "title" | "description", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageCard(props: PageCardProps): JSX.Element;
