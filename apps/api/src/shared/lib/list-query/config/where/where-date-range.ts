import { z } from "zod";
import type { WhereConfig, WhereField } from "../../types";

type WhereDateRangeOptions<TWhere> = {
  field: WhereField<TWhere>;
  description: string;
};

export const whereDateRange = <TWhere, TContext = unknown>(
  paramBase: string,
  options: WhereDateRangeOptions<TWhere>
): WhereConfig<TWhere, TContext, z.ZodType<Date>>[] => {
  const gteParam = `${paramBase}Gte`;
  const lteParam = `${paramBase}Lte`;

  return [
    {
      param: gteParam,
      description: `${options.description} (from)`,
      schema: z.coerce.date().describe(`${options.description} (from)`),
      toWhere: (value) =>
        ({
          [options.field]: { gte: value },
        }) as TWhere,
    },
    {
      param: lteParam,
      description: `${options.description} (to)`,
      schema: z.coerce.date().describe(`${options.description} (to)`),
      toWhere: (value) =>
        ({
          [options.field]: { lte: value },
        }) as TWhere,
    },
  ];
};
