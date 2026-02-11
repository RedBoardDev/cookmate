import { z } from "zod";
import type { WhereConfig, WhereField } from "../../types";
import { whereEnumArray } from "./where-enum-array";

type WhereUuidArrayOptions<TWhere> = {
  field: WhereField<TWhere>;
  description: string;
  op?: "in" | "hasSome" | "hasEvery";
};

export const whereUuidArray = <TWhere, TContext = unknown>(
  param: string,
  options: WhereUuidArrayOptions<TWhere>,
): WhereConfig<TWhere, TContext, z.ZodType<string[]>> =>
  whereEnumArray(param, {
    field: options.field,
    description: options.description,
    schema: z.uuid(),
    op: options.op ?? "in",
  });
