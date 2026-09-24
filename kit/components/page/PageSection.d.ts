import type { ReactNode } from 'react';

export type PageSectionOrientation = "horizontal" | "vertical";
export type PageSectionReverse = boolean;
export type PageSectionHeadline = boolean;
export type PageSectionTitle = boolean;
export type PageSectionDescription = boolean;
export type PageSectionBody = boolean;

export interface PageSectionProps {
  /** themes/page-section.ts -> variants.orientation */
  orientation?: PageSectionOrientation;
  /** themes/page-section.ts -> variants.reverse */
  reverse?: PageSectionReverse;
  /** themes/page-section.ts -> variants.headline */
  headline?: PageSectionHeadline;
  /** themes/page-section.ts -> variants.title */
  title?: PageSectionTitle;
  /** themes/page-section.ts -> variants.description */
  description?: PageSectionDescription;
  /** themes/page-section.ts -> variants.body */
  body?: PageSectionBody;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="headline" */
  "headline"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="features" */
  "features"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="links" */
  "links"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "container" | "wrapper" | "header" | "leading" | "leadingIcon" | "headline" | "title" | "description" | "body" | "features" | "footer" | "links", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageSection(props: PageSectionProps): JSX.Element;
