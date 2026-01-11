"use client";

import * as React from "react";
import type { FieldApi } from "@tanstack/react-form";
import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/primitives/label";

interface FormFieldProps<T> {
  field: FieldApi<T, any, any, any>;
  label?: string;
  children: (field: FieldApi<T, any, any, any>) => React.ReactNode;
  className?: string;
}

/**
 * * Wrapper component for TanStack Form fields with shadcn/ui styling
 */
export function FormField<T>({
  field,
  label,
  children,
  className
}: FormFieldProps<T>) {
  // * Safely access errors with fallback
  const errors = (field.meta?.errors as string[] | undefined) ?? [];
  const hasError = errors.length > 0;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={field.name}>
          {label}
          {hasError && <span className="sr-only"> (has error)</span>}
        </Label>
      )}
      {children(field)}
      {hasError && (
        <p className="text-sm text-destructive" role="alert">
          {errors[0]}
        </p>
      )}
    </div>
  );
}
