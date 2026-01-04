---
name: domain-builder
description: Generate a full domain module in packages/domain/src for an entity defined in apps/api/prisma/schema.prisma. Use when asked to create or generate the domain for a Prisma model (e.g., "Cree le domaine pour Recipe", "Genere le domain de l'entite User", "Fais le domaine Ingredient").
---

# Domain Builder

## Inputs
- Identify the Prisma model name (PascalCase) in apps/api/prisma/schema.prisma.
- Derive naming variants:
  - Entity: PascalCase (e.g., CollectionMember)
  - entity: lowerCamel (collectionMember)
  - entity-kebab: kebab-case (collection-member)
- Decide if the domain is standalone (single entity like User) or grouped (entity + sub-entity like Collection + CollectionMember).

## Workflow
1. Open apps/api/prisma/schema.prisma and locate the model. If missing, ask.
2. Split fields into user-editable vs system-managed. Treat id/createdAt/updatedAt and most
   foreign keys as system-managed unless requirements say otherwise. Exclude relation fields
   (object or array) from props.
3. Choose module layout:
   - Standalone module (User-style): packages/domain/src/{entity-kebab}/ with
     `{entity}.schema.ts`, `{entity}.entity.ts`, `{entity}.policies.ts` (optional), `errors.ts`, `index.ts`.
   - Grouped module (Collection-style): packages/domain/src/{entity-kebab}/ with
     `schemas/`, `entities/`, shared `errors.ts`, optional `{entity}.policies.ts` and `{entity}.aggregate.ts`.
4. Update packages/domain/src/{entity-kebab}/index.ts to export entities, schemas, policies, and errors.
5. Update packages/domain/src/index.ts to export the new module.

## Schema files
- Import z from "zod".
- Define constants for max lengths or limits when present.
- Define {entity}Field (user-editable) and {entity}SystemField (system-managed).
- Define {entity}Fields with each field wrapped as `{ fieldName: schema }` for route schemas.
- Define {entity}PropsSchema as z.object({ ...{entity}Field, ...{entity}SystemField }).
- Export {Entity}Props and {Entity}Snapshot types.
- Define {entity}SnapshotSchema = {entity}PropsSchema.extend({ id: z.uuid() }).
- For sub-entities, create separate schema files under schemas/ (see collection-member).

## Entity files
- Import Entity, UniqueEntityID from @cookmate/core.
- Import {Entity}Props/{Entity}Snapshot and {entity}PropsSchema.
- Import Invalid{Entity}DataError from ./errors (or ../errors in grouped modules).
- Implement:
  - private constructor(props, id?)
  - static create(props, id?) => validate with {entity}PropsSchema.safeParse; throw
    Invalid{Entity}DataError on failure; return new {Entity}Entity(result.data, new UniqueEntityID(id))
  - getters for id and every prop
  - toSnapshot() returning { id: this.id, ...this.props }
- Add policy helpers only when required (see CollectionEntity and UserEntity).

## Policies (optional)
- Create `{entity}.policies.ts` when there are domain rules.
- Expose pure functions that return booleans or throw domain errors.
- Keep constants (limits) in the policies file and reference them in error messages.

## Errors (errors.ts)
- Import DomainError from "../errors" (or "../../errors" when nested).
- Define at minimum:
  - {Entity}NotFoundError (code: "{ENTITY}_NOT_FOUND", httpStatus 404)
  - Invalid{Entity}DataError (code: "INVALID_{ENTITY}_DATA", httpStatus 400)
- Add other errors only when requirements call for them.
- Ensure message strings are human-readable and codes are SCREAMING_SNAKE.

## Mapping Prisma -> Zod
- String @db.Uuid or id fields => z.uuid()
- Fields named email => z.email()
- String => z.string().min(1).max(CONSTANT); optional/nullable => .optional().nullable()
- Int => z.number().int()
- Float/Decimal => z.number()
- Boolean => z.boolean()
- DateTime => z.date()
- Json => z.unknown()
- Enum => z.enum([...])

## Local patterns
- Keep 2-space indent, 100-char line width, TypeScript ESM.
- Prefer grouping sub-entities under the same domain module when they are tightly coupled.

## References
- packages/domain/src/collection/** (grouped module with schemas/, entities/, policies, aggregate, shared errors)
- packages/domain/src/user/** (standalone module with policies and errors)
