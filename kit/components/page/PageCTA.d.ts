import type { ReactNode } from 'react';

export type PageCTAOrientation = "horizontal" | "vertical";
export type PageCTAReverse = boolean;
export type PageCTAVariant = "solid" | "outline" | "soft" | "subtle" | "naked";
export type PageCTATitle = boolean;

export interface PageCTAProps {
  /** themes/page-cta.ts -> variants.orientation */
  orientation?: PageCTAOrientation;
  /** themes/page-cta.ts -> variants.reverse */
  reverse?: PageCTAReverse;
  /** themes/page-cta.ts -> variants.variant */
  variant?: PageCTAVariant;
  /** themes/page-cta.ts -> variants.title */
  title?: PageCTATitle;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="links" */
  "links"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "container" | "wrapper" | "header" | "title" | "description" | "body" | "footer" | "links", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageCTA(props: PageCTAProps): JSX.Element;
