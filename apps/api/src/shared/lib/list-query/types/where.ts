import type { z } from "zod";

type BivariantCallback<TArgs extends unknown[], TResult> = {
  bivarianceHack(...args: TArgs): TResult;
}["bivarianceHack"];

export type WhereConfig<
  TWhere,
  TContext = unknown,
  TSchema extends z.ZodTypeAny = z.ZodTypeAny
> = {
  param: string;
  description: string;
  schema: TSchema;
  toWhere: BivariantCallback<
    [z.infer<TSchema>, TContext],
    TWhere | TWhere[] | undefined
  >;
};

export type WhereConfigs<TWhere, TContext = unknown> = ReadonlyArray<
  WhereConfig<TWhere, TContext>
>;

export type WhereField<TWhere> = Exclude<Extract<keyof TWhere, string>, "AND" | "OR" | "NOT">;
