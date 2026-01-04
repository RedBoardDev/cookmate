---
name: repository-builder
description: Generate a full repository module in apps/api/src/infra/db/repositories/{entity-kebab} for an existing Prisma model/domain pair. Use when asked to create or generate the repository for an entity (e.g., "Crée le repository pour Recipe", "Génère le repo de l'entité User", "Fais le repository Ingredient").
---

# Repository Builder

## Inputs
- Prisma model name in apps/api/prisma/schema.prisma (PascalCase).
- Domain module in packages/domain/src/{entity-kebab}/ for NotFound errors (or the owning domain when the entity lives under another module, e.g., collection-member -> collection).
- Naming variants: Entity (PascalCase), entity (lowerCamel), entity-kebab (kebab-case), plural for list/count (recipe -> recipes, collection-member -> collection-members).

## Workflow
1. Confirm the domain module exists and identify the NotFound error to use.
2. Inspect the Prisma model fields and relation names to build correct where inputs.
3. Create apps/api/src/infra/db/repositories/{entity-kebab}/ with:
   - types.ts
   - get-{entity-kebab}.ts
   - list-{entity-plural}.ts
   - count-{entity-plural}.ts
4. Keep imports consistent with existing repositories.

## File templates (Collection reference)
- **types.ts**: generic helpers
  - import Prisma.
  - export {Entity}SelectResult<TSelect extends Prisma.{Entity}Select> = Prisma.{Entity}GetPayload<{ select: TSelect }>.
  - export {Entity}IncludeResult<TSelect extends Prisma.{Entity}Include> = Prisma.{Entity}GetPayload<{ include: TSelect }>.
  - export List{Entities}SelectQueryType = {Entity}SelectResult<Prisma.{Entity}Select>[];
  - export Get{Entity}SelectQueryType = {Entity}SelectResult<Prisma.{Entity}Select>.

- **get-{entity-kebab}.ts**: get + findFirst
  - imports: Prisma, getPrisma, handleError, {Entity}NotFoundError (or the domain error used in that module).
  - get{Entity}SelectFn(where: Prisma.{Entity}WhereUniqueInput, select: TSelect) => findUnique; throw NotFoundError when null.
  - findFirst{Entity}Fn(where: Prisma.{Entity}WhereInput, select: TSelect) => findFirst; can return null.
  - export get{Entity}Select and findFirst{Entity} wrapped with handleError.

- **list-{entity-plural}.ts**: list + pagination
  - imports: Prisma, getPrisma, handleError, paginationForComplexQuery/Pagination, {Entity}SelectResult.
  - list{Entities}SelectFn(where, select, orderBy?, pagination?) => compute paginationQuery via paginationForComplexQuery(pagination, () => count{Entities}AboveId(pagination?.findId, where)); findMany with default orderBy id desc; wrap export with handleError.
  - helper count{Entities}AboveId(id, where?) => if no id return undefined; else prisma.{entity}.count({ where: { ...where, id: { gt: id } } }).

- **count-{entity-plural}.ts**: count helper
  - imports: Prisma, getPrisma.
  - count{Entities}Query = (where: Prisma.{Entity}WhereInput) => getPrisma().{entity}.count({ where: { ...where } });
  - export type count{Entities}QueryType = Awaited<ReturnType<typeof count{Entities}Query>>.
  - export count{Entities}(where) => await count{Entities}Query(where).

## Conventions and notes
- Repositories are select-focused (raw Prisma payloads). Do not map to domain entities here; transformations happen in route selectConfig or in db-access modules.
- Wrap select/list/get helpers with handleError; count stays unwrapped (match existing pattern).
- Use Prisma types: {Entity}Select, {Entity}Include, {Entity}WhereUniqueInput, {Entity}WhereInput, {Entity}OrderByWithRelationInput.
- Keep 2-space indent, 100-char lines (Biome default). Use ESM imports.
- Respect pluralization used elsewhere in repos (recipe -> recipes, collection-member -> collection-members); use kebab-case for folder/files.

## References
- apps/api/src/infra/db/repositories/collection/**
- apps/api/src/infra/db/repositories/collection-member/**
