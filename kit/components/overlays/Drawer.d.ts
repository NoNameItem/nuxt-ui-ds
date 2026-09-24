import type { ReactNode } from 'react';

export type DrawerDirection = "top" | "right" | "bottom" | "left";
export type DrawerInset = boolean;
export type DrawerSnapPoints = boolean;

export interface DrawerProps {
  /** themes/drawer.ts -> variants.direction */
  direction?: DrawerDirection;
  /** themes/drawer.ts -> variants.inset */
  inset?: DrawerInset;
  /** themes/drawer.ts -> variants.snapPoints */
  snapPoints?: DrawerSnapPoints;
  /** content for data-slot="overlay" */
  "overlay"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="handle" */
  "handle"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"overlay" | "content" | "handle" | "container" | "header" | "wrapper" | "title" | "description" | "actions" | "body" | "footer" | "close", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Drawer(props: DrawerProps): JSX.Element;
