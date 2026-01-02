# Collection domain reference

Use this as a concrete, end-to-end example of a domain module generated from a
Prisma model. Source of truth lives in:

- Prisma model: apps/api/prisma/schema.prisma (model Collection)
- Domain module: packages/domain/src/collection/

## Prisma model summary

Key fields:
- id: String @db.Uuid
- name: String
- emoji: String
- description: String?
- visibility: CollectionVisibility
- shortUrl: String?
- createdAt: DateTime
- updatedAt: DateTime
- userId: String (owner)
- relations: recipes, members

## Domain mapping notes

- Folder: packages/domain/src/collection
- Entity: CollectionEntity
- Props: CollectionProps
- Snapshot: CollectionSnapshot
- Domain uses ownerId instead of Prisma userId to express ownership semantics.
- Relation fields (recipes, members, user) are not part of props.

## File excerpts

### collection.schema.ts (fields and schemas)
```ts
import { z } from "zod";

export const collectionVisibilitySchema = z.enum(["PRIVATE", "PUBLIC"]);
export type CollectionVisibility = z.infer<typeof collectionVisibilitySchema>;

export const collectionField = {
  name: z.string().min(1).max(100),
  emoji: z.string().min(1).max(32),
  description: z.string().min(1).max(500).optional().nullable(),
};

export const collectionSystemField = {
  ownerId: z.uuid(),
  visibility: collectionVisibilitySchema,
  shortUrl: z.string().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const collectionPropsSchema = z.object({
  ...collectionField,
  ...collectionSystemField,
});

export type CollectionProps = z.infer<typeof collectionPropsSchema>;

export const collectionSnapshotSchema = collectionPropsSchema.extend({
  id: z.uuid(),
});

export type CollectionSnapshot = z.infer<typeof collectionSnapshotSchema>;
```

### collection.entity.ts (factory, getters, snapshot)
```ts
import { Entity, UniqueEntityID } from "@cookmate/core";
import type { CollectionProps, CollectionSnapshot } from "./collection.schema";
import { collectionPropsSchema } from "./collection.schema";
import { InvalidCollectionDataError } from "./errors";

export class CollectionEntity extends Entity<CollectionProps> {
  private constructor(props: CollectionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: CollectionProps, id?: string): CollectionEntity {
    const result = collectionPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidCollectionDataError();
    }

    return new CollectionEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get ownerId(): string {
    return this.props.ownerId;
  }

  toSnapshot(): CollectionSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
```

### errors.ts (minimum errors + extras)
```ts
import { DomainError } from "../errors";

export class CollectionNotFoundError extends DomainError {
  readonly code = "COLLECTION_NOT_FOUND";
  readonly httpStatus = 404;
}

export class InvalidCollectionDataError extends DomainError {
  readonly code = "INVALID_COLLECTION_DATA";
  readonly httpStatus = 400;
}
```

### index.ts
```ts
export { CollectionEntity } from "./collection.entity";
export * from "./collection.schema";
export * from "./errors";
```
