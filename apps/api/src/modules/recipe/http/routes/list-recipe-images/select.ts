import { recipeImageSchema } from "@cookmate/domain";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { getS3Service } from "@/infra/services/s3-service";
import type { SelectConfig } from "@/shared/types/select-config";

const select = {
  id: true,
  storageKey: true,
  name: true,
  mimeType: true,
  size: true,
  order: true,
  recipeId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.RecipeImageSelect;

type SelectResult = Prisma.RecipeImageGetPayload<{ select: typeof select }>[];

const recipeImageWithUrlSchema = recipeImageSchema.extend({
  url: z.url(),
});

const responseSchema = z.array(recipeImageWithUrlSchema);

type ResponseDto = z.infer<typeof responseSchema>;

const transform = async (data: SelectResult): Promise<ResponseDto> => {
  const s3Service = getS3Service();

  return Promise.all(
    data.map(async (image) => {
      const { url } = await s3Service.generateGetPreSignedUrl({
        storageKey: image.storageKey,
      });

      return {
        ...image,
        url,
      };
    }),
  );
};

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};
