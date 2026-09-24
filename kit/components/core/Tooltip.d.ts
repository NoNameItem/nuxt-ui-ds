import type { ReactNode } from 'react';



export interface TooltipProps {

  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="arrow" */
  "arrow"?: ReactNode;
  /** content for data-slot="text" */
  "text"?: ReactNode;
  /** content for data-slot="kbds" */
  "kbds"?: ReactNode;
  /** content for data-slot="kbdsSize" */
  "kbdsSize"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"content" | "arrow" | "text" | "kbds" | "kbdsSize", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Tooltip(props: TooltipProps): JSX.Element;
