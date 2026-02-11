import websocket from "@fastify/websocket";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const websocketPlugin: FastifyPluginAsync = async (app) => {
  await app.register(websocket);
};

export const registerWebSocket = fp(websocketPlugin, {
  name: "websocket",
});
