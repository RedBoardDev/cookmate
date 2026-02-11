import rateLimit from "@fastify/rate-limit";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export interface RateLimitOptions {
  max?: number;
  timeWindow?: string | number;
}

const rateLimitPlugin: FastifyPluginAsync<RateLimitOptions> = async (app, opts) => {
  await app.register(rateLimit, {
    max: opts.max ?? 100,
    timeWindow: opts.timeWindow ?? "1 minute",
  });
};

export const registerRateLimit = fp(rateLimitPlugin, { name: "rate-limit" });
