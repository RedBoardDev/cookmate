import type { FieldApi } from "@tanstack/react-form";

type FieldErrorProps = {
  field: FieldApi<any, any, any, any>;
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
  const errors = field.state.meta.errors;
  const isTouched = field.state.meta.isTouched;
  const isValidating = field.state.meta.isValidating;

  if (isValidating) {
    return (
      <span className="text-sm text-muted-foreground">Validating...</span>
    );
  }

  if (!isTouched || !errors.length) {
    return null;
  }

  return (
    <p className="text-sm text-destructive" role="alert">
      {errors
        .map((err) => (typeof err === "string" ? err : err.message))
        .join(", ")}
    </p>
  );
}
