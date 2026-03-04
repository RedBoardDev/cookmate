import { collectionValueSchemas } from "@cookmate/domain/collection";
import { z } from "zod";

export const body = z.object({
  name: collectionValueSchemas.name,
  emoji: collectionValueSchemas.emoji,
  description: collectionValueSchemas.description,
});

export const response = {
  201: z.object({
    id: z.uuid(),
  }),
};

export const schemas = { body, response } as const;
