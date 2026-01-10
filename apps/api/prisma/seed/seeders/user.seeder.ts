import type { PrismaClient } from "../../../src/generated/prisma/client";
import type { AuthService } from "../../../src/infra/services/auth-service";
import type { SeedConfig } from "../config";
import {
  buildFixedUserSeed,
  buildUserSeed,
  type UserSeed,
} from "../factories/user.factory";
import { logger } from "../lib/logger";

export type SeededUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  isFixed?: boolean;
};

const createUser = async (
  prisma: PrismaClient,
  auth: AuthService,
  seed: UserSeed
): Promise<SeededUser> => {
  const existing = await prisma.user.findUnique({
    where: { email: seed.email },
  });

  if (existing) {
    return {
      id: existing.id,
      email: existing.email,
      name: existing.name,
      password: seed.password,
      isFixed: seed.isFixed,
    };
  }

  const response = await (auth.api.signUpEmail as any)({
    body: {
      name: seed.name,
      email: seed.email,
      password: seed.password,
      avatar: seed.avatar,
    },
  });

  return {
    id: response.user.id,
    email: response.user.email,
    name: response.user.name,
    password: seed.password,
    isFixed: seed.isFixed,
  };
};

export const seedUsers = async (
  prisma: PrismaClient,
  auth: AuthService,
  config: SeedConfig
): Promise<SeededUser[]> => {
  logger.info("Seeding users...");

  const totalCount = Math.max(config.users.count, 1);
  const seeds: UserSeed[] = [];

  seeds.push(buildFixedUserSeed(config.users.password));

  for (let i = 0; i < totalCount - 1; i += 1) {
    seeds.push(buildUserSeed(i + 1, config.users.password));
  }

  const users: SeededUser[] = [];
  for (const seed of seeds) {
    users.push(await createUser(prisma, auth, seed));
  }

  const fixed = users.find((user) => user.isFixed);
  if (fixed) {
    logger.info(`Demo credentials: ${fixed.email} / ${fixed.password}`);
  }

  logger.success(`Users seeded (${users.length})`);
  return users;
};
