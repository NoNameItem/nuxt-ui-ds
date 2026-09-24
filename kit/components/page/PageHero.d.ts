import type { ReactNode } from 'react';

export type PageHeroOrientation = "horizontal" | "vertical";
export type PageHeroReverse = boolean;
export type PageHeroHeadline = boolean;
export type PageHeroTitle = boolean;

export interface PageHeroProps {
  /** themes/page-hero.ts -> variants.orientation */
  orientation?: PageHeroOrientation;
  /** themes/page-hero.ts -> variants.reverse */
  reverse?: PageHeroReverse;
  /** themes/page-hero.ts -> variants.headline */
  headline?: PageHeroHeadline;
  /** themes/page-hero.ts -> variants.title */
  title?: PageHeroTitle;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="headline" */
  "headline"?: ReactNode;
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
  ui?: Partial<Record<"root" | "container" | "wrapper" | "header" | "headline" | "title" | "description" | "body" | "footer" | "links", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageHero(props: PageHeroProps): JSX.Element;
