import type { User } from "@/generated/types";
import { UserEntity } from "@cookmate/domain/user";
import { SettingsAggregate } from "../domain/settings.aggregate";

export const SettingsMapper = {
  toDomain(user: User): SettingsAggregate {
    return SettingsAggregate.create({
      user: UserEntity.create(
        {
          email: user.email,
          name: user.name,
          avatar: user.avatar ?? user.image ?? "/avatars/avatar_1.png",
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        },
        user.id
      ),
      emailVerified: user.emailVerified ?? false,
    });
  },
};
