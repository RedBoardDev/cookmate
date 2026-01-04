import type { z } from "zod";

/**
 * Configuration for SELECT queries in GET/LIST routes.
 *
 * @template TSelect - The Prisma select type
 * @template TResult - The result type from Prisma query
 * @template TResponse - The API response type (after transform)
 */
export interface SelectConfig<TSelect, TResult, TResponse> {
  /** Prisma select object */
  select: TSelect;
  /** Zod schema for API response validation */
  schema: z.ZodType<TResponse>;
  /** Transform function to map DB result to API response */
  transform: (data: TResult) => TResponse | Promise<TResponse>;
}
