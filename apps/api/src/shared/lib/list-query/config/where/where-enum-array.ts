import type { z } from "zod";
import type { WhereConfig, WhereField } from "../../types";
import { arrayParamSchema } from "../../utils/array-param-schema";

type WhereEnumArrayOptions<TWhere, TEnum extends z.ZodTypeAny> = {
  field: WhereField<TWhere>;
  description: string;
  schema: TEnum;
  op: "in" | "hasSome" | "hasEvery";
};

export const whereEnumArray = <TWhere, TEnum extends z.ZodTypeAny, TContext = unknown>(
  param: string,
  options: WhereEnumArrayOptions<TWhere, TEnum>,
): WhereConfig<TWhere, TContext, z.ZodType<z.infer<TEnum>[]>> => {
  const schema = arrayParamSchema(options.schema).describe(options.description);

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
