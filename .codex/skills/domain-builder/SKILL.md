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

## Workflow
1. Open apps/api/prisma/schema.prisma and locate the model. If missing, ask.
2. Split fields into user-editable vs system-managed. Treat id/createdAt/updatedAt and most
   foreign keys as system-managed unless requirements say otherwise. Exclude relation fields
   (object or array) from props.
3. Create packages/domain/src/{entity-kebab}/ with:
   - {entity-kebab}.schema.ts
   - {entity-kebab}.entity.ts
   - errors.ts
   - index.ts
4. Update packages/domain/src/index.ts to export the new domain module.

## Schema file ({entity-kebab}.schema.ts)
- Import z from "zod".
- Define enum schemas and types for Prisma enums used by the model.
- Define {entity}Field for user-editable fields (omit if none).
- Define {entity}SystemField for system-managed fields.
- Define {entity}Fields with each field wrapped as { fieldName: schema } across both sets.
- Define {entity}PropsSchema as z.object({ ...{entity}Field, ...{entity}SystemField }).
- Export {Entity}Props and {Entity}Snapshot types.
- Define {entity}SnapshotSchema = {entity}PropsSchema.extend({ id: z.uuid() }).

## Entity file ({entity-kebab}.entity.ts)
- Import Entity, UniqueEntityID from @cookmate/core.
- Import {Entity}Props/{Entity}Snapshot and {entity}PropsSchema.
- Import Invalid{Entity}DataError from ./errors.
- Implement:
  - private constructor(props, id?)
  - static create(props, id?) => validate with {entity}PropsSchema.safeParse; throw
    Invalid{Entity}DataError on failure; return new {Entity}Entity(result.data, new UniqueEntityID(id))
  - getters for id and every prop
  - toSnapshot() returning { id: this.id, ...this.props }
- Add domain methods only if requested.

## Errors (errors.ts)
- Import DomainError from "../errors".
- Define at minimum:
  - {Entity}NotFoundError (code: "{ENTITY}_NOT_FOUND", httpStatus 404)
  - Invalid{Entity}DataError (code: "INVALID_{ENTITY}_DATA", httpStatus 400)
- Add other errors only when requirements call for them.
- Ensure message strings are human-readable and codes are SCREAMING_SNAKE.

## Mapping Prisma -> Zod
- String @db.Uuid or id fields => z.uuid()
- Fields named email => z.email()
- String => z.string().min(1); optional/nullable => .optional().nullable(); add sensible max
  length constants when present in the model or conventions (e.g., USER_NAME_MAX_LENGTH = 55).
- Int => z.number().int()
- Float/Decimal => z.number()
- Boolean => z.boolean()
- DateTime => z.date()
- Json => z.unknown()
- Enum => z.enum([...])

## Local patterns
- Follow existing modules in packages/domain/src/collection and packages/domain/src/collection-member.
- Keep 2-space indent, 100-char line width, TypeScript ESM.

## References
- For a concrete end-to-end example, read references/collection.md before implementing a new module.
