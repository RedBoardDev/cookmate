"use client";

import type { MessageDescriptor } from "@lingui/core";
import { Trans, useLingui } from "@lingui/react/macro";

type FieldErrorMeta = {
  errors: readonly unknown[];
  isTouched: boolean;
  isValidating: boolean;
};

type FieldErrorProps = {
  field: { state: { meta: FieldErrorMeta } };
};

/**
 * Displays validation errors for a form field
 *
 * Features:
 * - Only shows errors after field is touched
 * - Shows validating state
 * - Accessible with role="alert"
 * - Supports multiple error messages
 *
 * @example
 * ```tsx
 * <form.Field name="email">
 *   {(field) => (
 *     <div>
 *       <input {...field} />
 *       <FieldError field={field} />
 *     </div>
 *   )}
 * </form.Field>
 * ```
 */
export function FieldError({ field }: FieldErrorProps) {
  const { t } = useLingui();
  const errors = field.state.meta.errors;
  const isTouched = field.state.meta.isTouched;
  const isValidating = field.state.meta.isValidating;

  if (isValidating) {
    return (
      <span className="text-sm text-muted-foreground">
        <Trans>Validating...</Trans>
      </span>
    );
  }

  if (!isTouched || !errors.length) {
    return null;
  }

  const messages = errors
    .filter((err): err is NonNullable<typeof err> => err != null)
    .map((err) => {
      if (typeof err === "string") return err;
      if (typeof err === "object" && "message" in err) {
        return (err as { message: string }).message;
      }
      if (typeof err === "object" && "id" in err) {
        return t(err as MessageDescriptor);
      }
      return String(err);
    });

  if (messages.length === 0) return null;

  return (
    <p className="text-sm text-destructive" role="alert">
      {messages.join(", ")}
    </p>
  );
}
