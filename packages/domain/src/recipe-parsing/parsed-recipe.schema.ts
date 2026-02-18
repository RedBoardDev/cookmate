import { z } from "zod";
import { BUDGETS, DIFFICULTIES, SOURCES, TAGS } from "../shared/value-objects";

export const parsedRecipeField = {
  title: z.string().min(1),
  description: z.string().nullable(),
  prepTimeMin: z.number().int().min(0).nullable(),
  cookTimeMin: z.number().int().min(0).nullable(),
  totalTimeMin: z.number().int().min(0).nullable(),
  difficulty: z.enum(DIFFICULTIES).nullable(),
  budget: z.enum(BUDGETS).nullable(),
  tags: z.array(z.enum(TAGS)).optional(),
  source: z.enum(SOURCES).nullable(),
  sourceUrl: z.string().url().nullable(),
  ingredients: z.array(z.string()).optional(),
  instructions: z.array(z.string()).optional(),
};

export const parsedRecipeFields = {
  title: { title: parsedRecipeField.title },
  description: { description: parsedRecipeField.description },
  prepTimeMin: { prepTimeMin: parsedRecipeField.prepTimeMin },
  cookTimeMin: { cookTimeMin: parsedRecipeField.cookTimeMin },
  totalTimeMin: { totalTimeMin: parsedRecipeField.totalTimeMin },
  difficulty: { difficulty: parsedRecipeField.difficulty },
  budget: { budget: parsedRecipeField.budget },
  tags: { tags: parsedRecipeField.tags },
  source: { source: parsedRecipeField.source },
  sourceUrl: { sourceUrl: parsedRecipeField.sourceUrl },
  ingredients: { ingredients: parsedRecipeField.ingredients },
  instructions: { instructions: parsedRecipeField.instructions },
};

export const parsedRecipePropsSchema = z.object({
  title: parsedRecipeField.title,
  description: parsedRecipeField.description.optional(),
  prepTimeMin: parsedRecipeField.prepTimeMin.optional(),
  cookTimeMin: parsedRecipeField.cookTimeMin.optional(),
  totalTimeMin: parsedRecipeField.totalTimeMin.optional(),
  difficulty: parsedRecipeField.difficulty.optional(),
  budget: parsedRecipeField.budget.optional(),
  tags: parsedRecipeField.tags,
  source: parsedRecipeField.source.optional(),
  sourceUrl: parsedRecipeField.sourceUrl.optional(),
  ingredients: parsedRecipeField.ingredients,
  instructions: parsedRecipeField.instructions,
});

export type ParsedRecipeProps = z.infer<typeof parsedRecipePropsSchema>;

export const parsedRecipeSchema = parsedRecipePropsSchema.extend({
  id: z.uuid(),
});

export const ParsedRecipeSchema = parsedRecipePropsSchema;
export type ParsedRecipe = ParsedRecipeProps;
