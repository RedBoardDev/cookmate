import type { User } from "@/generated/types";
import { AuthUserEntity } from "@/modules/Auth/domain/entity/authUser.entity";

export const AuthMapper = {
  toDomain(user: User): AuthUserEntity {
    if (!user.id) {
      throw new Error("User.id is required to map to AuthUser");
    }
    return AuthUserEntity.create(
      {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar ?? user.image ?? null,
        emailVerified: user.emailVerified ?? false,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  },
};
