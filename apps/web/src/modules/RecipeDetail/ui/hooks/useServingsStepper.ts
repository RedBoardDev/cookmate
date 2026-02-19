import { useCallback, useEffect, useState } from "react";
import { RecipeServings } from "@/modules/RecipeDetail/domain/vo/recipeServings.vo";

function normalizeServings(value: number): number {
  if (!Number.isInteger(value) || value < 1) {
    return 1;
  }

  return value;
}

export function useServingsStepper(initialServings: number) {
  const normalizedInitialServings = normalizeServings(initialServings);

  const [servings, setServings] = useState(() => RecipeServings.create(normalizedInitialServings));

  useEffect(() => {
    setServings(RecipeServings.create(normalizedInitialServings));
  }, [normalizedInitialServings]);

  const increment = useCallback(() => {
    setServings((previousServings) => previousServings.increment());
  }, []);

  const decrement = useCallback(() => {
    setServings((previousServings) => previousServings.decrement());
  }, []);

  return {
    servings: servings.value,
    increment,
    decrement,
  };
}
