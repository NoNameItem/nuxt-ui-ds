import type { ReactNode } from 'react';

export type DashboardSearchFullscreen = boolean;
export type DashboardSearchSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface DashboardSearchProps {
  /** themes/dashboard-search.ts -> variants.fullscreen */
  fullscreen?: DashboardSearchFullscreen;
  /** themes/dashboard-search.ts -> variants.size */
  size?: DashboardSearchSize;
  /** content for data-slot="modal" */
  "modal"?: ReactNode;
  /** content for data-slot="input" */
  "input"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"modal" | "input", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardSearch(props: DashboardSearchProps): JSX.Element;
