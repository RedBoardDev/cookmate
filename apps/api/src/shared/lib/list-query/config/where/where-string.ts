import { z } from "zod";
import type { WhereConfig, WhereField } from "../../types";

type WhereStringOptions<TWhere> = {
  field: WhereField<TWhere>;
  description: string;
  contains?: boolean;
  insensitive?: boolean;
};

export const whereString = <TWhere, TContext = unknown>(
  param: string,
  options: WhereStringOptions<TWhere>,
): WhereConfig<TWhere, TContext, z.ZodString> => {
  const schema = z.string().min(1).describe(options.description);

  return {
    param,
    description: options.description,
    schema,
    toWhere: (value) =>
      ({
        [options.field]: options.contains
          ? {
              contains: value,
              ...(options.insensitive ? { mode: "insensitive" } : {}),
            }
          : value,
      }) as TWhere,
  };
};
