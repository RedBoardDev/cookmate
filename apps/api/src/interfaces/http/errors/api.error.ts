import type { ApiErrorArgs } from "@/interfaces/http/helpers/reply";
import { ErrorCode } from "@/shared/enums/error-code.enum";
import { HttpStatus } from "@/shared/enums/http-status.enum";

export class ApiError extends Error {
  readonly type = "ApiError";

  constructor(
    public readonly httpStatus: HttpStatus,
    public readonly code: ErrorCode,
    message?: string,
    public readonly details?: unknown,
    public readonly args?: ApiErrorArgs,
  ) {
    super(message ?? code);
    this.name = "ApiError";
  }

  // ============================================
  // Generic HTTP Errors
  // ============================================

  static badRequest(message = "Bad request", details?: unknown) {
    return new ApiError(HttpStatus.BadRequest, ErrorCode.BAD_REQUEST, message, details);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(HttpStatus.Unauthorized, ErrorCode.UNAUTHORIZED, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(HttpStatus.Forbidden, ErrorCode.FORBIDDEN, message);
  }

  static notFound(message = "Not found") {
    return new ApiError(HttpStatus.NotFound, ErrorCode.NOT_FOUND, message);
  }

  static conflict(message = "Conflict") {
    return new ApiError(HttpStatus.Conflict, ErrorCode.CONFLICT, message);
  }

  static internal(message = "Internal server error") {
    return new ApiError(HttpStatus.InternalServerError, ErrorCode.INTERNAL_ERROR, message);
  }

  // ============================================
  // Validation Errors
  // ============================================

  static validation(message = "Validation failed", details?: unknown) {
    return new ApiError(HttpStatus.BadRequest, ErrorCode.VALIDATION_ERROR, message, details);
  }

  static invalidBody(message = "Invalid request body", details?: unknown) {
    return new ApiError(HttpStatus.BadRequest, ErrorCode.INVALID_BODY, message, details);
  }

  static missingBody(message = "Request body is required") {
    return new ApiError(HttpStatus.BadRequest, ErrorCode.MISSING_BODY, message);
  }

  static invalidQueryParam(message = "Invalid query parameter", details?: unknown) {
    return new ApiError(HttpStatus.BadRequest, ErrorCode.INVALID_QUERY_PARAMETER, message, details);
  }

  static invalidPathParam(message = "Invalid path parameter", details?: unknown) {
    return new ApiError(HttpStatus.BadRequest, ErrorCode.INVALID_PATH_PARAMETER, message, details);
  }

  // ============================================
  // Authentication & Authorization Errors
  // ============================================

  static invalidCredentials(message = "Invalid credentials") {
    return new ApiError(HttpStatus.Unauthorized, ErrorCode.INVALID_CREDENTIALS, message);
  }

  static expiredToken(message = "Token has expired") {
    return new ApiError(HttpStatus.Unauthorized, ErrorCode.EXPIRED_TOKEN, message);
  }

  static revokedToken(message = "Token has been revoked") {
    return new ApiError(HttpStatus.Unauthorized, ErrorCode.REVOKED_TOKEN, message);
  }

  static missingToken(message = "Authentication token is required") {
    return new ApiError(HttpStatus.Unauthorized, ErrorCode.MISSING_TOKEN, message);
  }

  static invalidToken(message = "Invalid authentication token") {
    return new ApiError(HttpStatus.Unauthorized, ErrorCode.INVALID_TOKEN, message);
  }

  // ============================================
  // Resource Errors
  // ============================================

  static resourceNotFound(message = "Resource not found") {
    return new ApiError(HttpStatus.NotFound, ErrorCode.RESOURCE_NOT_FOUND, message);
  }

  static resourceAlreadyExists(message = "Resource already exists", details?: unknown) {
    return new ApiError(HttpStatus.Conflict, ErrorCode.RESOURCE_ALREADY_EXISTS, message, details);
  }

  static resourceDeleted(message = "Resource has been deleted") {
    return new ApiError(HttpStatus.Gone, ErrorCode.RESOURCE_DELETED, message);
  }

  static resourceInaccessible(message = "Resource is not accessible") {
    return new ApiError(HttpStatus.Forbidden, ErrorCode.RESOURCE_INACCESSIBLE, message);
  }

  static invalidForeignKey(message = "Related resource not found") {
    return new ApiError(HttpStatus.BadRequest, ErrorCode.INVALID_FOREIGN_KEY, message);
  }

  // ============================================
  // Database Errors
  // ============================================

  static database(message = "Database error") {
    return new ApiError(HttpStatus.InternalServerError, ErrorCode.DATABASE_ERROR, message);
  }

  static databaseConnection(message = "Database connection failed") {
    return new ApiError(HttpStatus.ServiceUnavailable, ErrorCode.DATABASE_CONNECTION_ERROR, message);
  }

  // ============================================
  // Rate Limiting
  // ============================================

  static rateLimitExceeded(message = "Too many requests") {
    return new ApiError(HttpStatus.TooManyRequests, ErrorCode.RATE_LIMIT_EXCEEDED, message);
  }

  // ============================================
  // External Services
  // ============================================

  static externalServiceError(message = "External service error") {
    return new ApiError(HttpStatus.BadGateway, ErrorCode.EXTERNAL_SERVICE_ERROR, message);
  }

  static externalServiceTimeout(message = "External service timeout") {
    return new ApiError(HttpStatus.GatewayTimeout, ErrorCode.EXTERNAL_SERVICE_TIMEOUT, message);
  }
}
