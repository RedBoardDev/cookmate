import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import { useUserFacingErrorMessage } from "@/shared/lib/api-error";

type ErrorMessageProps = {
  error: ResponseErrorConfig<any> | null;
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
  if (!error) return null;

  const message = useUserFacingErrorMessage(error);

  return (
    <div
      className="rounded-md bg-destructive/10 p-3 border border-destructive/20"
      role="alert"
    >
      <p className="text-sm font-medium text-destructive">
        {message}
      </p>
    </div>
  );
}
