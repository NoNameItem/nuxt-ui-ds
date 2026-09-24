import type { ReactNode } from 'react';

export type PageLeft = boolean;
export type PageRight = boolean;

export interface PageProps {
  /** themes/page.ts -> variants.left */
  left?: PageLeft;
  /** themes/page.ts -> variants.right */
  right?: PageRight;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="left" */
  "left"?: ReactNode;
  /** content for data-slot="center" */
  "center"?: ReactNode;
  /** content for data-slot="right" */
  "right"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "left" | "center" | "right", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Page(props: PageProps): JSX.Element;
