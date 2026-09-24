import type { ReactNode } from 'react';



export interface DashboardToolbarProps {

  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="left" */
  "left"?: ReactNode;
  /** content for data-slot="right" */
  "right"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "left" | "right", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardToolbar(props: DashboardToolbarProps): JSX.Element;
