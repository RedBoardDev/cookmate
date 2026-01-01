import { z } from "zod";
import { collectionSnapshotSchema } from "@cookmate/domain/collection";

export const params = z.object({
  collectionId: z.uuid(),
});

export const response = {
  200: collectionSnapshotSchema,
};

export const schemas = { params, response } as const;
