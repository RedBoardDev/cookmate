import { Prisma } from "@/generated/prisma/client";
import { ApiError } from "@/interfaces/http/errors/api.error";
import { DomainError } from "@cookmate/domain/errors";

/**
 * Maps Prisma error codes to ApiError instances.
 * Reference: https://www.prisma.io/docs/orm/reference/error-reference
 */
function mapPrismaErrorCode(code: string, meta?: Record<string, unknown>): ApiError {
  switch (code) {
    // Unique constraint violation
    case "P2002":
      return ApiError.resourceAlreadyExists(
        meta?.target
          ? `A record with this ${(meta.target as string[]).join(", ")} already exists`
          : "A record with this value already exists"
      );

    // Foreign key constraint failed
    case "P2003":
      return ApiError.invalidForeignKey("Related resource not found");

    // Record not found (for OrThrow methods - but we use findUnique + manual check)
    case "P2025":
      return ApiError.resourceNotFound("Record not found");

    // Value too long for column
    case "P2000":
      return ApiError.invalidBody("Value too long for field");

    // Required field missing
    case "P2012":
      return ApiError.invalidBody("Required field is missing");

    // Missing required argument
    case "P2013":
      return ApiError.invalidBody("Missing required argument");

    // Null constraint violation
    case "P2011":
      return ApiError.invalidBody("Null constraint violation");

    // Invalid value for field type
    case "P2005":
    case "P2006":
      return ApiError.invalidBody("Invalid value for field type");

    // Invalid query
    case "P2008":
    case "P2009":
    case "P2016":
    case "P2026":
    case "P2029":
    case "P2033":
      return ApiError.badRequest("Invalid database query");

    // Value out of range
    case "P2020":
      return ApiError.invalidBody("Value out of range");

    // Table/column not found (schema issue)
    case "P2021":
    case "P2022":
      return ApiError.database("Database schema error");

    // Default: generic database error
    default:
      return ApiError.database("Database operation failed");
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
        throw ApiError.invalidBody("Invalid data provided to database");
      }

      // Prisma initialization error
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw ApiError.databaseConnection("Database connection failed");
      }

      // Prisma Rust panic
      if (error instanceof Prisma.PrismaClientRustPanicError) {
        throw ApiError.database("Database engine error");
      }

      // Unknown error - wrap in internal error
      // Note: The error will be logged by the global error handler
      throw ApiError.internal("An unexpected error occurred");
    }
  };
}
