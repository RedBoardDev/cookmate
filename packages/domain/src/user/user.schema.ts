import { z } from "zod";

const USER_NAME_MAX_LENGTH = 50;

export const userField = {
  email: z.email(),
  name: z.string().min(1).max(USER_NAME_MAX_LENGTH),
  avatar: z.string().min(1),
};

export const userSystemField = {
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const userFields = {
  email: { email: userField.email },
  name: { name: userField.name },
  avatar: { avatar: userField.avatar },
  createdAt: { createdAt: userSystemField.createdAt },
  updatedAt: { updatedAt: userSystemField.updatedAt },
};

export const userPropsSchema = z.object({
  ...userField,
  ...userSystemField,
});

export type UserProps = z.infer<typeof userPropsSchema>;

export const userSchema = userPropsSchema.extend({
  id: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
