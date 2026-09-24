import type { ReactNode } from 'react';

export type DashboardSidebarToggleSide = "left" | "right";

export interface DashboardSidebarToggleProps {
  /** themes/dashboard-sidebar-toggle.ts -> variants.side */
  side?: DashboardSidebarToggleSide;
  /** sidebar state — shows the close icon instead of the menu icon */
  open?: boolean;
  /** override the icon (defaults to the appConfig menu / close icon) */
  icon?: string;

  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardSidebarToggle(props: DashboardSidebarToggleProps): JSX.Element;
