import { Prisma } from "@/generated/prisma/client";
import { ApiError } from "@/interfaces/http/errors/api.error";
import { DomainError } from "@cookmate/domain/errors";

/**
 * Maps Prisma error codes to ApiError instances.
 * Reference: https://www.prisma.io/docs/orm/reference/error-reference
 *
 * Note: Messages are for server logs only. User-facing messages come from the frontend.
 */
function mapPrismaErrorCode(code: string, meta?: Record<string, unknown>): ApiError {
  switch (code) {
    // Unique constraint violation
    case "P2002": {
      // Put field names in details (safe for API response)
      const details = meta?.target
        ? { fields: (meta.target as string[]).join(", ") }
        : undefined;
      return ApiError.resourceAlreadyExists(undefined, details);
    }

    // Foreign key constraint failed
    case "P2003":
      return ApiError.invalidForeignKey();

    // Record not found (for OrThrow methods - but we use findUnique + manual check)
    case "P2025":
      return ApiError.resourceNotFound();

    // Value too long for column
    case "P2000": {
      const details = meta?.column_name ? { field: meta.column_name } : undefined;
      return ApiError.invalidBody(undefined, details);
    }

    // Required field missing
    case "P2012": {
      const details = meta?.path ? { field: String(meta.path) } : undefined;
      return ApiError.invalidBody(undefined, details);
    }

    // Missing required argument
    case "P2013": {
      const details = meta?.argument_name ? { argument: String(meta.argument_name) } : undefined;
      return ApiError.invalidBody(undefined, details);
    }

    // Null constraint violation
    case "P2011": {
      const details = meta?.constraint ? { constraint: String(meta.constraint) } : undefined;
      return ApiError.invalidBody(undefined, details);
    }

    // Invalid value for field type
    case "P2005":
    case "P2006":
      return ApiError.invalidBody();

    // Invalid query
    case "P2008":
    case "P2009":
    case "P2016":
    case "P2026":
    case "P2029":
    case "P2033":
      return ApiError.badRequest();

    // Value out of range
    case "P2020": {
      const details = meta?.column_name ? { field: meta.column_name } : undefined;
      return ApiError.invalidBody(undefined, details);
    }

    // Table/column not found (schema issue)
    case "P2021":
    case "P2022":
      return ApiError.database();

    // Default: generic database error
    default:
      return ApiError.database();
  }
}

/**
 * Wraps an async function to automatically handle and transform errors.
 * - DomainError → re-thrown as-is (handled by error-handler)
 * - ApiError → re-thrown as-is
 * - Prisma errors → ApiError with appropriate HTTP status
 * - Unknown errors → ApiError.internal()
 *
 * @example
 * const getRecipeSelectFn = async (where, select) => {
 *   const recipe = await prisma.recipe.findUnique({ where, select });
 *   if (!recipe) throw new RecipeNotFoundError(where.id);
 *   return recipe;
 * };
 * export const getRecipeSelect = handleError(getRecipeSelectFn);
 */
export function handleError<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    try {
      return await fn(...args);
    } catch (error) {
      // DomainError - re-throw (handled by error-handler)
      if (error instanceof DomainError) {
        throw error;
      }

      // Already an ApiError - re-throw
      if (error instanceof ApiError) {
        throw error;
      }

      // Prisma known request error (P2xxx)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw mapPrismaErrorCode(error.code, error.meta as Record<string, unknown>);
      }

      // Prisma validation error
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw ApiError.invalidBody();
      }

      // Prisma initialization error
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw ApiError.databaseConnection();
      }

      // Prisma Rust panic
      if (error instanceof Prisma.PrismaClientRustPanicError) {
        throw ApiError.database();
      }

      // Unknown error - wrap in internal error
      // Note: The error will be logged by the global error handler
      throw ApiError.internal();
    }
  };
}
