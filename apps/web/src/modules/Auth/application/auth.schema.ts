import { userField } from "@cookmate/domain/user";
import { z } from "zod";

export const loginSchema = z.object({
  email: userField.email
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  rememberMe: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const loginDefaultValues: LoginInput = {
  email: "",
  password: "",
  rememberMe: false,
};
