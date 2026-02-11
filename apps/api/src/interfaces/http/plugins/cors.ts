import cors from "@fastify/cors";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

export interface CorsOptions {
  origins?: string[];
}

const corsPlugin: FastifyPluginAsync<CorsOptions> = async (app, opts) => {
  await app.register(cors, {
    origin: opts.origins ?? true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });
};

export const registerCors = fp(corsPlugin, { name: "cors" });
