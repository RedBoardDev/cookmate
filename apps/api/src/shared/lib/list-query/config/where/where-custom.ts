import type { z } from "zod";
import type { WhereConfig } from "../../types";

type WhereCustomOptions<TWhere, TContext, TSchema extends z.ZodTypeAny> = {
  description: string;
  schema: TSchema;
  toWhere: (value: z.infer<TSchema>, context: TContext) => TWhere | TWhere[] | undefined;
};

export const whereCustom = <
  TWhere,
  TContext = unknown,
  TSchema extends z.ZodTypeAny = z.ZodTypeAny
>(
  param: string,
  options: WhereCustomOptions<TWhere, TContext, TSchema>
): WhereConfig<TWhere, TContext, TSchema> => ({
  param,
  description: options.description,
  schema: options.schema.describe(options.description),
  toWhere: options.toWhere,
});
