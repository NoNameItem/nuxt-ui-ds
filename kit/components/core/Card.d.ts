import type { ReactNode } from 'react';

export type CardVariant = "solid" | "outline" | "soft" | "subtle";

export interface CardProps {
  /** themes/card.ts -> variants.variant */
  variant?: CardVariant;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "title" | "description" | "body" | "footer", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Card(props: CardProps): JSX.Element;
