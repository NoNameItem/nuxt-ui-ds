import type { ReactNode } from 'react';

export type PageListDivide = boolean;

export interface PageListProps {
  /** themes/page-list.ts -> variants.divide */
  divide?: PageListDivide;

  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageList(props: PageListProps): JSX.Element;
