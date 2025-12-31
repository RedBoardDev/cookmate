import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import type { AppEnv } from "@/config/env";
import { getPrisma } from "@/infra/db/prisma";

export function createAuthService(env: AppEnv) {
  return betterAuth({
    appName: "Cookmate",

    plugins: [
      openAPI({
        disableDefaultReference: true,
      }),
    ],

    database: prismaAdapter(getPrisma(), {
      provider: "postgresql",
    }),

    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,

    // Mapping des models Prisma
    user: {
      modelName: "User",
    },
    session: {
      modelName: "Session",
    },
    account: {
      modelName: "Account",
    },
    verification: {
      modelName: "Verification",
    },

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

export type AuthSession = Awaited<ReturnType<AuthService["api"]["getSession"]>>;

export type AuthUser = NonNullable<AuthSession>["user"];

export type AuthSessionData = NonNullable<AuthSession>["session"];
