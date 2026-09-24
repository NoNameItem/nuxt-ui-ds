import type { ReactNode } from 'react';

export type DashboardNavbarToggleSide = "left" | "right";

export interface DashboardNavbarProps {
  /** themes/dashboard-navbar.ts -> variants.toggleSide */
  toggleSide?: DashboardNavbarToggleSide;
  title?: ReactNode;
  icon?: string;
  /** show the sidebar toggle (default true) */
  toggle?: boolean;
  toggleSide?: 'left' | 'right';
  center?: ReactNode;
  right?: ReactNode;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="left" */
  "left"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="center" */
  "center"?: ReactNode;
  /** content for data-slot="right" */
  "right"?: ReactNode;
  /** content for data-slot="toggle" */
  "toggle"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "left" | "icon" | "title" | "center" | "right" | "toggle", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardNavbar(props: DashboardNavbarProps): JSX.Element;
