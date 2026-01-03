import { z } from "zod";
import { normalizeArrayParam } from "./normalize-array-param";

export const arrayParamSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
  options?: { minItems?: number }
) => {
  const minItems = options?.minItems ?? 1;
  const normalizedArraySchema = z.array(itemSchema).min(minItems);

  return z.preprocess(
    (value) => normalizeArrayParam(value),
    normalizedArraySchema
  );
};
