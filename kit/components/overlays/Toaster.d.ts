import type { ReactNode } from 'react';

export type ToasterPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export type ToasterSwipeDirection = "up" | "right" | "down" | "left";

export interface ToasterProps {
  /** themes/toaster.ts -> variants.position */
  position?: ToasterPosition;
  /** themes/toaster.ts -> variants.swipeDirection */
  swipeDirection?: ToasterSwipeDirection;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"viewport" | "base", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Toaster(props: ToasterProps): JSX.Element;
