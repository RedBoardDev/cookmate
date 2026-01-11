import type { GetRecipes200 } from "@/generated/types";
import { RecipeEntity } from "@cookmate/domain/recipe";

type RecipeApiModel = GetRecipes200["data"][number];

export const RecipeMapper = {
  toDomain(data: RecipeApiModel): RecipeEntity {
    return RecipeEntity.create(
      {
        title: data.title,
        description: data.description ?? null,
        servings: data.servings,
        prepTimeMin: data.prepTimeMin ?? null,
        cookTimeMin: data.cookTimeMin ?? null,
        restTimeMin: data.restTimeMin ?? null,
        totalTimeMin: data.totalTimeMin,
        difficulty: data.difficulty ?? null,
        budget: data.budget ?? null,
        tags: data.tags,
        source: data.source,
        sourceUrl: data.sourceUrl ?? null,
        shortUrl: data.shortUrl ?? null,
        userId: data.userId,
        forkedFromDiscoverId: data.forkedFromDiscoverId ?? null,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      },
      data.id
    );
  }
};
