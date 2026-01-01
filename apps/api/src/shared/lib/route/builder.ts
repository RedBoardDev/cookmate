import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import type {
  RouteMeta,
  RouteSchemas,
  RouteHandler,
  InitialRouteBuilder,
  RouteBuilderWithMethod,
  RouteBuilderWithMeta,
  RouteBuilderComplete,
} from "./types";
import { wrapResponseSchemas } from "./helpers";
import { formatSuccess } from "@/interfaces/http/helpers/reply";
import { HttpStatus } from "@/shared/enums/http-status.enum";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface RouteConfig {
  method: HttpMethod;
  path: string;
  auth: boolean;
  meta: RouteMeta;
  schemas: RouteSchemas;
}

class RouteBuilderImpl {
  private config: Partial<RouteConfig> = {};

  get(path = ""): RouteBuilderWithMethod {
    return this.setMethod("get", path);
  }

  post(path = ""): RouteBuilderWithMethod {
    return this.setMethod("post", path);
  }

  put(path = ""): RouteBuilderWithMethod {
    return this.setMethod("put", path);
  }

  patch(path = ""): RouteBuilderWithMethod {
    return this.setMethod("patch", path);
  }

  delete(path = ""): RouteBuilderWithMethod {
    return this.setMethod("delete", path);
  }

  private setMethod(method: HttpMethod, path: string): RouteBuilderWithMethod {
    this.config.method = method;
    this.config.path = path;
    return this as unknown as RouteBuilderWithMethod;
  }

  auth(): RouteBuilderWithMethod {
    this.config.auth = true;
    return this as unknown as RouteBuilderWithMethod;
  }

  meta(meta: RouteMeta): RouteBuilderWithMeta {
    this.config.meta = meta;
    return this as unknown as RouteBuilderWithMeta;
  }

  schemas<T extends RouteSchemas>(schemas: T): RouteBuilderComplete<T> {
    this.config.schemas = schemas;
    return this as unknown as RouteBuilderComplete<T>;
  }

  handle<T extends RouteSchemas>(handler: RouteHandler<T>): FastifyPluginAsync {
    const cfg = this.config as RouteConfig;

    return async (app: FastifyInstance) => {
      const routeOptions = {
        ...(cfg.auth && { preHandler: app.requireAuth }),
        schema: {
          tags: cfg.meta.tags,
          summary: cfg.meta.summary,
          description: cfg.meta.description,
          ...(cfg.schemas.params && { params: cfg.schemas.params }),
          ...(cfg.schemas.body && { body: cfg.schemas.body }),
          ...(cfg.schemas.query && { querystring: cfg.schemas.query }),
          response: wrapResponseSchemas(cfg.schemas.response),
        },
      };

      app[cfg.method](cfg.path, routeOptions, async (request, reply) => {
        const ctx = {
          params: request.params,
          body: request.body,
          query: request.query,
          user: request.user,
          request,
          reply,
        };

        const result = await handler(ctx as Parameters<typeof handler>[0]);

        if (result.status === HttpStatus.NoContent) {
          return reply.status(result.status).send();
        }

        return reply.status(result.status).send(formatSuccess(result.data));
      });
    };
  }
}

/**
 *
 * @example
 * ```typescript
 * export const myRoute = route()
 *   .post()
 *   .auth()
 *   .meta({
 *     tags: ["Users"],
 *     summary: "Create user",
 *     description: "Creates a new user account",
 *   })
 *   .schemas(schemas)
 *   .handle(myHandler);
 * ```
 */
export function route(): InitialRouteBuilder {
  return new RouteBuilderImpl() as unknown as InitialRouteBuilder;
}
