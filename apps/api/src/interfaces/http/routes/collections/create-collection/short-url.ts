import { randomBytes } from "node:crypto";
import { InvalidCollectionDataError } from "@cookmate/domain/collection";
import { findFirstCollection } from "@/infra/db/repositories/collection/get-collection";

const SHORT_URL_BYTES = 8;

const generateShortUrl = () => randomBytes(SHORT_URL_BYTES).toString("base64url");

export const generateUniqueCollectionShortUrl = async (maxAttempts = 5): Promise<string> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = generateShortUrl();
    const existing = await findFirstCollection({ shortUrl: candidate }, { id: true });
    if (!existing) return candidate;
  }
  throw new InvalidCollectionDataError("Unable to generate a unique short url");
};
