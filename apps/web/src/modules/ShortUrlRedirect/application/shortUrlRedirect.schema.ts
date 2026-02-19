import { z } from "zod";

const shortUrlSchema = z.string().trim().min(1);

export function toShortUrlParam(shortUrl?: string | null): string | null {
  const parsedShortUrl = shortUrlSchema.safeParse(shortUrl);

  if (!parsedShortUrl.success) {
    return null;
  }

  return parsedShortUrl.data;
}
