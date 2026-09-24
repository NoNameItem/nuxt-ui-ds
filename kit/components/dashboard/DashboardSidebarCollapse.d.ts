import type { ReactNode } from 'react';

export type DashboardSidebarCollapseSide = "left" | "right";

export interface DashboardSidebarCollapseProps {
  /** themes/dashboard-sidebar-collapse.ts -> variants.side */
  side?: DashboardSidebarCollapseSide;

  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardSidebarCollapse(props: DashboardSidebarCollapseProps): JSX.Element;
