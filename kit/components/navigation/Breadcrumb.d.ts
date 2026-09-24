import type { ReactNode } from 'react';

export type BreadcrumbActive = boolean;
export type BreadcrumbDisabled = boolean;
export type BreadcrumbTo = boolean;
export type BreadcrumbColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";

export interface BreadcrumbProps {
  /** themes/breadcrumb.ts -> variants.active */
  active?: BreadcrumbActive;
  /** themes/breadcrumb.ts -> variants.disabled */
  disabled?: BreadcrumbDisabled;
  /** themes/breadcrumb.ts -> variants.to */
  to?: BreadcrumbTo;
  /** themes/breadcrumb.ts -> variants.color */
  color?: BreadcrumbColor;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="list" */
  "list"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="link" */
  "link"?: ReactNode;
  /** content for data-slot="linkLeadingIcon" */
  "linkLeadingIcon"?: ReactNode;
  /** content for data-slot="linkLeadingAvatar" */
  "linkLeadingAvatar"?: ReactNode;
  /** content for data-slot="linkLeadingAvatarSize" */
  "linkLeadingAvatarSize"?: ReactNode;
  /** content for data-slot="linkLabel" */
  "linkLabel"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="separatorIcon" */
  "separatorIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "list" | "item" | "link" | "linkLeadingIcon" | "linkLeadingAvatar" | "linkLeadingAvatarSize" | "linkLabel" | "separator" | "separatorIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function Breadcrumb(props: BreadcrumbProps): JSX.Element;
