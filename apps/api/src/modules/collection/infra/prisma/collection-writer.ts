import { create } from "./writer/create-collection";
import { deleteCollection } from "./writer/delete-collection";

export const collectionWriter = {
  create,
  delete: deleteCollection,
};
