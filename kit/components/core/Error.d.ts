import type { ReactNode } from 'react';



export interface ErrorProps {

  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="statusCode" */
  "statusCode"?: ReactNode;
  /** content for data-slot="statusMessage" */
  "statusMessage"?: ReactNode;
  /** content for data-slot="message" */
  "message"?: ReactNode;
  /** content for data-slot="links" */
  "links"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "leading" | "leadingIcon" | "statusCode" | "statusMessage" | "message" | "links", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Error(props: ErrorProps): JSX.Element;
