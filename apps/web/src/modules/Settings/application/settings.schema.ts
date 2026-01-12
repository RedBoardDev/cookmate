import { z } from "zod";
import { userField } from "@cookmate/domain/user";

export const updateProfileSchema = z.object({
  name: userField.name,
  avatar: userField.avatar,
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updateProfileDefaultValues: UpdateProfileInput = {
  name: "",
  avatar: "/avatars/avatar_1.png",
};
