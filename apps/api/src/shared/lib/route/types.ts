import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import type { z } from "zod";

type Prettify<T> = { [K in keyof T]: T[K] } & {};

export interface RouteSchemas {
  params?: z.ZodType;
  body?: z.ZodType;
  query?: z.ZodType;
  response: Record<number, z.ZodType>;
}

export interface RouteMeta {
  tags: [string, ...string[]];
  summary: string;
  description: string;
}

type InferSchema<T> = T extends z.ZodType ? z.infer<T> : Record<string, never>;

export type RouteContext<T extends RouteSchemas> = Prettify<{
  params: Prettify<InferSchema<T["params"]>>;
  body: Prettify<InferSchema<T["body"]>>;
  query: Prettify<InferSchema<T["query"]>>;
  user: { id: string; email: string; name: string };
  request: FastifyRequest;
  reply: FastifyReply;
}>;

export interface RouteResult {
  status: number;
  data?: unknown;
  metadata?: {
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
    };
  };
}

export type RouteHandler<T extends RouteSchemas> = (ctx: RouteContext<T>) => Promise<RouteResult>;

export interface InitialRouteBuilder {
  get(path?: string): RouteBuilderWithMethod;
  post(path?: string): RouteBuilderWithMethod;
  put(path?: string): RouteBuilderWithMethod;
  patch(path?: string): RouteBuilderWithMethod;
  delete(path?: string): RouteBuilderWithMethod;
}

export interface RouteBuilderWithMethod {
  auth(): RouteBuilderWithMethod;
  meta(config: RouteMeta): RouteBuilderWithMeta;
}

export interface RouteBuilderWithMeta {
  schemas<T extends RouteSchemas>(schemas: T): RouteBuilderComplete<T>;
}

export interface RouteBuilderComplete<T extends RouteSchemas> {
  handle(handler: RouteHandler<T>): FastifyPluginAsync;
}
