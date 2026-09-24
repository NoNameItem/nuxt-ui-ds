import type { ReactNode } from 'react';

export type UserOrientation = "horizontal" | "vertical";
export type UserTo = boolean;
export type UserSize = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface UserProps {
  /** themes/user.ts -> variants.orientation */
  orientation?: UserOrientation;
  /** themes/user.ts -> variants.to */
  to?: UserTo;
  /** themes/user.ts -> variants.size */
  size?: UserSize;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="name" */
  "name"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="avatar" */
  "avatar"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "wrapper" | "name" | "description" | "avatar", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function User(props: UserProps): JSX.Element;
