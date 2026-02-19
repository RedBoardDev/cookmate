import type { GetRecipesShortUrlShorturlQueryResponse } from "@/generated/types";
import { ShortUrlRedirectEntity } from "@/modules/ShortUrlRedirect/domain/entity/shortUrlRedirect.entity";

export const ShortUrlRedirectMapper = {
  toDomain(shortUrl: string, apiData?: GetRecipesShortUrlShorturlQueryResponse | null): ShortUrlRedirectEntity | null {
    const recipeId = apiData?.data?.id;

    if (!recipeId) {
      return null;
    }

    return ShortUrlRedirectEntity.create({
      shortUrl,
      recipeId,
    });
  },
};
