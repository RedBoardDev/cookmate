import { userField } from "@cookmate/domain/user";
import type { I18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { z } from "zod";

export function createLoginSchema(i18n: I18n) {
  return z.object({
    email: userField.email.toLowerCase().trim(),
    password: z.string().min(8, i18n._(msg`Password must be at least 8 characters`)),
    rememberMe: z.boolean(),
  });
}

export type LoginInput = z.infer<ReturnType<typeof createLoginSchema>>;
