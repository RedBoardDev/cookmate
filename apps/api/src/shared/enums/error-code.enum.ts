// Please update file packages/i18n/src/errors/api-error-descriptors.ts too

export enum ErrorCode {
  // ============================================
  // Generic HTTP Errors
  // ============================================
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  CONFLICT = "CONFLICT",
  INTERNAL_ERROR = "INTERNAL_ERROR",

  // ============================================
  // Validation Errors
  // ============================================
  VALIDATION_ERROR = "VALIDATION_ERROR",
  INVALID_BODY = "INVALID_BODY",
  MISSING_BODY = "MISSING_BODY",
  INVALID_QUERY_PARAMETER = "INVALID_QUERY_PARAMETER",
  MISSING_QUERY_PARAMETER = "MISSING_QUERY_PARAMETER",
  INVALID_PATH_PARAMETER = "INVALID_PATH_PARAMETER",

  // ============================================
  // Authentication & Authorization Errors
  // ============================================
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  EXPIRED_TOKEN = "EXPIRED_TOKEN",
  REVOKED_TOKEN = "REVOKED_TOKEN",
  MISSING_TOKEN = "MISSING_TOKEN",
  INVALID_TOKEN = "INVALID_TOKEN",

  // ============================================
  // Resource Errors
  // ============================================
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
  RESOURCE_DELETED = "RESOURCE_DELETED",
  RESOURCE_EXPIRED = "RESOURCE_EXPIRED",
  RESOURCE_INACCESSIBLE = "RESOURCE_INACCESSIBLE",
  INVALID_FOREIGN_KEY = "INVALID_FOREIGN_KEY",

  // ============================================
  // Database Errors
  // ============================================
  DATABASE_ERROR = "DATABASE_ERROR",
  DATABASE_CONNECTION_ERROR = "DATABASE_CONNECTION_ERROR",

  // ============================================
  // Rate Limiting
  // ============================================
  RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",

  // ============================================
  // External Services
  // ============================================
  EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",
  EXTERNAL_SERVICE_TIMEOUT = "EXTERNAL_SERVICE_TIMEOUT",

  // ============================================
  // Recipe Parsing
  // ============================================
  PARSING_FAILED = "PARSING_FAILED",
  INVALID_INPUT = "INVALID_INPUT",
  PARSING_TIMEOUT = "PARSING_TIMEOUT",
  PARSING_JOB_NOT_FOUND = "PARSING_JOB_NOT_FOUND",
}
