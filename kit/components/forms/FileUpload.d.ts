import type { ReactNode } from 'react';

export type FileUploadColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type FileUploadVariant = "area" | "button";
export type FileUploadSize = "xs" | "sm" | "md" | "lg" | "xl";
export type FileUploadLayout = "list" | "grid";
export type FileUploadPosition = "inside" | "outside";
export type FileUploadDropzone = boolean;
export type FileUploadInteractive = boolean;
export type FileUploadHighlight = boolean;
export type FileUploadMultiple = boolean;
export type FileUploadDisabled = boolean;

export interface FileUploadProps {
  /** themes/file-upload.ts -> variants.color */
  color?: FileUploadColor;
  /** themes/file-upload.ts -> variants.variant */
  variant?: FileUploadVariant;
  /** themes/file-upload.ts -> variants.size */
  size?: FileUploadSize;
  /** themes/file-upload.ts -> variants.layout */
  layout?: FileUploadLayout;
  /** themes/file-upload.ts -> variants.position */
  position?: FileUploadPosition;
  /** themes/file-upload.ts -> variants.dropzone */
  dropzone?: FileUploadDropzone;
  /** themes/file-upload.ts -> variants.interactive */
  interactive?: FileUploadInteractive;
  /** themes/file-upload.ts -> variants.highlight */
  highlight?: FileUploadHighlight;
  /** themes/file-upload.ts -> variants.multiple */
  multiple?: FileUploadMultiple;
  /** themes/file-upload.ts -> variants.disabled */
  disabled?: FileUploadDisabled;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="icon" */
  "icon"?: ReactNode;
  /** content for data-slot="avatar" */
  "avatar"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** content for data-slot="files" */
  "files"?: ReactNode;
  /** content for data-slot="file" */
  "file"?: ReactNode;
  /** content for data-slot="fileLeadingAvatar" */
  "fileLeadingAvatar"?: ReactNode;
  /** content for data-slot="fileWrapper" */
  "fileWrapper"?: ReactNode;
  /** content for data-slot="fileName" */
  "fileName"?: ReactNode;
  /** content for data-slot="fileSize" */
  "fileSize"?: ReactNode;
  /** content for data-slot="fileTrailingButton" */
  "fileTrailingButton"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "wrapper" | "icon" | "avatar" | "label" | "description" | "actions" | "files" | "file" | "fileLeadingAvatar" | "fileWrapper" | "fileName" | "fileSize" | "fileTrailingButton", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function FileUpload(props: FileUploadProps): JSX.Element;
