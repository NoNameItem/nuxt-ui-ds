import type { ReactNode } from 'react';



export interface AuthFormProps {

  title?: ReactNode;
  description?: ReactNode;
  icon?: string;
  /** one form control per entry; `type` picks the control */
  fields?: Array<{ name?: string; type?: 'text' | 'email' | 'password' | 'checkbox' | 'select' | 'otp'; label?: ReactNode; placeholder?: string; required?: boolean; description?: ReactNode; help?: ReactNode; hint?: ReactNode; items?: any[]; disabled?: boolean }>;
  /** social / SSO buttons rendered above the form */
  providers?: Array<Record<string, any>>;
  /** label on the separator between providers and fields (default "or") */
  separator?: string | false;
  /** props for the submit button (default label "Continue") */
  submit?: Record<string, any>;
  footer?: ReactNode;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="providers" */
  "providers"?: ReactNode;
  /** content for data-slot="checkbox" */
  "checkbox"?: ReactNode;
  /** content for data-slot="select" */
  "select"?: ReactNode;
  /** content for data-slot="password" */
  "password"?: ReactNode;
  /** content for data-slot="otp" */
  "otp"?: ReactNode;
  /** content for data-slot="input" */
  "input"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="form" */
  "form"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "leading" | "leadingIcon" | "title" | "description" | "body" | "providers" | "checkbox" | "select" | "password" | "otp" | "input" | "separator" | "form" | "footer", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function AuthForm(props: AuthFormProps): JSX.Element;
