import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";

const deleteFn = async (id: string): Promise<void> => {
  await getPrisma().collection.delete({ where: { id } });
};

export const deleteCollection = handleError(deleteFn);
