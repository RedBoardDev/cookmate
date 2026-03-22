import { randomBytes } from "node:crypto";
import { InvalidRecipeDataError } from "@cookmate/domain/recipe";

const SHORT_URL_BYTES = 8;

function generateShortUrl(): string {
  return randomBytes(SHORT_URL_BYTES).toString("base64url");
}

export async function generateUniqueShortUrl(
  existsByShortUrl: (shortUrl: string) => Promise<boolean>,
  maxAttempts = 5,
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = generateShortUrl();
    const exists = await existsByShortUrl(candidate);

    if (!exists) {
      return candidate;
    }
  }

  throw new InvalidRecipeDataError("Unable to generate a unique short url");
}
