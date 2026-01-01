import { collectionFields, collectionSnapshotSchema } from "@cookmate/domain/collection";
import { z } from "zod";

export const body = z.object({
  ...collectionFields.name,
  ...collectionFields.emoji,
  ...collectionFields.description,
});

export const response = {
  201: collectionSnapshotSchema,
};

export const schemas = { body, response } as const;
