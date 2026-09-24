import type { ReactNode } from 'react';

export type DashboardSidebarMenu = boolean;
export type DashboardSidebarSide = "left" | "right";
export type DashboardSidebarToggleSide = "left" | "right";

export interface DashboardSidebarProps {
  /** themes/dashboard-sidebar.ts -> variants.menu */
  menu?: DashboardSidebarMenu;
  /** themes/dashboard-sidebar.ts -> variants.side */
  side?: DashboardSidebarSide;
  /** themes/dashboard-sidebar.ts -> variants.toggleSide */
  toggleSide?: DashboardSidebarToggleSide;
  /** panel width, in the group's unit — DashboardSidebar.vue:33 defaults to 15 */
  size?: number;
  /** the group's unit for `size` — DashboardGroup.vue:20 defaults to "%" */
  unit?: string;
  /** collapsed rail: the panel falls back to the theme's `min-w-16` */
  collapsed?: boolean;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="toggle" */
  "toggle"?: ReactNode;
  /** content for data-slot="handle" */
  "handle"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="overlay" */
  "overlay"?: ReactNode;
  /** open the mobile menu branch (closed by default) */
  open?: boolean;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "body" | "footer" | "toggle" | "handle" | "content" | "overlay", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardSidebar(props: DashboardSidebarProps): JSX.Element;
