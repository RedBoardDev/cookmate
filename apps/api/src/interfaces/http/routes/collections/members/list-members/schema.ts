import { collectionMemberSnapshotSchema } from "@cookmate/domain/collection-member";
import { z } from "zod";

export const params = z.object({
  collectionId: z.uuid(),
});

export const response = {
  200: z.array(collectionMemberSnapshotSchema),
};

export const schemas = { params, response } as const;
