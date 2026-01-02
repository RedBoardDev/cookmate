---
name: crud-routes-builder
description: Generate base HTTP CRUD routes (create, list, get, delete) for a domain entity in apps/api/src/interfaces/http/routes, using existing domain fields/schemas and repositories; handles nested sub-entities via Fastify prefixes. Use when asked to scaffold CRUD routes for an entity (e.g., "Crée les routes CRUD pour Recipe", "Génère le CRUD de l'entité Ingredient", "Fais les routes CRUD de Member dans Collection").
---
# CRUD Routes Builder

Create the four base routes under `apps/api/src/interfaces/http/routes/{entities}/` following the `collections` example already in the repo. Domain + repository must already exist; leave imports unresolved if missing. No update route.

## Inputs to confirm
- Singular + plural names (kebab case), especially irregular plurals.
- Whether this is a sub-entity and its parent (parent folder + `parentId` param name).
- Tag/summary/description strings (PascalCase plural tags; e.g., `["Collections"]`, `["Collection Members"]`).

## Naming & placement
- Folder: lower kebab plural (e.g., `collections`).
- Files: `create-{entity}`, `list-{entities}`, `get-{entity}`, `delete-{entity}`.
- Parent index registers routes; sub-entity routes live in `{parent-entities}/{sub-entities}/` and are registered from the parent with `prefix: "/:parentId/sub-entities"`.

## Route registration (index.ts)
```ts
import type { FastifyInstance } from "fastify";
import { createEntityRoute } from "./create-entity";
import { listEntitiesRoute } from "./list-entities";
import { getEntityRoute } from "./get-entity";
import { deleteEntityRoute } from "./delete-entity";
// import { subRoutes } from "./sub-entities";

export async function entitiesRoutes(app: FastifyInstance) {
  await app.register(listEntitiesRoute);
  await app.register(getEntityRoute);
  await app.register(createEntityRoute);
  await app.register(deleteEntityRoute);
  // await app.register(subRoutes, { prefix: "/:parentId/sub-entities" });
}
```

## Create route (create-{entity}/)
- `index.ts`: `route().post().auth().meta({ tags, summary, description }).schemas(schemas).handle(createEntityHandler)`.
- `schema.ts`: `body` from domain fields (`{ ...entityFields.foo }`), `response` `{ 201: entitySnapshotSchema }`, export `schemas`.
- `handler.ts`: `RouteHandler<typeof schemas>`, grab `ctx.user`/`ctx.body`, call local `createEntity` from `db-access`, return `{ status: HttpStatus.Created, data: entity.toSnapshot() }`.
- `db-access.ts`: import `getPrisma`, `handleError`, `{ Entity }` from `@cookmate/domain/{entity}`; build entity (add timestamps/owner if required), persist with prisma (e.g., `getPrisma().entity.create`), wrap with `handleError`.

## List route (list-{entities}/)
- `index.ts`: `route().get().auth().meta(...).schemas(schemas).handle(listEntitiesHandler)`.
- `schema.ts`: `response` `{ 200: z.array(entitySnapshotSchema) }`, export `schemas`.
- `handler.ts`: `RouteHandler`; call repository `list{Entities}Entity` from `@/infra/db/repositories/{entity}/list-{entities}`; return `{ status: HttpStatus.OK, data: results.map((x) => x.toSnapshot()) }`.

## Get route (get-{entity}/)
- `index.ts`: `route().get("/:{entityId}").auth().meta(...).schemas(schemas).handle(getEntityHandler)`.
- `schema.ts`: `params` `z.object({ {entityId}: z.uuid() })`, `response` `{ 200: entitySnapshotSchema }`, export `schemas`.
- `handler.ts`: fetch via repository `get{Entity}Entity` (`@/infra/db/repositories/{entity}/get-{entity}`); return `{ status: HttpStatus.OK, data: entity.toSnapshot() }`; keep auth/validation aligned with domain needs.

## Delete route (delete-{entity}/)
- `index.ts`: `route().delete("/:{entityId}").auth().meta(...).schemas(schemas).handle(deleteEntityHandler)`.
- `schema.ts`: `params` UUID, `response` `{ 204: z.null() }`, export `schemas`.
- `handler.ts`: load entity via repository if checks needed (owner, relations), then call local `deleteEntity` (db-access) and return `{ status: HttpStatus.NoContent }`.
- `db-access.ts`: `deleteEntity = handleError(async (id) => { await getPrisma().entity.delete({ where: { id } }); })`.

## Sub-entities
- Folder: `{parent-entities}/{sub-entities}/`, with its own `index.ts` registering subroutes.
- Parent `index.ts` registers subroutes with `prefix: "/:parentId/{sub-entities}"` and parent params include `{parentId: z.uuid()}`.
- Tags: PascalCase plural with parent context (e.g., `["Collection Members"]`).

## References
- Use `apps/api/src/interfaces/http/routes/collections/**` as the primary pattern source. Align imports with: `@cookmate/domain/{entity}`, `@/infra/db/repositories/{entity}/...`, `@/shared/lib/route`, `@/shared/enums/http-status.enum`, `@/shared/utils/handle-error`, `@/infra/db/prisma`.
