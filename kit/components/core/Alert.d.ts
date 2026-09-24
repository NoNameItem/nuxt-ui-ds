import type { ReactNode } from 'react';

export type AlertColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type AlertVariant = "solid" | "outline" | "soft" | "subtle";
export type AlertOrientation = "horizontal" | "vertical";
export type AlertTitle = boolean;

export interface AlertProps {
  /** themes/alert.ts -> variants.color */
  color?: AlertColor;
  /** themes/alert.ts -> variants.variant */
  variant?: AlertVariant;
  /** themes/alert.ts -> variants.orientation */
  orientation?: AlertOrientation;
  /** themes/alert.ts -> variants.title */
  title?: AlertTitle;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="avatar" */
  "avatar"?: ReactNode;
  /** content for data-slot="avatarSize" */
  "avatarSize"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "wrapper" | "title" | "description" | "icon" | "avatar" | "avatarSize" | "actions" | "close", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Alert(props: AlertProps): JSX.Element;
