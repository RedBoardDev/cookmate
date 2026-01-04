import { z } from "zod";
import { collectionMemberSnapshotSchema } from "@cookmate/domain/collection";

export const params = z.object({
  collectionId: z.uuid(),
});

export const body = z.object({
  email: z.email(),
});

export const response = {
  201: collectionMemberSnapshotSchema,
};

export const schemas = { params, body, response } as const;
