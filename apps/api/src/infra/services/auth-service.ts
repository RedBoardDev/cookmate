import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import type { AppEnv } from "@/config/env";
import { getPrisma } from "@/infra/db/prisma";

export function createAuthService(env: AppEnv) {
  return betterAuth({
    database: prismaAdapter(getPrisma(), {
      provider: "postgresql",
    }),

    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,

    emailAndPassword: {
      enabled: true,
    },

    socialProviders: {
      ...(env.GOOGLE_CLIENT_ID &&
        env.GOOGLE_CLIENT_SECRET && {
          google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          },
        }),

      ...(env.FACEBOOK_CLIENT_ID &&
        env.FACEBOOK_CLIENT_SECRET && {
          facebook: {
            clientId: env.FACEBOOK_CLIENT_ID,
            clientSecret: env.FACEBOOK_CLIENT_SECRET,
          },
        }),

      ...(env.TWITTER_CLIENT_ID &&
        env.TWITTER_CLIENT_SECRET && {
          twitter: {
            clientId: env.TWITTER_CLIENT_ID,
            clientSecret: env.TWITTER_CLIENT_SECRET,
          },
        }),
    },

    trustedOrigins: env.CORS_ORIGINS ?? [],
  });
}

export type AuthService = ReturnType<typeof createAuthService>;
