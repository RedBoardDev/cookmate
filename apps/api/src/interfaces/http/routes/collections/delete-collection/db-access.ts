import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";

const deleteCollectionFn = async (id: string) => {
  await getPrisma().collection.delete({ where: { id } });
};

export const deleteCollection = handleError(deleteCollectionFn);
