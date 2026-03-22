
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

const countFn = (where: Prisma.CollectionWhereInput) => getPrisma().collection.count({ where: { ...where } });

export const count = async (where: Prisma.CollectionWhereInput): Promise<number> => countFn(where);

const countByOwnerIdFn = (ownerId: string) => getPrisma().collection.count({ where: { ownerId } });

export const countByOwnerId = async (ownerId: string): Promise<number> => countByOwnerIdFn(ownerId);
