import type { collectionInsertSchema } from "@cookmate/domain";
import type { z } from "zod";

export type CollectionWriteInput = z.infer<typeof collectionInsertSchema>;
