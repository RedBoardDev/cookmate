"use client";

import { Trans } from "@lingui/react/macro";
import type * as React from "react";
import { cn } from "@/shared/core/utils/cn";
import { Label } from "./label";

/** Structural type matching TanStack FieldApi — avoids coupling to its 23 generic params. */
export type FieldErrorMeta = {
  state: {
    meta: {
      errors: readonly unknown[];
    };
  };
  name: string;
};

interface FormFieldProps {
  field: FieldErrorMeta;
  label?: string;
  children: (field: FieldErrorMeta) => React.ReactNode;
  className?: string;
}

function extractErrorMessage(error: unknown): string | undefined {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  return undefined;
}

/**
 * Wrapper component for TanStack Form fields with shadcn/ui styling
 */
export function FormField({ field, label, children, className }: FormFieldProps) {
  const firstError = field.state.meta.errors.find((e) => e !== undefined);
  const errorMessage = extractErrorMessage(firstError);
  const hasError = errorMessage !== undefined;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={field.name}>
          {label}
          {hasError && (
            <span className="sr-only">
              {" "}
              <Trans>(has error)</Trans>
            </span>
          )}
        </Label>
      )}
      {children(field)}
      {hasError && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
