"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect, useMemo, useRef } from "react";
import {
  type RecipeEditorFormValues,
  recipeEditorFormSchema,
} from "@/modules/RecipeEditor/application/recipeEditor.schema";

type UseRecipeEditorBaseFormOptions = {
  initialValues?: Partial<RecipeEditorFormValues>;
  onSubmit: (value: RecipeEditorFormValues) => Promise<void> | void;
};

function createEmptyIngredient(order: number): RecipeEditorFormValues["ingredients"][number] {
  return {
    name: "",
    quantity: null,
    unit: null,
    note: null,
    optional: false,
    order,
  };
}

function createEmptyInstruction(order: number): RecipeEditorFormValues["instructions"][number] {
  return {
    text: "",
    durationMin: null,
    order,
  };
}

function normalizeIngredients(
  ingredients: RecipeEditorFormValues["ingredients"] | undefined,
): RecipeEditorFormValues["ingredients"] {
  if (!ingredients || ingredients.length === 0) {
    return [createEmptyIngredient(0)];
  }

  return ingredients.map((ingredient, index) => ({
    ...ingredient,
    note: ingredient.note ?? null,
    order: index,
  }));
}

function normalizeInstructions(
  instructions: RecipeEditorFormValues["instructions"] | undefined,
): RecipeEditorFormValues["instructions"] {
  if (!instructions || instructions.length === 0) {
    return [createEmptyInstruction(0)];
  }

  return instructions.map((instruction, index) => ({
    ...instruction,
    order: index,
  }));
}

function normalizeRecipeEditorFormValues(initialValues?: Partial<RecipeEditorFormValues>): RecipeEditorFormValues {
  const prepTimeMin = initialValues?.prepTimeMin ?? 0;
  const cookTimeMin = initialValues?.cookTimeMin ?? 0;

  return {
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? null,
    servings: initialValues?.servings ?? 1,
    yieldUnitLabel: initialValues?.yieldUnitLabel ?? null,
    prepTimeMin,
    cookTimeMin,
    totalTimeMin: initialValues?.totalTimeMin ?? prepTimeMin + cookTimeMin,
    difficulty: initialValues?.difficulty ?? null,
    budget: initialValues?.budget ?? null,
    categories: initialValues?.categories ? [...initialValues.categories] : [],
    attributes: initialValues?.attributes ? [...initialValues.attributes] : [],
    ingredients: normalizeIngredients(initialValues?.ingredients),
    instructions: normalizeInstructions(initialValues?.instructions),
  };
}

export function useRecipeEditorBaseForm({ initialValues, onSubmit }: UseRecipeEditorBaseFormOptions) {
  const normalizedInitialValues = useMemo(() => normalizeRecipeEditorFormValues(initialValues), [initialValues]);
  const normalizedInitialValuesKey = useMemo(() => JSON.stringify(normalizedInitialValues), [normalizedInitialValues]);

  const form = useForm({
    defaultValues: normalizedInitialValues,
    validators: {
      onChange: recipeEditorFormSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const hydratedValuesKeyRef = useRef(normalizedInitialValuesKey);

  useEffect(() => {
    if (hydratedValuesKeyRef.current === normalizedInitialValuesKey) {
      return;
    }

    hydratedValuesKeyRef.current = normalizedInitialValuesKey;
    form.reset(normalizedInitialValues);
  }, [form, normalizedInitialValues, normalizedInitialValuesKey]);

  return {
    form,
  } as const;
}

export type RecipeEditorFormApi = ReturnType<typeof useRecipeEditorBaseForm>["form"];
