import { ApiError } from "@/interfaces/http/errors/api.error";
import { normalizeArrayParam } from "../utils/normalize-array-param";
import type { SortConfig } from "../types";
import { parseSortItem } from "./parse-sort-item";

export const parseSortParams = <TOrderBy>(
  query: Record<string, unknown>,
  config: SortConfig<TOrderBy>
): TOrderBy[] => {
  const raw = query.sort;
  if (raw === undefined) return config.default;

  const items = normalizeArrayParam(raw) ?? [];
  if (items.length === 0) return config.default;

  const orderBy: TOrderBy[] = [];

  for (const item of items) {
    if (typeof item !== "string") {
      throw ApiError.invalidQueryParam("Invalid sort parameter", { value: item });
    }

    const { field, direction } = parseSortItem(item);
    const mapper = config.fields[field as keyof typeof config.fields];

    if (!mapper) {
      throw ApiError.invalidQueryParam("Unknown sort field", { field });
    }

    const mapped = mapper(direction);
    if (Array.isArray(mapped)) {
      orderBy.push(...mapped);
      continue;
    }

    orderBy.push(mapped);
  }

  return orderBy.length > 0 ? orderBy : config.default;
};
