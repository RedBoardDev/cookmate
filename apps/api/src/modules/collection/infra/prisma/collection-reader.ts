import { count, countByOwnerId } from "./reader/count-collections";
import { findFirst, getById } from "./reader/get-collection";
import { list } from "./reader/list-collections";

export const collectionReader = {
  getById,
  findFirst,
  list,
  count,
  countByOwnerId,
};
