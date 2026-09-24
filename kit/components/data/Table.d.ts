import type { ReactNode } from 'react';

export type TablePinned = boolean;
export type TableSticky = "true" | "header" | "footer";
export type TableLoading = boolean;
export type TableExternalScroll = boolean;
export type TableLoadingAnimation = "carousel" | "carousel-inverse" | "swing" | "elastic";
export type TableLoadingColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export interface TableProps {
  /** themes/table.ts -> variants.pinned */
  pinned?: TablePinned;
  /** themes/table.ts -> variants.sticky */
  sticky?: TableSticky;
  /** themes/table.ts -> variants.loading */
  loading?: TableLoading;
  /** themes/table.ts -> variants.externalScroll */
  externalScroll?: TableExternalScroll;
  /** themes/table.ts -> variants.loadingAnimation */
  loadingAnimation?: TableLoadingAnimation;
  /** themes/table.ts -> variants.loadingColor */
  loadingColor?: TableLoadingColor;
  /** one object per row; keys match the column accessors */
  data?: Array<Record<string, any>>;
  /** explicit column model — defaults to the keys of the first row */
  columns?: Array<{ accessorKey?: string; id?: string; header?: string }>;
  caption?: string;
  /** text for the empty row (default "No data") */
  empty?: string;
  loading?: boolean;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="caption" */
  "caption"?: ReactNode;
  /** content for data-slot="thead" */
  "thead"?: ReactNode;
  /** content for data-slot="tbody" */
  "tbody"?: ReactNode;
  /** content for data-slot="tfoot" */
  "tfoot"?: ReactNode;
  /** content for data-slot="tr" */
  "tr"?: ReactNode;
  /** content for data-slot="th" */
  "th"?: ReactNode;
  /** content for data-slot="td" */
  "td"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="empty" */
  "empty"?: ReactNode;
  /** content for data-slot="loading" */
  "loading"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "caption" | "thead" | "tbody" | "tfoot" | "tr" | "th" | "td" | "separator" | "empty" | "loading", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Table(props: TableProps): JSX.Element;
