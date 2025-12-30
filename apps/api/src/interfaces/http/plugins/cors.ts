import cors from "@fastify/cors";
import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

export interface CorsOptions {
  origins?: string;
}

const corsPlugin: FastifyPluginAsync<CorsOptions> = async (app, opts) => {
  await app.register(cors, {
    origin: opts.origins ? opts.origins.split(",").map((o) => o.trim()) : true,
    credentials: true,
  });
};

export const registerCors = fp(corsPlugin, { name: "cors" });
