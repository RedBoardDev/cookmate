import { collectionValueSchemas } from "@cookmate/domain";
import { z } from "zod";

export const deleteCollectionParamsSchema = z.object({
  collectionId: collectionValueSchemas.id,
});

export const deleteCollectionResponseSchema = z.null();

export const deleteCollectionSchemas = {
  params: deleteCollectionParamsSchema,
  response: {
    204: deleteCollectionResponseSchema,
  },
} as const;

export type DeleteCollectionParams = z.infer<typeof deleteCollectionParamsSchema>;
export type DeleteCollectionCommand = DeleteCollectionParams & { readonly userId: string };
