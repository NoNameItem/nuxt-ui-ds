import type { ReactNode } from 'react';

export type MarqueeOrientation = "horizontal" | "vertical";
export type MarqueePauseOnHover = boolean;
export type MarqueeReverse = boolean;
export type MarqueeOverlay = boolean;

export interface MarqueeProps {
  /** themes/marquee.ts -> variants.orientation */
  orientation?: MarqueeOrientation;
  /** themes/marquee.ts -> variants.pauseOnHover */
  pauseOnHover?: MarqueePauseOnHover;
  /** themes/marquee.ts -> variants.reverse */
  reverse?: MarqueeReverse;
  /** themes/marquee.ts -> variants.overlay */
  overlay?: MarqueeOverlay;
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

export function Marquee(props: MarqueeProps): JSX.Element;
