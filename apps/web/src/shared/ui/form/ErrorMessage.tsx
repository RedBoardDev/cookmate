import type { ResponseErrorConfig } from "@/shared/lib/httpClient";

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

  const getErrorMessage = (error: ResponseErrorConfig<any>): string => {
    // 1. Check if error.error exists and is an object
    if (error.error && typeof error.error === "object") {
      // Handle API response structure: { success: false, error: { code, message } }
      if (
        "error" in error.error &&
        typeof error.error.error === "object" &&
        error.error.error !== null &&
        "message" in error.error.error &&
        typeof error.error.error.message === "string"
      ) {
        return error.error.error.message;
      }

      // Try to get message directly from error object
      if ("message" in error.error && typeof error.error.message === "string") {
        return error.error.message;
      }

      // Fallback: try to stringify if it's an unknown object
      try {
        return JSON.stringify(error.error);
      } catch {
        // If JSON.stringify fails, continue to status code mapping
      }
    }

    // 2. If error.error is a string
    if (typeof error.error === "string") {
      return error.error;
    }

    // 3. Map HTTP status codes to user-friendly messages
    switch (error.status) {
      case 400:
        return "Invalid request. Please check your input and try again.";
      case 401:
        return "Invalid email or password. Please try again.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "The requested resource was not found.";
      case 409:
        return "This resource already exists.";
      case 422:
        return "Validation error. Please check your input.";
      case 429:
        return "Too many attempts. Please try again later.";
      case 500:
        return "Server error. Please try again later.";
      case 503:
        return "Service temporarily unavailable. Please try again later.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const message = getErrorMessage(error);

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
