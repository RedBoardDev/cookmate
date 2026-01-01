import { randomBytes } from "node:crypto";
import {
  CollectionNotFoundError,
  InvalidCollectionDataError,
} from "@cookmate/domain/collection";
import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";

const SHORT_URL_BYTES = 8;

const generateShortUrl = () =>
  randomBytes(SHORT_URL_BYTES).toString("base64url");

const findCollectionByShortUrl = async (shortUrl: string) => {
  try {
    return await getCollectionSelect({ shortUrl }, { id: true });
  } catch (error) {
    if (error instanceof CollectionNotFoundError) {
      return null;
    }
    throw error;
  }
};

export const generateUniqueCollectionShortUrl = async (maxAttempts = 5): Promise<string> => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidate = generateShortUrl();
    const existing = await findCollectionByShortUrl(candidate);
    if (!existing) return candidate;
  }
  throw new InvalidCollectionDataError("Unable to generate a unique short url");
};