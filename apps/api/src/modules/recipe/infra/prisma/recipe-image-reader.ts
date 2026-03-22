import { count } from "./reader/count-recipe-images";
import { findFirst, getById } from "./reader/get-recipe-image";
import { list } from "./reader/list-recipe-images";

export type { RecipeImageSelectResult } from "./reader/recipe-image-types";

export const recipeImageReader = {
  getById,
  findFirst,
  list,
  count,
};
