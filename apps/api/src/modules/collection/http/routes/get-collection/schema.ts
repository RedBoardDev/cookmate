import { collectionValueSchemas } from "@cookmate/domain";
import { z } from "zod";
import { selectConfig } from "./select";

export const params = z.object({
  collectionId: collectionValueSchemas.id,
});

export const response = {
  200: selectConfig.schema,
};

export const schemas = { params, response } as const;

export type GetCollectionParams = z.infer<typeof params>;
