"use client";

import * as React from "react";
import type { FormApi } from "@tanstack/react-form";
import { cn } from "@/shared/lib/utils";

interface FormProps {
  form: FormApi<any, any>;
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * Wrapper component for TanStack Form with shadcn/ui styling
 */
export function Form({ form, children, className, onSubmit }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} className={cn(className)}>
      {children}
    </form>
  );
}
