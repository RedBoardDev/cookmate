import type { z } from "zod";
import type { WhereConfig, WhereField } from "../../types";

type WhereEnumValueOptions<TWhere, TEnum extends z.ZodTypeAny> = {
  field: WhereField<TWhere>;
  description: string;
  schema: TEnum;
};

export const whereEnumValue = <TWhere, TEnum extends z.ZodTypeAny, TContext = unknown>(
  param: string,
  options: WhereEnumValueOptions<TWhere, TEnum>,
): WhereConfig<TWhere, TContext, TEnum> => ({
  param,
  description: options.description,
  schema: options.schema.describe(options.description),
  toWhere: (value) =>
    ({
      [options.field]: value,
    }) as TWhere,
});
