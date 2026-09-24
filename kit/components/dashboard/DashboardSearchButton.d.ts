import type { ReactNode } from 'react';

export type DashboardSearchButtonCollapsed = boolean;

export interface DashboardSearchButtonProps {
  /** themes/dashboard-search-button.ts -> variants.collapsed */
  collapsed?: DashboardSearchButtonCollapsed;
  /** leading icon (default appConfig search) */
  icon?: string;
  /** label (default "Search…") */
  label?: string;
  /** shortcut keys shown as Kbd in the trailing slot (default ["meta","k"]) */
  kbds?: string[];
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral';
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link';
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"base" | "label" | "trailing", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function DashboardSearchButton(props: DashboardSearchButtonProps): JSX.Element;
