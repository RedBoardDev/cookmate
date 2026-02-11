import { DomainError } from "@cookmate/domain/errors";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { formatError } from "@/interfaces/http/helpers/reply";
import { ErrorCode } from "@/shared/enums/error-code.enum";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { ApiError } from "./api.error";

/**
 * Global error handler for Fastify.
 * Transforms all errors into a consistent API response format.
 *
 * Note: The API returns stable error codes. User-facing messages are localized in the frontend.
 */
export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  request.log.error(error);

  // ApiError
  if (error instanceof ApiError) {
    return reply.status(error.httpStatus).send(formatError(error.code, { details: error.details, args: error.args }));
  }

  // DomainError
  if (error instanceof DomainError) {
    return reply.status(error.httpStatus).send(formatError(error.code, { details: error.details, args: error.args }));
  }

  // Fastify validation error (from Zod type provider)
  if (error.validation) {
    return reply
      .status(HttpStatus.BadRequest)
      .send(formatError(ErrorCode.VALIDATION_ERROR, { details: error.validation }));
  }

  // Fastify 404 - route not found
  if (error.statusCode === 404) {
    return reply.status(HttpStatus.NotFound).send(formatError(ErrorCode.NOT_FOUND));
  }

  // Rate limit error (from @fastify/rate-limit)
  if (error.statusCode === 429) {
    return reply.status(HttpStatus.TooManyRequests).send(formatError(ErrorCode.RATE_LIMIT_EXCEEDED));
  }

  // Unknown error - 500
  return reply.status(HttpStatus.InternalServerError).send(formatError(ErrorCode.INTERNAL_ERROR));
}
