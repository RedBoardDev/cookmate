import type { GetRecipesRecipeid200 } from "@/generated/types";
import { RecipeIngredient } from "@/modules/RecipeDetail/domain/vo/recipeIngredient.vo";

type RecipeIngredientsData = GetRecipesRecipeid200["data"]["ingredients"];

export const RecipeDetailIngredientsMapper = {
  toDomain(ingredients: RecipeIngredientsData): RecipeIngredient[] {
    return ingredients
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((ingredient) => {
        const amountParts: string[] = [];

        if (ingredient.quantity !== null && ingredient.quantity !== undefined) {
          amountParts.push(ingredient.quantity.toString());
        }

        if (ingredient.unit) {
          amountParts.push(ingredient.unit);
        }

        const amount = amountParts.length > 0 ? amountParts.join(" ") : null;

        return RecipeIngredient.create({
          name: ingredient.name,
          amount,
          note: ingredient.note,
        });
      });
  },
};
