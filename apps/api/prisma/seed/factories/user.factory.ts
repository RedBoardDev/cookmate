import { faker } from "@faker-js/faker";

export type UserSeed = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  isFixed?: boolean;
};

export const buildFixedUserSeed = (password: string): UserSeed => ({
  name: "Demo User",
  email: "demo@cookmate.dev",
  password,
  avatar: "avatar_1",
  isFixed: true,
});

export const buildUserSeed = (index: number, password: string): UserSeed => ({
  name: faker.person.fullName(),
  email: `user${index}@cookmate.dev`,
  password,
  avatar: "avatar_1",
});
