import { SettingsAggregate } from "@/modules/Settings/domain/entity/settings.aggregate";
import type { CurrentUserAggregate } from "@/shared/modules/user-session/domain/entity/currentUser.aggregate";
import { DEFAULT_USER_AVATAR_PATH } from "@/shared/modules/user-session/domain/services/userAvatar.service";

export const SettingsMapper = {
  toDomain(user: CurrentUserAggregate): SettingsAggregate {
    return SettingsAggregate.create({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatarUrl ?? DEFAULT_USER_AVATAR_PATH,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      emailVerified: user.emailVerified,
    });
  },
};
