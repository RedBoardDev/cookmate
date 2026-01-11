import type { User } from "@/generated/types";

export type AuthUser = {
  id?: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

export const AuthMapper = {
  toAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar ?? user.image ?? null
    };
  }
};
