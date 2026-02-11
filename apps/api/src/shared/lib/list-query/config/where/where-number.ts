import { z } from "zod";
import type { WhereConfig, WhereField } from "../../types";

type WhereNumberOptions<TWhere> = {
  field: WhereField<TWhere>;
  description: string;
  int?: boolean;
  min?: number;
  max?: number;
};

export const whereNumber = <TWhere, TContext = unknown>(
  param: string,
  options: WhereNumberOptions<TWhere>,
): WhereConfig<TWhere, TContext, z.ZodType<number>> => {
  let schema = z.coerce.number();

  if (options.int) {
    schema = schema.int();
  }

  if (options.min !== undefined) {
    schema = schema.min(options.min);
  }

  if (options.max !== undefined) {
    schema = schema.max(options.max);
  }

  return {
    param,
    description: options.description,
    schema: schema.describe(options.description),
    toWhere: (value) =>
      ({
        [options.field]: value,
      }) as TWhere,
  };
};
