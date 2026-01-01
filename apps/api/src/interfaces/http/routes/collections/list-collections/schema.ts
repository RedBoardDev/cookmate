import { z } from "zod";
import { collectionSnapshotSchema } from "@cookmate/domain/collection";

export const response = {
  200: z.array(collectionSnapshotSchema),
};

export const schemas = { response } as const;
