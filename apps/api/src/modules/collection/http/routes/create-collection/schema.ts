import {
  createCollectionBodySchema,
  createCollectionResponseSchema,
  createCollectionSchemas,
  type CreateCollectionBody,
} from "../../../commands/create-collection/contract";

export const body = createCollectionBodySchema;
export const response = {
  201: createCollectionResponseSchema,
};
export const schemas = createCollectionSchemas;

export type { CreateCollectionBody };
