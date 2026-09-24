import type { ReactNode } from 'react';



export interface FooterProps {

  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="top" */
  "top"?: ReactNode;
  /** content for data-slot="bottom" */
  "bottom"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="left" */
  "left"?: ReactNode;
  /** content for data-slot="center" */
  "center"?: ReactNode;
  /** content for data-slot="right" */
  "right"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "top" | "bottom" | "container" | "left" | "center" | "right", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Footer(props: FooterProps): JSX.Element;
