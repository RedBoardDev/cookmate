import type { PostRecipesMutationRequest, PutRecipesRecipeidMutationRequest } from "@/generated/types";
import {
  type RecipeEditorFormValues,
  type RecipeEditorImageInput,
  RecipeEditorValidationError,
} from "./recipeEditor.schema";

type RecipeEditorRequiredFields = RecipeEditorFormValues & {
  difficulty: NonNullable<RecipeEditorFormValues["difficulty"]>;
  budget: NonNullable<RecipeEditorFormValues["budget"]>;
};

export type RecipeEditorCreateContext = {
  source: NonNullable<PostRecipesMutationRequest["source"]>;
  sourceUrl: Exclude<PostRecipesMutationRequest["sourceUrl"], undefined>;
};

function assertRequiredRecipeFields(input: RecipeEditorFormValues): asserts input is RecipeEditorRequiredFields {
  if (input.difficulty === null) {
    throw new RecipeEditorValidationError("Recipe difficulty is required.");
  }

  if (input.budget === null) {
    throw new RecipeEditorValidationError("Recipe budget is required.");
  }
}

function toBaseRecipePayload(input: RecipeEditorFormValues) {
  assertRequiredRecipeFields(input);

  return {
    name: input.name,
    description: input.description,
    servings: input.servings,
    yieldUnitLabel: input.yieldUnitLabel,
    prepTimeMin: input.prepTimeMin,
    cookTimeMin: input.cookTimeMin,
    difficulty: input.difficulty,
    budget: input.budget,
    categories: input.categories,
    attributes: input.attributes,
    ingredients: input.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      note: ingredient.note,
      optional: ingredient.optional,
    })),
    instructions: input.instructions.map((instruction) => ({
      text: instruction.text,
      durationMin: instruction.durationMin,
    })),
  } satisfies Omit<PostRecipesMutationRequest, "images" | "source" | "sourceUrl">;
}

export function toCreateRecipePayload(
  input: RecipeEditorFormValues,
  images: RecipeEditorImageInput[],
  context: RecipeEditorCreateContext,
): PostRecipesMutationRequest {
  const basePayload = toBaseRecipePayload(input);

  return {
    ...basePayload,
    source: context.source,
    sourceUrl: context.sourceUrl,
    images: images.map((image) => ({
      name: image.name,
      mimeType: image.mimeType,
      size: image.size,
    })),
  };
}

export function toUpdateRecipePayload(input: RecipeEditorFormValues): PutRecipesRecipeidMutationRequest {
  return toBaseRecipePayload(input);
}
