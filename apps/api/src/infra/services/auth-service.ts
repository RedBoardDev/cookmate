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
      fields: {
        image: "avatar", // * Map Better Auth's 'image' field to Prisma's 'avatar' field
      },
      additionalFields: {
        avatar: {
          type: "string",
          required: true,
        },
      },
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

    // * Only set trustedOrigins if CORS_ORIGINS is defined and non-empty
    // * If undefined/empty, Better Auth will accept all origins (useful for dev/testing tools like Apidog)
    ...(env.CORS_ORIGINS && env.CORS_ORIGINS.length > 0 ? { trustedOrigins: env.CORS_ORIGINS } : {}),

    // * Disable origin check in development/testing to allow tools like Apidog/curl without Origin header
    // * WARNING: This disables CSRF protection. Only use in development/testing environments.
    ...(env.BETTER_AUTH_DISABLE_ORIGIN_CHECK
      ? {
          advanced: {
            disableOriginCheck: true,
          },
        }
      : {}),
  });
}

export type AuthService = ReturnType<typeof createAuthService>;

export type AuthSession = Awaited<ReturnType<AuthService["api"]["getSession"]>>;

export type AuthUser = NonNullable<AuthSession>["user"];

export type AuthSessionData = NonNullable<AuthSession>["session"];
