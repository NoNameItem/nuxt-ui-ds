import type { ReactNode } from 'react';

export type ScrollAreaOrientation = "vertical" | "horizontal";
export type ScrollAreaExternalScroll = boolean;

export interface ScrollAreaProps {
  /** themes/scroll-area.ts -> variants.orientation */
  orientation?: ScrollAreaOrientation;
  /** themes/scroll-area.ts -> variants.externalScroll */
  externalScroll?: ScrollAreaExternalScroll;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "viewport" | "item", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function ScrollArea(props: ScrollAreaProps): JSX.Element;
