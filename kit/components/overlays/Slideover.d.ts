import type { ReactNode } from 'react';

export type SlideoverSide = "top" | "right" | "bottom" | "left";
export type SlideoverInset = boolean;
export type SlideoverTransition = boolean;

export interface SlideoverProps {
  /** themes/slideover.ts -> variants.side */
  side?: SlideoverSide;
  /** themes/slideover.ts -> variants.inset */
  inset?: SlideoverInset;
  /** themes/slideover.ts -> variants.transition */
  transition?: SlideoverTransition;
  /** content for data-slot="overlay" */
  "overlay"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"overlay" | "content" | "header" | "wrapper" | "body" | "footer" | "title" | "description" | "close", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Slideover(props: SlideoverProps): JSX.Element;
