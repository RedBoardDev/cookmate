import { z } from "zod";
import { collectionSchema } from "../collection/collection.schema";
import {
  BUDGETS,
  type BudgetValue,
  DIFFICULTIES,
  type DifficultyValue,
  RECIPE_ATTRIBUTES,
  RECIPE_CATEGORIES,
  type RecipeAttributeValue,
  type RecipeCategoryValue,
  SOURCES,
  type SourceValue,
} from "../shared/value-objects";

export const recipeDifficultySchema = z.enum(DIFFICULTIES);
export const recipeBudgetSchema = z.enum(BUDGETS);
export const recipeSourceSchema = z.enum(SOURCES);
export const recipeCategorySchema = z.enum(RECIPE_CATEGORIES);
export const recipeAttributeSchema = z.enum(RECIPE_ATTRIBUTES);

export type { DifficultyValue as RecipeDifficulty };
export type { BudgetValue as RecipeBudget };
export type { SourceValue as RecipeSource };
export type { RecipeCategoryValue as RecipeCategory };
export type { RecipeAttributeValue as RecipeAttribute };

export const recipeField = {
  name: z.string().min(1),
  description: z.string().min(1).nullable(),
  servings: z.number().int().min(1),
  yieldUnitLabel: z.string().min(1).nullable(),
  prepTimeMin: z.number().int().min(0),
  cookTimeMin: z.number().int().min(0),
  totalTimeMin: z.number().int().min(0),
  difficulty: recipeDifficultySchema.nullable(),
  budget: recipeBudgetSchema.nullable(),
  categories: z.array(recipeCategorySchema),
  attributes: z.array(recipeAttributeSchema),
};

export const recipeSystemField = {
  source: recipeSourceSchema,
  sourceUrl: z.string().min(1).nullable(),
  shortUrl: z.string().min(1).nullable(),
  userId: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const recipeFields = {
  name: { name: recipeField.name },
  description: { description: recipeField.description },
  servings: { servings: recipeField.servings },
  yieldUnitLabel: { yieldUnitLabel: recipeField.yieldUnitLabel },
  prepTimeMin: { prepTimeMin: recipeField.prepTimeMin },
  cookTimeMin: { cookTimeMin: recipeField.cookTimeMin },
  totalTimeMin: { totalTimeMin: recipeField.totalTimeMin },
  difficulty: { difficulty: recipeField.difficulty },
  budget: { budget: recipeField.budget },
  categories: { categories: recipeField.categories },
  attributes: { attributes: recipeField.attributes },
  source: { source: recipeSystemField.source },
  sourceUrl: { sourceUrl: recipeSystemField.sourceUrl },
  shortUrl: { shortUrl: recipeSystemField.shortUrl },
  userId: { userId: recipeSystemField.userId },
  createdAt: { createdAt: recipeSystemField.createdAt },
  updatedAt: { updatedAt: recipeSystemField.updatedAt },
};

export const recipePropsSchema = z.object({
  ...recipeField,
  ...recipeSystemField,
});

export type RecipeProps = z.infer<typeof recipePropsSchema>;

export const recipeSchema = recipePropsSchema.extend({
  id: z.uuid(),
  collections: z.array(collectionSchema.pick({ id: true, name: true, emoji: true })).optional(),
});

export type Recipe = z.infer<typeof recipeSchema>;
