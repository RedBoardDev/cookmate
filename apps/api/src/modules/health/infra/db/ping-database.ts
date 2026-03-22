import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";

const pingDatabaseFn = async (): Promise<number> => {
  const start = performance.now();
  await getPrisma().$queryRaw`SELECT 1`;
  return Math.round(performance.now() - start);
};

export const pingDatabase = handleError(pingDatabaseFn);
