import type { ReactNode } from 'react';

export type ToastColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ToastOrientation = "horizontal" | "vertical";
export type ToastTitle = boolean;

export interface ToastProps {
  /** themes/toast.ts -> variants.color */
  color?: ToastColor;
  /** themes/toast.ts -> variants.orientation */
  orientation?: ToastOrientation;
  /** themes/toast.ts -> variants.title */
  title?: ToastTitle;
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
  /** content for data-slot="progress" */
  "progress"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "wrapper" | "title" | "description" | "icon" | "avatar" | "avatarSize" | "actions" | "progress" | "close", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Toast(props: ToastProps): JSX.Element;
