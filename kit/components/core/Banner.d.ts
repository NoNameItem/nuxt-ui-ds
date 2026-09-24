import type { ReactNode } from 'react';

export type BannerColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type BannerTo = boolean;

export interface BannerProps {
  /** themes/banner.ts -> variants.color */
  color?: BannerColor;
  /** themes/banner.ts -> variants.to */
  to?: BannerTo;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="left" */
  "left"?: ReactNode;
  /** content for data-slot="center" */
  "center"?: ReactNode;
  /** content for data-slot="right" */
  "right"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "container" | "left" | "center" | "right" | "icon" | "title" | "actions" | "close", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Banner(props: BannerProps): JSX.Element;
