import type { FastifyServerOptions } from "fastify";

export function buildLogger(env: { NODE_ENV: string }): FastifyServerOptions["logger"] {
  const isDev = env.NODE_ENV !== "production";

  return {
    level: isDev ? "debug" : "info",
    transport: isDev
      ? {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        }
      : undefined,
  };
}
