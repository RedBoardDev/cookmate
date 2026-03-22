import { count } from "./reader/count-recipes";
import { findFirst, getById } from "./reader/get-recipe";
import { list } from "./reader/list-recipes";

export const recipeReader = {
  getById,
  findFirst,
  list,
  count,
};
