import type { ReactNode } from 'react';

export type PageLinksActive = boolean;

export interface PageLinksProps {
  /** themes/page-links.ts -> variants.active */
  active?: PageLinksActive;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="list" */
  "list"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="link" */
  "link"?: ReactNode;
  /** content for data-slot="linkLeadingIcon" */
  "linkLeadingIcon"?: ReactNode;
  /** content for data-slot="linkLabel" */
  "linkLabel"?: ReactNode;
  /** content for data-slot="linkLabelExternalIcon" */
  "linkLabelExternalIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "title" | "list" | "item" | "link" | "linkLeadingIcon" | "linkLabel" | "linkLabelExternalIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function PageLinks(props: PageLinksProps): JSX.Element;
