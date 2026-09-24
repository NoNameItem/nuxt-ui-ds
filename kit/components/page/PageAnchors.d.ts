import type { ReactNode } from 'react';

export type PageAnchorsActive = boolean;

export interface PageAnchorsProps {
  /** themes/page-anchors.ts -> variants.active */
  active?: PageAnchorsActive;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="list" */
  "list"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="link" */
  "link"?: ReactNode;
  /** content for data-slot="linkLeading" */
  "linkLeading"?: ReactNode;
  /** content for data-slot="linkLeadingIcon" */
  "linkLeadingIcon"?: ReactNode;
  /** content for data-slot="linkLabel" */
  "linkLabel"?: ReactNode;
  /** content for data-slot="linkLabelExternalIcon" */
  "linkLabelExternalIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "list" | "item" | "link" | "linkLeading" | "linkLeadingIcon" | "linkLabel" | "linkLabelExternalIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function PageAnchors(props: PageAnchorsProps): JSX.Element;
