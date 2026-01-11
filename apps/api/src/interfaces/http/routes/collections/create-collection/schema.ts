import { collectionFields } from "@cookmate/domain/collection";
import { z } from "zod";

export const body = z.object({
  ...collectionFields.name,
  ...collectionFields.emoji,
  ...collectionFields.description,
});

export const response = {
  201: z.object({
    id: z.uuid(),
  }),
};

export const schemas = { body, response } as const;
