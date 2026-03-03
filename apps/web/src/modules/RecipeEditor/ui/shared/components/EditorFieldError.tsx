"use client";

import { FieldErrorHint, type FieldErrorHintProps } from "@/shared/ui/form/FieldErrorHint";

export type EditorFieldErrorProps = FieldErrorHintProps;

export function EditorFieldError(props: EditorFieldErrorProps) {
  return <FieldErrorHint {...props} />;
}
