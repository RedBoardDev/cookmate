import { ApiError } from "@/interfaces/http/errors/api.error";
import type { WhereConfigs } from "../types";

export const parseWhereParams = <TWhere, TContext>(
  query: Record<string, unknown>,
  configs: WhereConfigs<TWhere, TContext>,
  context?: TContext
): TWhere | undefined => {
  const filters: TWhere[] = [];

  for (const config of configs) {
    const value = query[config.param];
    if (value === undefined) continue;

    const parsed = config.schema.safeParse(value);
    if (!parsed.success) {
      throw ApiError.invalidQueryParam(`Invalid ${config.param}`, {
        param: config.param,
        issues: parsed.error.format(),
      });
    }

    const where = config.toWhere(parsed.data, context as TContext);
    if (where === undefined) continue;

    if (Array.isArray(where)) {
      filters.push(...where);
      continue;
    }

    filters.push(where);
  }

  if (filters.length === 0) return undefined;
  if (filters.length === 1) return filters[0];

  return { AND: filters } as TWhere;
};
