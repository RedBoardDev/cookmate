import { z } from "zod";
import {
  DIFFICULTIES,
  BUDGETS,
  SOURCES,
  TAGS,
  type DifficultyValue,
  type BudgetValue,
  type SourceValue,
  type TagValue,
} from "../shared/value-objects";
import { collectionSnapshotSchema } from "../collection/schemas/collection.schema";

export const recipeDifficultySchema = z.enum(DIFFICULTIES);
export const recipeBudgetSchema = z.enum(BUDGETS);
export const recipeSourceSchema = z.enum(SOURCES);
export const recipeTagSchema = z.enum(TAGS);

export type { DifficultyValue as RecipeDifficulty };
export type { BudgetValue as RecipeBudget };
export type { SourceValue as RecipeSource };
export type { TagValue as RecipeTag };

export const recipeField = {
  title: z.string().min(1),
  description: z.string().min(1).nullable(),
  servings: z.number().int().min(1),
  prepTimeMin: z.number().int().min(0).nullable(),
  cookTimeMin: z.number().int().min(0).nullable(),
  restTimeMin: z.number().int().min(0).nullable(),
  totalTimeMin: z.number().int().min(0),
  difficulty: recipeDifficultySchema.nullable(),
  budget: recipeBudgetSchema.nullable(),
  tags: z.array(recipeTagSchema),
};

export const recipeSystemField = {
  source: recipeSourceSchema,
  sourceUrl: z.string().min(1).nullable(),
  shortUrl: z.string().min(1).nullable(),
  userId: z.string().min(1),
  forkedFromDiscoverId: z.uuid().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const recipeFields = {
  title: { title: recipeField.title },
  description: { description: recipeField.description },
  servings: { servings: recipeField.servings },
  prepTimeMin: { prepTimeMin: recipeField.prepTimeMin },
  cookTimeMin: { cookTimeMin: recipeField.cookTimeMin },
  restTimeMin: { restTimeMin: recipeField.restTimeMin },
  totalTimeMin: { totalTimeMin: recipeField.totalTimeMin },
  difficulty: { difficulty: recipeField.difficulty },
  budget: { budget: recipeField.budget },
  tags: { tags: recipeField.tags },
  source: { source: recipeSystemField.source },
  sourceUrl: { sourceUrl: recipeSystemField.sourceUrl },
  shortUrl: { shortUrl: recipeSystemField.shortUrl },
  userId: { userId: recipeSystemField.userId },
  forkedFromDiscoverId: { forkedFromDiscoverId: recipeSystemField.forkedFromDiscoverId },
  createdAt: { createdAt: recipeSystemField.createdAt },
  updatedAt: { updatedAt: recipeSystemField.updatedAt },
};

export const recipePropsSchema = z.object({
  ...recipeField,
  ...recipeSystemField,
});

export type RecipeProps = z.infer<typeof recipePropsSchema>;

export const recipeSnapshotSchema = recipePropsSchema.extend({
  id: z.uuid(),
  collections: z
    .array(collectionSnapshotSchema.pick({ id: true, name: true, emoji: true }))
    .optional(),
});

export type RecipeSnapshot = z.infer<typeof recipeSnapshotSchema>;
