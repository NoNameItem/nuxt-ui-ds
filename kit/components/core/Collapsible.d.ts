import type { ReactNode } from 'react';



export interface CollapsibleProps {

  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "content", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Collapsible(props: CollapsibleProps): JSX.Element;
