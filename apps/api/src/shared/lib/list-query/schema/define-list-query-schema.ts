import { z } from "zod";
import type { SortConfig, WhereConfigs } from "../types";
import { arrayParamSchema } from "../utils/array-param-schema";

type ListQuerySchemaOptions<TWhere, TOrderBy, TContext> = {
  where?: WhereConfigs<TWhere, TContext>;
  sort?: SortConfig<TOrderBy>;
};

export const defineListQuerySchema = <TWhere, TOrderBy, TContext>(
  options: ListQuerySchemaOptions<TWhere, TOrderBy, TContext>,
) => {
  const shape: Record<string, z.ZodTypeAny> = {
    page: z.coerce.number().int().min(1).optional().describe("Page number (1-based)"),
    pageSize: z.coerce.number().int().min(1).optional().describe("Items per page"),
    findId: z.uuid().optional().describe("Find the page containing this item ID"),
  };

  if (options.sort) {
    const sortFields = Object.keys(options.sort.fields);
    const fieldList = sortFields.length > 0 ? ` Fields: ${sortFields.join(", ")}.` : "";
    const baseDescription = options.sort.description ?? "Sort results (field:asc|desc).";

    shape.sort = arrayParamSchema(z.string())
      .optional()
      .describe(`${baseDescription}${fieldList} Supports CSV or repeated params.`);
  }

  for (const config of options.where ?? []) {
    shape[config.param] = config.schema.describe(config.description).optional();
  }

  return z.object(shape).strict();
};
