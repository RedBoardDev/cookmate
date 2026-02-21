import { userField } from "@cookmate/domain/user";
import { z } from "zod";
import { DEFAULT_USER_AVATAR_PATH } from "@/shared/modules/user-session/domain/services/userAvatar.service";

export const updateProfileSchema = z.object({
  name: userField.name,
  avatar: userField.avatar,
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updateProfileDefaultValues: UpdateProfileInput = {
  name: "",
  avatar: DEFAULT_USER_AVATAR_PATH,
};
