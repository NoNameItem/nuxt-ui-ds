import type { ReactNode } from 'react';

/** Popover.vue's `content` prop — reka PopperContent placement (defaults: side "bottom", align "center", sideOffset 8, collisionPadding 8). */
export interface PopoverContentOptions {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
}

export interface PopoverProps {
  open?: boolean;
  /** a plain object: the placement (Vue's `:content` prop). A React element or string: the `#content` slot, as before. */
  "content"?: PopoverContentOptions | ReactNode;
  /** the `#content` slot when `content` holds the placement — pass both to set placement and content together */
  "contentSlot"?: ReactNode;
  /** false keeps the panel inside the component's markup instead of document.body (default true) */
  portal?: boolean;
  /** content for data-slot="arrow" */
  "arrow"?: ReactNode | boolean | { width?: number; height?: number; rounded?: boolean; class?: string };
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"content" | "arrow", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Popover(props: PopoverProps): JSX.Element;
