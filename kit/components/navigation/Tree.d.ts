import type { ReactNode } from 'react';

export type TreeVirtualize = boolean;
export type TreeColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type TreeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TreeSelected = boolean;
export type TreeDisabled = boolean;

export interface TreeProps {
  /** themes/tree.ts -> variants.virtualize */
  virtualize?: TreeVirtualize;
  /** themes/tree.ts -> variants.color */
  color?: TreeColor;
  /** themes/tree.ts -> variants.size */
  size?: TreeSize;
  /** themes/tree.ts -> variants.selected */
  selected?: TreeSelected;
  /** themes/tree.ts -> variants.disabled */
  disabled?: TreeDisabled;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="listWithChildren" */
  "listWithChildren"?: ReactNode;
  /** content for data-slot="itemWithChildren" */
  "itemWithChildren"?: ReactNode;
  /** content for data-slot="link" */
  "link"?: ReactNode;
  /** content for data-slot="linkLeadingIcon" */
  "linkLeadingIcon"?: ReactNode;
  /** content for data-slot="linkLabel" */
  "linkLabel"?: ReactNode;
  /** content for data-slot="linkTrailing" */
  "linkTrailing"?: ReactNode;
  /** content for data-slot="linkTrailingIcon" */
  "linkTrailingIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "item" | "listWithChildren" | "itemWithChildren" | "link" | "linkLeadingIcon" | "linkLabel" | "linkTrailing" | "linkTrailingIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Tree(props: TreeProps): JSX.Element;
