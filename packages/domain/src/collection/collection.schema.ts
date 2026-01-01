import { z } from "zod";

export const collectionVisibilitySchema = z.enum(["PRIVATE", "PUBLIC"]);
export type CollectionVisibility = z.infer<typeof collectionVisibilitySchema>;

export const collectionPropsSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  emoji: z.string().min(1),
  description: z.string().min(1).optional().nullable(),
  visibility: collectionVisibilitySchema,
  shortUrl: z.string().min(1).optional().nullable(),
  ownerId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CollectionProps = z.infer<typeof collectionPropsSchema>;

export const collectionCreateSchema = collectionPropsSchema
  .pick({
    name: true,
    emoji: true,
    description: true,
    visibility: true,
    ownerId: true,
  })
  .extend({
    description: collectionPropsSchema.shape.description.optional().nullable(),
    visibility: collectionPropsSchema.shape.visibility.optional(),
  });

export type CollectionCreateInput = z.infer<typeof collectionCreateSchema>;

export const collectionUpdateSchema = collectionCreateSchema
  .omit({ ownerId: true })
  .partial();
export type CollectionUpdateInput = z.infer<typeof collectionUpdateSchema>;
