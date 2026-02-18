import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
  NEXT_PUBLIC_SHORT_LINK_BASE_URL: z.url(),
});

function parseEnv() {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_SHORT_LINK_BASE_URL: process.env.NEXT_PUBLIC_SHORT_LINK_BASE_URL,
  });

  if (!result.success) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Invalid environment variables: ${result.error.flatten().fieldErrors}`);
    }
    // Dev fallbacks
    return {
      NEXT_PUBLIC_API_BASE_URL: "http://localhost:3001",
      NEXT_PUBLIC_SHORT_LINK_BASE_URL: "http://localhost:3001",
    };
  }

  return result.data;
}

const parsed = parseEnv();

export const env = {
  apiBaseUrl: parsed.NEXT_PUBLIC_API_BASE_URL,
  shortLinkBaseUrl: parsed.NEXT_PUBLIC_SHORT_LINK_BASE_URL,
};
