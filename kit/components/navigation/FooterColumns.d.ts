import type { ReactNode } from 'react';

export type FooterColumnsActive = boolean;

export interface FooterColumnsProps {
  /** themes/footer-columns.ts -> variants.active */
  active?: FooterColumnsActive;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="left" */
  "left"?: ReactNode;
  /** content for data-slot="center" */
  "center"?: ReactNode;
  /** content for data-slot="right" */
  "right"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
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
  ui?: Partial<Record<"root" | "left" | "center" | "right" | "label" | "list" | "item" | "link" | "linkLeadingIcon" | "linkLabel" | "linkLabelExternalIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** FooterColumns.vue:18 — one entry per column: its label and its links */
  columns?: Array<{ label?: string; children?: Array<{ label?: string; to?: string; icon?: string; target?: string; active?: boolean; [key: string]: any }>; [key: string]: any }>;
}

export function FooterColumns(props: FooterColumnsProps): JSX.Element;
