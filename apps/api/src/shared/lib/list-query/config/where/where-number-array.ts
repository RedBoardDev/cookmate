import { z } from "zod";
import { arrayParamSchema } from "../../utils/array-param-schema";
import type { WhereConfig, WhereField } from "../../types";

type WhereNumberArrayOptions<TWhere> = {
  field: WhereField<TWhere>;
  description: string;
  op: "in" | "hasSome" | "hasEvery";
  int?: boolean;
  min?: number;
  max?: number;
};

export const whereNumberArray = <TWhere, TContext = unknown>(
  param: string,
  options: WhereNumberArrayOptions<TWhere>
): WhereConfig<TWhere, TContext, z.ZodType<number[]>> => {
  let itemSchema = z.coerce.number();

  if (options.int) {
    itemSchema = itemSchema.int();
  }

  if (options.min !== undefined) {
    itemSchema = itemSchema.min(options.min);
  }

  if (options.max !== undefined) {
    itemSchema = itemSchema.max(options.max);
  }

  const schema = arrayParamSchema(itemSchema).describe(options.description);

  return {
    param,
    description: options.description,
    schema,
    toWhere: (values) =>
      ({
        [options.field]: {
          [options.op]: values,
        },
      }) as TWhere,
  };
};
