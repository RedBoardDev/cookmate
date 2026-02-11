import { z } from "zod";
import type { WhereConfig, WhereField } from "../../types";

type WhereBooleanOptions<TWhere> = {
  field: WhereField<TWhere>;
  description: string;
};

export const whereBoolean = <TWhere, TContext = unknown>(
  param: string,
  options: WhereBooleanOptions<TWhere>,
): WhereConfig<TWhere, TContext, z.ZodType<boolean>> => {
  const schema = z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .describe(options.description);

  return {
    param,
    description: options.description,
    schema,
    toWhere: (value) =>
      ({
        [options.field]: value,
      }) as TWhere,
  };
};
