"use client";

import type { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import { CircleAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/shared/core/utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/primitives/popover";

type FieldErrorMeta = {
  readonly errors: readonly unknown[];
  readonly isTouched: boolean;
  readonly isValidating: boolean;
};

export type FieldErrorHintField = {
  readonly state: {
    readonly meta: FieldErrorMeta;
  };
};

export type FieldErrorHintProps = {
  readonly field: FieldErrorHintField;
  readonly message?: string;
  readonly className?: string;
  readonly variant?: "hover" | "inline";
};

const TECHNICAL_ERROR_PREFIXES = [
  "Too small:",
  "Too big:",
  "Invalid input",
  "Expected",
  "Unrecognized keys",
  "Invalid string",
] as const;

const isMessageDescriptor = (val: unknown): val is MessageDescriptor =>
  typeof val === "object" && val !== null && "id" in val;

type Translator = ReturnType<typeof useLingui>["t"];

const toMessage = (error: unknown, t: Translator): string | null => {
  if (!error) return null;
  if (typeof error === "string") return error;

  if (typeof error === "object") {
    if ("message" in error && typeof (error as any).message === "string") {
      return (error as any).message;
    }
    if (isMessageDescriptor(error)) {
      return t(error);
    }
  }

  return String(error);
};

const isTechnicalMessage = (message: string): boolean =>
  TECHNICAL_ERROR_PREFIXES.some((prefix) => message.startsWith(prefix));

export const hasFieldError = (field: FieldErrorHintField): boolean => {
  const { isValidating, isTouched, errors } = field.state.meta;
  if (isValidating || !isTouched) return false;
  return errors.some(Boolean);
};

export function FieldErrorHint({ field, message, className, variant = "hover" }: FieldErrorHintProps) {
  const { t } = useLingui();
  const [open, setOpen] = useState(false);

  const resolvedMessage = useMemo(() => {
    if (!hasFieldError(field)) return null;

    const firstError = field.state.meta.errors.find(Boolean);
    if (!firstError) return null;

    const rawMessage = toMessage(firstError, t);
    if (!rawMessage) return null;

    return isTechnicalMessage(rawMessage) ? (message ?? t`Please check this value`) : rawMessage;
  }, [field.state.meta, message, t]);

  if (!resolvedMessage) return null;

  if (variant === "inline") {
    return (
      <p className={cn("text-[11px] text-destructive", className)} role="alert">
        {resolvedMessage}
      </p>
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <div className={cn("inline-flex", className)}>
      <span className="sr-only" role="alert">
        {resolvedMessage}
      </span>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex h-5 w-5 items-center justify-center rounded-full",
              "text-destructive/80 transition-colors hover:text-destructive",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30",
            )}
            aria-label={resolvedMessage}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            onFocus={handleOpen}
            onBlur={handleClose}
            onClick={handleToggle}
          >
            <CircleAlert className="h-3.5 w-3.5" aria-hidden />
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="top"
          align="start"
          className={cn(
            "pointer-events-none w-auto max-w-60 rounded-md border-destructive/30",
            "bg-card px-2 py-1.5 text-[11px] leading-snug text-destructive shadow-sm",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          {resolvedMessage}
        </PopoverContent>
      </Popover>
    </div>
  );
}
