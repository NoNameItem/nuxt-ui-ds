import type { ReactNode } from 'react';

export type HeaderToggleSide = "left" | "right";

export interface HeaderProps {
  /** themes/header.ts -> variants.toggleSide */
  toggleSide?: HeaderToggleSide;
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
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="toggle" */
  "toggle"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="overlay" */
  "overlay"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "container" | "left" | "center" | "right" | "title" | "toggle" | "content" | "overlay" | "header" | "body", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Header(props: HeaderProps): JSX.Element;
