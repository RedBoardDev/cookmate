import { z } from "zod";

const INSTRUCTION_TEXT_MAX_LENGTH = 2000;

export const instructionField = {
  text: z.string().min(1).max(INSTRUCTION_TEXT_MAX_LENGTH),
  durationMin: z.number().int().nonnegative().nullable(),
  order: z.number().int().nonnegative(),
};

export const instructionSystemField = {
  recipeId: z.uuid().nullable(),
  discoverRecipeId: z.uuid().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const instructionFields = {
  text: { text: instructionField.text },
  durationMin: { durationMin: instructionField.durationMin },
  order: { order: instructionField.order },
  recipeId: { recipeId: instructionSystemField.recipeId },
  discoverRecipeId: { discoverRecipeId: instructionSystemField.discoverRecipeId },
  createdAt: { createdAt: instructionSystemField.createdAt },
  updatedAt: { updatedAt: instructionSystemField.updatedAt },
};

export const instructionPropsSchema = z.object({
  ...instructionField,
  ...instructionSystemField,
});

export type InstructionProps = z.infer<typeof instructionPropsSchema>;

export const instructionSchema = instructionPropsSchema.extend({
  id: z.uuid(),
});

export type Instruction = z.infer<typeof instructionSchema>;
