import type { ReactNode } from 'react';

export type CarouselOrientation = "vertical" | "horizontal";
export type CarouselActive = boolean;

export interface CarouselProps {
  /** themes/carousel.ts -> variants.orientation */
  orientation?: CarouselOrientation;
  /** themes/carousel.ts -> variants.active */
  active?: CarouselActive;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="controls" */
  "controls"?: ReactNode;
  /** content for data-slot="arrows" */
  "arrows"?: ReactNode;
  /** content for data-slot="prev" */
  "prev"?: ReactNode;
  /** content for data-slot="next" */
  "next"?: ReactNode;
  /** content for data-slot="dots" */
  "dots"?: ReactNode;
  /** content for data-slot="dot" */
  "dot"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "viewport" | "container" | "item" | "controls" | "arrows" | "prev" | "next" | "dots" | "dot", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function Carousel(props: CarouselProps): JSX.Element;
