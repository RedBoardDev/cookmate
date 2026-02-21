import { type User as DomainUser, userSchema } from "@cookmate/domain/user";
import type { User } from "@/generated/types";
import { CurrentUserAggregate } from "@/shared/modules/user-session/domain/entity/currentUser.aggregate";
import { DEFAULT_USER_AVATAR_PATH } from "@/shared/modules/user-session/domain/services/userAvatar.service";

export const CurrentSessionMapper = {
  toDomain(user: User): CurrentUserAggregate {
    if (!user.id) {
      throw new Error("User.id is required to map to CurrentUserAggregate");
    }

    const candidate: DomainUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar ?? user.image ?? DEFAULT_USER_AVATAR_PATH,
      emailVerified: user.emailVerified ?? false,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };

    const parsedUser = userSchema.safeParse(candidate);
    if (!parsedUser.success) {
      throw new Error(`Invalid user payload for session: ${parsedUser.error.message}`);
    }

    return CurrentUserAggregate.create({
      user: {
        id: parsedUser.data.id,
        email: parsedUser.data.email,
        name: parsedUser.data.name,
        avatar: parsedUser.data.avatar,
        emailVerified: parsedUser.data.emailVerified,
        createdAt: new Date(parsedUser.data.createdAt),
        updatedAt: new Date(parsedUser.data.updatedAt),
      },
      emailVerified: user.emailVerified ?? false,
    });
  },
};
