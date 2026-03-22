import { create } from "./writer/create-recipe";
import { update } from "./writer/update-recipe";
import { updateCollections } from "./writer/update-recipe-collections";

export const recipeWriter = {
  create,
  update,
  updateCollections: updateCollections,
};
