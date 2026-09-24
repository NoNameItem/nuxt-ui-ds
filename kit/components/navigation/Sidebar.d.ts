import type { ReactNode } from 'react';

export type SidebarTransition = boolean;
export type SidebarSide = "left" | "right";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";
export type SidebarVariant = "sidebar" | "floating" | "inset";

export interface SidebarProps {
  /** themes/sidebar.ts -> variants.transition */
  transition?: SidebarTransition;
  /** themes/sidebar.ts -> variants.side */
  side?: SidebarSide;
  /** themes/sidebar.ts -> variants.collapsible */
  collapsible?: SidebarCollapsible;
  /** themes/sidebar.ts -> variants.variant */
  variant?: SidebarVariant;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="gap" */
  "gap"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="inner" */
  "inner"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="rail" */
  "rail"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "gap" | "container" | "inner" | "header" | "wrapper" | "title" | "description" | "actions" | "close" | "body" | "footer" | "rail", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Sidebar(props: SidebarProps): JSX.Element;
