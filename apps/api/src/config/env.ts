import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.url(),
  CORS_ORIGINS: z
    .string()
    .optional()
    .transform((s) => s?.split(",").map((o) => o.trim())),
  RATE_LIMIT_MAX: z.coerce.number().optional().default(100),
  RATE_LIMIT_WINDOW: z.string().optional().default("1 minute"),
  SWAGGER_ENABLED: z.coerce.boolean().optional().default(true),

  // // Better Auth
  // BETTER_AUTH_SECRET: z.string().min(32),
  // BETTER_AUTH_URL: z.url(),

  // // OAuth Providers (optional)
  // GOOGLE_CLIENT_ID: z.string().optional(),
  // GOOGLE_CLIENT_SECRET: z.string().optional(),
  // FACEBOOK_CLIENT_ID: z.string().optional(),
  // FACEBOOK_CLIENT_SECRET: z.string().optional(),
  // TWITTER_CLIENT_ID: z.string().optional(),
  // TWITTER_CLIENT_SECRET: z.string().optional(),
});

export type AppEnv = z.infer<typeof EnvSchema>;

export function loadEnv(): AppEnv {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.format());
    process.exit(1);
  }
  return parsed.data;
}
