import type { ReactNode } from 'react';

export type SplitterOrientation = "horizontal" | "vertical";

export interface SplitterProps {
  /** themes/splitter.ts -> variants.orientation */
  orientation?: SplitterOrientation;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="panel" */
  "panel"?: ReactNode;
  /** content for data-slot="handle" */
  "handle"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "panel" | "handle", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Splitter(props: SplitterProps): JSX.Element;
