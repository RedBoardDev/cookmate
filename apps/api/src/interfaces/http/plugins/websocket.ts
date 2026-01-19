import websocket from "@fastify/websocket";
import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

const websocketPlugin: FastifyPluginAsync = async (app) => {
  await app.register(websocket);
};

export const registerWebSocket = fp(websocketPlugin, {
  name: "websocket",
});
