import { z } from "zod";

const UNIT_NAME_MAX_LENGTH = 50;
const UNIT_ABBREVIATION_MAX_LENGTH = 10;

export const unitField = {
  name: z.string().min(1).max(UNIT_NAME_MAX_LENGTH),
  abbreviation: z.string().min(1).max(UNIT_ABBREVIATION_MAX_LENGTH),
};

export const unitSystemField = {
  createdAt: z.date(),
};

export const unitFields = {
  name: { name: unitField.name },
  abbreviation: { abbreviation: unitField.abbreviation },
  createdAt: { createdAt: unitSystemField.createdAt },
};

export const unitPropsSchema = z.object({
  ...unitField,
  ...unitSystemField,
});

export type UnitProps = z.infer<typeof unitPropsSchema>;

export const unitSchema = unitPropsSchema.extend({
  id: z.uuid(),
});

export type Unit = z.infer<typeof unitSchema>;
