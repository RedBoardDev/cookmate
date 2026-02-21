"use client";

import { BUDGETS, DIFFICULTIES } from "@cookmate/domain/shared/value-objects";
import { useForm } from "@tanstack/react-form";
import { useEffect, useRef } from "react";
import { useCreateRecipe } from "@/modules/NewRecipes/api/useCreateRecipe";
import { type CreateRecipeInput, createRecipeSchema } from "@/modules/NewRecipes/application/createRecipe.schema";
import type { ParsedRecipe } from "@/modules/NewRecipes/application/recipeParsing.types";
import type { ApiError } from "@/shared/core/network/api-error";

type UseCreateRecipeFormOptions = {
  parsedRecipe: ParsedRecipe | null;
  onSuccess?: (recipeId: string) => void;
  onError?: (error: ApiError) => void;
};

const toIngredientInput = (parsedRecipe: ParsedRecipe | null): CreateRecipeInput["ingredients"] => {
  if (!parsedRecipe || parsedRecipe.ingredients.length === 0) {
    return [{ name: "", quantity: null, unit: null, optional: false, order: 0 }];
  }

  return parsedRecipe.ingredients.map((ingredient, index) => ({
    name: ingredient.name,
    quantity: ingredient.quantity,
    unit: ingredient.unit,
    optional: false,
    order: index,
  }));
};

const toInstructionInput = (parsedRecipe: ParsedRecipe | null): CreateRecipeInput["instructions"] => {
  if (!parsedRecipe || parsedRecipe.instructions.length === 0) {
    return [{ text: "", durationMin: null, order: 0 }];
  }

  return parsedRecipe.instructions.map((instruction, index) => ({
    text: instruction.text,
    durationMin: instruction.durationMin,
    order: index,
  }));
};

const buildDefaultValues = (parsedRecipe: ParsedRecipe | null): CreateRecipeInput => {
  const prepTimeMin = parsedRecipe?.prepTimeMin ?? 0;
  const cookTimeMin = parsedRecipe?.cookTimeMin ?? 0;

  return {
    name: parsedRecipe?.name ?? "",
    description: parsedRecipe?.description ?? null,
    servings: parsedRecipe?.servings ?? 1,
    yieldUnitLabel: null,
    prepTimeMin,
    cookTimeMin,
    totalTimeMin: parsedRecipe?.totalTimeMin ?? prepTimeMin + cookTimeMin,
    difficulty: DIFFICULTIES[0],
    budget: BUDGETS[0],
    categories: [],
    attributes: [],
    source: "MANUAL",
    ingredients: toIngredientInput(parsedRecipe),
    instructions: toInstructionInput(parsedRecipe),
  };
};

export function useCreateRecipeForm({ parsedRecipe, onSuccess, onError }: UseCreateRecipeFormOptions) {
  const mutation = useCreateRecipe();

  const form = useForm({
    defaultValues: buildDefaultValues(parsedRecipe),
    validators: {
      onChange: createRecipeSchema,
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value, {
        onSuccess: (response) => onSuccess?.(response.data.id),
        onError: onError,
      });
    },
  });

  const hasHydratedFromImportRef = useRef(false);

  useEffect(() => {
    if (!parsedRecipe || hasHydratedFromImportRef.current) return;

    form.reset(buildDefaultValues(parsedRecipe));
    hasHydratedFromImportRef.current = true;
  }, [form, parsedRecipe]);

  return {
    form,
    isSubmitting: mutation.isPending,
    error: mutation.error,
  } as const;
}
