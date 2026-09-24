import type { ReactNode } from 'react';

export interface PaginationProps {
  /** current page, 1-based */
  page?: number;
  /** total number of items */
  total?: number;
  itemsPerPage?: number;
  /** pages shown either side of the current one */
  siblingCount?: number;
  /** show the first/last buttons */
  showEdges?: boolean;
  /** show the prev/next buttons */
  showControls?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link';
  activeColor?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  activeVariant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<'root' | 'list' | 'ellipsis' | 'label' | 'first' | 'prev' | 'item' | 'next' | 'last', string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Pagination(props: PaginationProps): JSX.Element;
