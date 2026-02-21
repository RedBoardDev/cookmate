import { RecipeMapper } from "@/modules/Recipes/application/recipe.mapper";
import type { RecipesPage } from "@/modules/Recipes/application/recipes-infinite-query";
import type { RecipeEntity } from "@/modules/Recipes/domain/entity/recipe.entity";

export function mapUniqueRecipesFromPages(pages: readonly RecipesPage[]): RecipeEntity[] {
  const uniqueRecipeIds = new Set<string>();
  const recipes: RecipeEntity[] = [];

  for (const page of pages) {
    for (const item of page.data) {
      const recipe = RecipeMapper.toDomain(item);
      if (uniqueRecipeIds.has(recipe.id)) {
        continue;
      }

      uniqueRecipeIds.add(recipe.id);
      recipes.push(recipe);
    }
  }

  return recipes;
}

export function getRecipesTotalItemsFromPages(pages: readonly RecipesPage[]): number {
  const pagesWithMetadata = pages.filter((page) => page.metadata?.pagination.totalItems !== undefined);
  if (pagesWithMetadata.length > 0) {
    const lastPageWithMetadata = pagesWithMetadata[pagesWithMetadata.length - 1];
    return lastPageWithMetadata.metadata?.pagination.totalItems ?? 0;
  }

  return pages.reduce((total, page) => total + page.data.length, 0);
}
