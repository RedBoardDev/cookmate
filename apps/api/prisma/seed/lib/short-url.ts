import { randomBytes } from "node:crypto";

const SHORT_URL_BYTES = 8;

export const createShortUrl = (): string => randomBytes(SHORT_URL_BYTES).toString("base64url");
