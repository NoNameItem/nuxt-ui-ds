import type { ReactNode } from 'react';

export type PageLogosMarquee = boolean;

export interface PageLogosProps {
  /** themes/page-logos.ts -> variants.marquee */
  marquee?: PageLogosMarquee;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="logos" */
  "logos"?: ReactNode;
  /** content for data-slot="logo" */
  "logo"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "title" | "logos" | "logo", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function PageLogos(props: PageLogosProps): JSX.Element;
