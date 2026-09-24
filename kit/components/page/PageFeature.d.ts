import type { ReactNode } from 'react';

export type PageFeatureOrientation = "horizontal" | "vertical";
export type PageFeatureTo = boolean;
export type PageFeatureTitle = boolean;

export interface PageFeatureProps {
  /** themes/page-feature.ts -> variants.orientation */
  orientation?: PageFeatureOrientation;
  /** themes/page-feature.ts -> variants.to */
  to?: PageFeatureTo;
  /** themes/page-feature.ts -> variants.title */
  title?: PageFeatureTitle;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "wrapper" | "leading" | "leadingIcon" | "title" | "description", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageFeature(props: PageFeatureProps): JSX.Element;
