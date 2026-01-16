import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

/**
 * User-facing error messages (shared across web/mobile).
 *
 * Important: The API returns stable `error.code`. The UI is responsible for localization.
 * We use Lingui macros (`msg`) so the extractor automatically picks up these messages.
 */

// Fallback messages (for network/unknown errors)
const unknownError = msg`An unexpected error occurred. Please try again.`;
const networkError = msg`Network error. Please check your connection and try again.`;
const serviceUnavailable = msg`Service temporarily unavailable. Please try again later.`;
const serverError = msg`Server error. Please try again later.`;

// API error code mappings
const byCode: Record<string, MessageDescriptor> = {
  // Generic HTTP codes
  BAD_REQUEST: msg`Invalid request. Please check your input and try again.`,
  UNAUTHORIZED: msg`You are not authenticated. Please sign in and try again.`,
  FORBIDDEN: msg`You don't have permission to perform this action.`,
  NOT_FOUND: msg`The requested resource was not found.`,
  CONFLICT: msg`This action can't be completed because of a conflict.`,
  INTERNAL_ERROR: serverError,

  // Validation
  VALIDATION_ERROR: msg`Validation error. Please check your input.`,
  INVALID_BODY: msg`Invalid request body.`,
  MISSING_BODY: msg`Request body is required.`,
  INVALID_QUERY_PARAMETER: msg`Invalid query parameter.`,
  MISSING_QUERY_PARAMETER: msg`Missing query parameter.`,
  INVALID_PATH_PARAMETER: msg`Invalid path parameter.`,

  // Auth
  INVALID_CREDENTIALS: msg`Invalid email or password.`,
  EXPIRED_TOKEN: msg`Your session has expired. Please sign in again.`,
  REVOKED_TOKEN: msg`Your session is no longer valid. Please sign in again.`,
  MISSING_TOKEN: msg`You are not authenticated. Please sign in and try again.`,
  INVALID_TOKEN: msg`You are not authenticated. Please sign in and try again.`,

  // Resource
  RESOURCE_NOT_FOUND: msg`The requested resource was not found.`,
  RESOURCE_ALREADY_EXISTS: msg`This resource already exists.`,
  RESOURCE_DELETED: msg`This resource is no longer available.`,
  RESOURCE_EXPIRED: msg`This resource is no longer available.`,
  RESOURCE_INACCESSIBLE: msg`This resource is not accessible.`,
  INVALID_FOREIGN_KEY: msg`A related resource was not found.`,

  // Database
  DATABASE_ERROR: serverError,
  DATABASE_CONNECTION_ERROR: serviceUnavailable,

  // Rate limit
  RATE_LIMIT_EXCEEDED: msg`Too many attempts. Please try again later.`,

  // External services
  EXTERNAL_SERVICE_ERROR: msg`External service error. Please try again later.`,
  EXTERNAL_SERVICE_TIMEOUT: msg`External service timeout. Please try again later.`,

  // Domain codes (examples - add more as needed)
  EQUIPMENT_NOT_FOUND: msg`Equipment not found.`,
  INVALID_EQUIPMENT_DATA: msg`Invalid equipment data.`,
};

export type ErrorMessageArgs = Record<string, string | number | boolean>;

export function isKnownErrorCode(code: string): boolean {
  return code in byCode;
}

export function getErrorDescriptor(code: string): MessageDescriptor | null {
  return byCode[code] ?? null;
}

export function getFallbackErrorDescriptorFromStatus(status: number): MessageDescriptor {
  // 0 is common for fetch/network errors in some stacks
  if (status === 0) {
    return networkError;
  }

  if (status === 503) {
    return serviceUnavailable;
  }

  if (status >= 500) {
    return serverError;
  }

  return unknownError;
}

