import type { ReactNode } from 'react';

export type DashboardPanelSize = boolean;

export interface DashboardPanelProps {
  /** themes/dashboard-panel.ts -> variants.size */
  size?: DashboardPanelSize;
  /** panel width in the group's unit — DashboardPanel.vue:20; when set, the
   *  theme's `size` variant turns on and the root gets `--width` */
  defaultSize?: number;
  /** the group's unit for `defaultSize` — DashboardGroup.vue:20 defaults to "%" */
  unit?: string;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" — a DashboardNavbar goes here */
  "header"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="handle" */
  "handle"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "body" | "handle", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardPanel(props: DashboardPanelProps): JSX.Element;
