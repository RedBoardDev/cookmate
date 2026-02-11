import type { FastifyInstance, FastifyReply, FastifyRequest, preHandlerHookHandler } from "fastify";
import fp from "fastify-plugin";
import type { AuthService, AuthSessionData, AuthUser } from "@/infra/services/auth-service";
import { ApiError } from "@/interfaces/http/errors/api.error";
import { toWebHeaders } from "@/shared/lib/headers";

declare module "fastify" {
  interface FastifyInstance {
    auth: AuthService;
    requireAuth: preHandlerHookHandler;
  }

  interface FastifyRequest {
    user: AuthUser;
    session: AuthSessionData;
  }
}

export interface AuthPluginOptions {
  auth: AuthService;
}

/**
 * Builds the base URL from the request, handling reverse proxy scenarios.
 * Supports x-forwarded-proto and x-forwarded-host headers.
 */
function getRequestBaseUrl(request: FastifyRequest): string {
  const forwardedProto = request.headers["x-forwarded-proto"];
  const forwardedHost = request.headers["x-forwarded-host"];

  const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || "http";
  const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || request.headers.host || "localhost";

  return `${protocol}://${host}`;
}

async function authPlugin(app: FastifyInstance, opts: AuthPluginOptions) {
  app.decorate("auth", opts.auth);

  app.decorateRequest("user", null as unknown as AuthUser);
  app.decorateRequest("session", null as unknown as AuthSessionData);

  const requireAuth: preHandlerHookHandler = async (request, _reply) => {
    const headers = toWebHeaders(request.headers);

    try {
      const result = await opts.auth.api.getSession({ headers });

      if (!result) {
        throw ApiError.unauthorized("Invalid or expired session");
      }

      request.user = result.user;
      request.session = result.session;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      request.log.error(error, "Session validation failed");
      throw ApiError.unauthorized("Authentication failed");
    }
  };

  app.decorate("requireAuth", requireAuth);

  // Better Auth handler - hidden from Swagger (real routes come from Better Auth OpenAPI)
  app.all("/api/auth/*", { schema: { hide: true } }, async (request: FastifyRequest, reply: FastifyReply) => {
    const baseUrl = getRequestBaseUrl(request);
    const url = new URL(request.url, baseUrl);
    const headers = toWebHeaders(request.headers);

    const fetchRequest = new Request(url.toString(), {
      method: request.method,
      headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? JSON.stringify(request.body) : undefined,
    });

    try {
      const response = await opts.auth.handler(fetchRequest);

      response.headers.forEach((value, key) => {
        void reply.header(key, value);
      });

      return reply.status(response.status).send(await response.text());
    } catch (error) {
      request.log.error(error, "Better Auth handler error");
      throw ApiError.internal("Authentication service error");
    }
  });
}

export const registerAuth = fp(authPlugin, {
  name: "auth",
  dependencies: ["cors"],
});
