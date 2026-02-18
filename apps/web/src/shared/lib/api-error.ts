import { getErrorDescriptor, getFallbackErrorDescriptorFromStatus } from "@cookmate/i18n";
import type { MessageDescriptor } from "@lingui/core";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";

/** Type-safe alias — use instead of `ResponseErrorConfig<any>`. */
export type ApiError = ResponseErrorConfig<unknown>;

type ApiErrorEnvelope = {
  success: false;
  error: {
    code?: unknown;
    args?: unknown;
    details?: unknown;
  };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Extracts `error.code` from the API error response.
 */
export function extractApiErrorCode(error: ResponseErrorConfig<unknown>): string | null {
  const payload = error.error;
  if (!isRecord(payload)) {
    return null;
  }

  // Primary shape: { success: false, error: { code, args?, details? } }
  if ("error" in payload && isRecord(payload.error)) {
    const code = (payload as ApiErrorEnvelope).error.code;
    return typeof code === "string" ? code : null;
  }

  // Fallback shape: { code: "..." }
  if ("code" in payload && typeof payload.code === "string") {
    return payload.code;
  }

  return null;
}

/**
 * Extracts `error.args` from the API error response.
 */
export function extractApiErrorArgs(
  error: ResponseErrorConfig<unknown>,
): Record<string, string | number | boolean> | null {
  const payload = error.error;
  if (!isRecord(payload)) {
    return null;
  }

  if ("error" in payload && isRecord(payload.error)) {
    const args = (payload as ApiErrorEnvelope).error.args;
    if (isRecord(args)) {
      // Validate that all values are safe types
      const safeArgs: Record<string, string | number | boolean> = {};
      for (const [key, value] of Object.entries(args)) {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          safeArgs[key] = value;
        }
      }
      return Object.keys(safeArgs).length > 0 ? safeArgs : null;
    }
  }

  return null;
}

/**
 * Returns translated error message. Use in callbacks where you already have `t` from `useLingui()`.
 */
export function getUserFacingErrorMessage(
  t: (descriptor: MessageDescriptor) => string,
  error: ResponseErrorConfig<unknown>,
): string {
  const code = extractApiErrorCode(error);
  let descriptor: MessageDescriptor | null = null;

  if (code) {
    descriptor = getErrorDescriptor(code);
  }

  if (!descriptor) {
    descriptor = getFallbackErrorDescriptorFromStatus(error.status);
  }

  return t(descriptor ?? getFallbackErrorDescriptorFromStatus(0));
}
