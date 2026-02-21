import type { I18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { z } from "zod";

export function createChangePasswordSchema(i18n: I18n) {
  return z
    .object({
      currentPassword: z.string().min(1, i18n._(msg`Current password is required`)),
      newPassword: z.string().min(8, i18n._(msg`Password must be at least 8 characters`)),
      confirmPassword: z.string().min(1, i18n._(msg`Please confirm your password`)),
      revokeOtherSessions: z.boolean().optional().default(false),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: i18n._(msg`Passwords do not match`),
      path: ["confirmPassword"],
    });
}

export type ChangePasswordInput = z.infer<ReturnType<typeof createChangePasswordSchema>>;

export const changePasswordDefaultValues: ChangePasswordInput = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  revokeOtherSessions: false,
};
