import { count } from "./reader/count-recipes";
import { findFirst, getById } from "./reader/get-recipe";
import { list } from "./reader/list-recipes";

export type { RecipeSelectResult } from "./reader/types";

export const recipeReader = {
  getById,
  findFirst,
  list,
  count,
};
