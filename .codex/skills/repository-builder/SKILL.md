---
name: repository-builder
description: Generate a full repository module in apps/api/src/infra/db/repositories/{entity-kebab} for an existing Prisma model/domain pair. Use when asked to create or generate the repository for an entity (e.g., "Crée le repository pour Recipe", "Génère le repo de l'entité User", "Fais le repository Ingredient").
---

# Repository Builder

## Inputs
- Prisma model name in apps/api/prisma/schema.prisma (PascalCase).
- Domain module in packages/domain/src/{entity-kebab}/ providing {Entity}Entity and NotFoundError.
- Naming variants: Entity (PascalCase), entity (lowerCamel), entity-kebab (kebab-case), plural for list/count (e.g., recipe -> recipes, collection-member -> collection-members).

## Workflow
1. Confirm the domain module exists; if missing, stop and ask for it to be created first.
2. Inspect the domain entity props to understand property names (e.g., ownerId vs userId) and required fields.
3. Inspect the Prisma model fields to match select fields to domain props (map renamed fields explicitly: Prisma userId -> domain ownerId, etc.).
4. Create apps/api/src/infra/db/repositories/{entity-kebab}/ with files: types.ts, {entity-kebab}-entity.ts, get-{entity-kebab}.ts, list-{entity-kebabs}.ts, count-{entity-kebabs}.ts.
5. Keep imports consistent: @/generated/prisma/client (Prisma), @/infra/db/prisma (getPrisma), @/shared/utils/handle-error (handleError), @/shared/lib/pagination (paginationForComplexQuery/Pagination when listing), @cookmate/domain/{entity-kebab} for Entity/NotFoundError.

## File templates
- **types.ts**: generic helpers
  - import Prisma.
  - export {Entity}SelectResult<TSelect extends Prisma.{Entity}Select> = Prisma.{Entity}GetPayload<{ select: TSelect }>.
  - export {Entity}IncludeResult<TSelect extends Prisma.{Entity}Include> = Prisma.{Entity}GetPayload<{ include: TSelect }>.
  - export List{Entities}SelectQueryType = {Entity}SelectResult<Prisma.{Entity}Select>[];
  - export Get{Entity}SelectQueryType = {Entity}SelectResult<Prisma.{Entity}Select>.

- **{entity-kebab}-entity.ts**: selector + mapper
  - import Prisma, {Entity}Entity from @cookmate/domain/{entity-kebab}, and {Entity}SelectResult from ./types.
  - Define {entity}EntitySelect satisfies Prisma.{Entity}Select including all fields needed to build the domain entity (id plus props, createdAt/updatedAt). Include relation ids as needed.
  - type {Entity}EntityRecord = {Entity}SelectResult<typeof {entity}EntitySelect>.
  - export to{Entity}Entity(record) returning {Entity}Entity.create({ mapped props }, record.id). Map Prisma field names to domain props explicitly (e.g., userId -> ownerId).

- **get-{entity-kebab}.ts**: getters + findFirst
  - imports: Prisma, getPrisma, handleError, {Entity}NotFoundError from @cookmate/domain/{entity-kebab}, {Entity}SelectResult, {entity}EntitySelect, to{Entity}Entity.
  - get{Entity}SelectFn(where: Prisma.{Entity}WhereUniqueInput, select: TSelect) => findUnique; throw NotFoundError when null; wrap export with handleError.
  - export get{Entity}Entity(where) => await get{Entity}Select(where, {entity}EntitySelect) then to{Entity}Entity.
  - findFirst{Entity}Fn(where: Prisma.{Entity}WhereInput, select: TSelect) => findFirst; export wrapped with handleError.

- **list-{entity-plural}.ts**: list and pagination
  - imports: Prisma, getPrisma, handleError, paginationForComplexQuery/Pagination, {Entity}SelectResult, {entity}EntitySelect, to{Entity}Entity.
  - list{Entities}SelectFn(where, select, orderBy?, pagination?) => compute paginationQuery via paginationForComplexQuery(pagination, () => count{Entities}AboveId(pagination?.findId, where)); findMany with default orderBy id desc; wrap export with handleError.
  - export list{Entities}Entity(where, orderBy?, pagination?) => call list{Entities}Select with {entity}EntitySelect then map to{Entity}Entity.
  - helper count{Entities}AboveId(id, where?) => if no id return undefined; else prisma.{entity}.count({ where: { ...where, id: { gt: id } } }).

- **count-{entity-plural}.ts**: count helper
  - imports: Prisma, getPrisma.
  - count{Entities}Query = (where: Prisma.{Entity}WhereInput) => getPrisma().{entity}.count({ where: { ...where } });
  - export type count{Entities}QueryType = Awaited<ReturnType<typeof count{Entities}Query>>;
  - export count{Entities}(where) => await count{Entities}Query(where).

## Conventions and notes
- All async functions wrapped in handleError except the plain count helper (match existing pattern).
- Use Prisma types: {Entity}Select, {Entity}Include, {Entity}WhereUniqueInput, {Entity}WhereInput, {Entity}OrderByWithRelationInput.
- Keep 2-space indent, 100-char lines (Biome default). Use ESM imports.
- Entity select objects must use `satisfies Prisma.{Entity}Select` to keep strict typing.
- Respect pluralization used elsewhere in repos (recipe -> recipes, collection-member -> collection-members); use kebab-case for folder/files.
- Ensure mapper aligns domain props with Prisma fields; check domain entity getters/props to avoid missing fields or incorrect names.

## References
- For a concrete example, see references/collection-repository.md (existing Collection repository with entity mapping and pagination).
