import type { ReactNode } from 'react';

export type EmptySize = "xs" | "sm" | "md" | "lg" | "xl";
export type EmptyVariant = "solid" | "outline" | "soft" | "subtle" | "naked";
export type EmptyLoading = boolean;

export interface EmptyProps {
  /** themes/empty.ts -> variants.size */
  size?: EmptySize;
  /** themes/empty.ts -> variants.variant */
  variant?: EmptyVariant;
  /** themes/empty.ts -> variants.loading */
  loading?: EmptyLoading;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="avatar" */
  "avatar"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "avatar" | "title" | "description" | "body" | "actions" | "footer", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Empty(props: EmptyProps): JSX.Element;
