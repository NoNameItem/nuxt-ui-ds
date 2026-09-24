import type { ReactNode } from 'react';



export interface PageAsideProps {

  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="top" */
  "top"?: ReactNode;
  /** content for data-slot="topHeader" */
  "topHeader"?: ReactNode;
  /** content for data-slot="topBody" */
  "topBody"?: ReactNode;
  /** content for data-slot="topFooter" */
  "topFooter"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "container" | "top" | "topHeader" | "topBody" | "topFooter", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageAside(props: PageAsideProps): JSX.Element;
