"use client";

import type { ResponseErrorConfig } from "@/shared/core/network/httpClient";
import { useUserFacingErrorMessage } from "@/shared/core/network/use-api-error";

type ErrorMessageProps = {
  error: ResponseErrorConfig<unknown> | null;
};

/**
 * Displays network/server errors
 *
 * Features:
 * - Maps error codes to user-friendly messages
 * - Accessible with role="alert"
 * - Styled for destructive/error state
 * - Handles various error shapes
 *
 * @example
 * ```tsx
 * const { mutation } = useLoginForm();
 *
 * return (
 *   <form>
 *     <ErrorMessage error={mutation.error} />
 *     <button type="submit">Submit</button>
 *   </form>
 * );
 * ```
 */
export function ErrorMessage({ error }: ErrorMessageProps) {
  const message = useUserFacingErrorMessage(error);

  if (!message) return null;

  return (
    <div className="rounded-md bg-destructive/10 p-3 border border-destructive/20" role="alert">
      <p className="text-sm font-medium text-destructive">{message}</p>
    </div>
  );
}
