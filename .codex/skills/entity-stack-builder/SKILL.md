---
name: entity-stack-builder
description: Composite workflow to scaffold a full stack for a Prisma model: domain module, repository, and HTTP CRUD routes. Use when asked to create/generate the stack for an entity (e.g., "Crée tout le stack pour Recipe", "Génère domaine+repo+routes pour Ingredient", "CRUD complet pour Member dans Collection"). Handles partial existing code by only creating missing parts.
---
# Entity Stack Builder

Build the domain + repository + CRUD routes (create, list, get, delete) for a Prisma model, reusing existing skills and skipping what already exists. Follows repo patterns from `collection` (domain, repo, routes).

## Inputs to confirm
- Prisma model name (PascalCase) in `apps/api/prisma/schema.prisma`.
- Naming variants: Entity (PascalCase), entity (camel), entity-kebab, plural forms (kebab + Pascal tags).
- Sub-entity? If yes, parent folder + `parentId` param name, route prefix.
- Auth/meta text: tags (PascalCase plural), summary/description.

## Workflow
1) Locate model in Prisma schema. If missing, stop and ask.
2) Domain:
   - Path `packages/domain/src/{entity-kebab}`. If already exists, skim to ensure fields align with Prisma; otherwise run `domain-builder` flow. Update `packages/domain/src/index.ts` export if missing.
3) Repository:
   - Path `apps/api/src/infra/db/repositories/{entity-kebab}`. If missing, use `repository-builder` flow. If present, only add missing files (types, mapper, get/list/count) without overwriting.
   - Map FK renames (e.g., userId -> ownerId), include createdAt/updatedAt, and parentId filters for sub-entities.
4) Routes CRUD:
   - Path `apps/api/src/interfaces/http/routes/{entities-kebab}/`. If missing, use `crud-routes-builder` pattern. If present, add missing routes only (create/list/get/delete) and register in index.
   - Ensure imports point to domain + repo; leave unresolved if upstream code missing.
   - For sub-entities, place under `{parent-entities}/{sub-entities}` and register with prefix `/:parentId/{sub-entities}`.
5) Index/exports hygiene:
   - Ensure domain `index.ts` exports module.
   - Ensure routes parent `index.ts` registers all four routes (+ subroutes if any).
6) Validation pass:
   - Quick check for consistent naming (kebab/plural), tags PascalCase plural, schemas match handlers, RouteHandler uses `schemas`.

## References
- Domain pattern: `packages/domain/src/collection/**`, skill `domain-builder`.
- Repository pattern: `apps/api/src/infra/db/repositories/collection/**`, skill `repository-builder`.
- Routes pattern: `apps/api/src/interfaces/http/routes/collections/**`, skill `crud-routes-builder`.
