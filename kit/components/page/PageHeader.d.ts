import type { ReactNode } from 'react';

export type PageHeaderTitle = boolean;

export interface PageHeaderProps {
  /** themes/page-header.ts -> variants.title */
  title?: PageHeaderTitle;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="headline" */
  "headline"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="links" */
  "links"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "container" | "wrapper" | "headline" | "title" | "description" | "links", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageHeader(props: PageHeaderProps): JSX.Element;
