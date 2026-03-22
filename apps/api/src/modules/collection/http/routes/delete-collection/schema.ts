import {
  deleteCollectionParamsSchema,
  deleteCollectionResponseSchema,
  deleteCollectionSchemas,
} from "../../../commands/delete-collection/contract";
import type { z } from "zod";

export const params = deleteCollectionParamsSchema;

export const response = {
  204: deleteCollectionResponseSchema,
};

export const schemas = deleteCollectionSchemas;

export type DeleteCollectionParams = z.infer<typeof params>;
