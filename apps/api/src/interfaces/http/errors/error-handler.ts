import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "./api.error";
import { DomainError } from "@/domain/errors/domain.error";
import { formatError } from "@/interfaces/http/helpers/reply";
import { ErrorCode } from "@/shared/enums/error-code.enum";
import { HttpStatus } from "@/shared/enums/http-status.enum";

/**
 * Global error handler for Fastify.
 * Transforms all errors into a consistent API response format.
 */
export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  request.log.error(error);

  // ApiError - already formatted
  if (error instanceof ApiError) {
    return reply
      .status(error.httpStatus)
      .send(formatError(error.code, error.message, error.details));
  }

  // DomainError - business rule violation (uses its own code and httpStatus)
  if (error instanceof DomainError) {
    return reply
      .status(error.httpStatus)
      .send(formatError(error.code, error.message));
  }

  // Fastify validation error (from Zod type provider)
  if (error.validation) {
    return reply
      .status(HttpStatus.BadRequest)
      .send(formatError(ErrorCode.VALIDATION_ERROR, "Validation failed", error.validation));
  }

  // Fastify 404 - route not found
  if (error.statusCode === 404) {
    return reply
      .status(HttpStatus.NotFound)
      .send(formatError(ErrorCode.NOT_FOUND, "Route not found"));
  }

  // Rate limit error (from @fastify/rate-limit)
  if (error.statusCode === 429) {
    return reply
      .status(HttpStatus.TooManyRequests)
      .send(formatError(ErrorCode.RATE_LIMIT_EXCEEDED, "Too many requests"));
  }

  // Unknown error - 500
  return reply
    .status(HttpStatus.InternalServerError)
    .send(formatError(ErrorCode.INTERNAL_ERROR, "Internal server error"));
}
