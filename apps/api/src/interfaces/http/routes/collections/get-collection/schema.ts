import { z } from "zod";
import { selectConfig } from "./select";

export const params = z.object({
  collectionId: z.uuid(),
});

export const response = {
  200: selectConfig.schema,
};

export const schemas = { params, response } as const;
