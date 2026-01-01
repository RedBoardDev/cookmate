import { Entity, UniqueEntityID } from "@cookmate/core";
import type { CollectionProps, CollectionSnapshot } from "./collection.schema";
import { collectionPropsSchema } from "./collection.schema";
import {
  CannotRemoveOwnerError,
  InvalidCollectionDataError,
  NotCollectionMemberError,
  NotCollectionOwnerError,
} from "./errors";

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

  get visibility(): CollectionProps["visibility"] {
    return this.props.visibility;
  }

  get description(): CollectionProps["description"] {
    return this.props.description;
  }

  get emoji(): string {
    return this.props.emoji;
  }

  get shortUrl(): CollectionProps["shortUrl"] {
    return this.props.shortUrl;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isOwner(userId: string): boolean {
    return this.ownerId === userId;
  }

  assertOwner(userId: string): void {
    if (!this.isOwner(userId)) {
      throw new NotCollectionOwnerError();
    }
  }

  assertCanRemoveMember(memberId: string): void {
    if (memberId === this.ownerId) {
      throw new CannotRemoveOwnerError();
    }
  }

  assertCanViewMembers(userId: string, isMember: boolean): void {
    if (!this.isOwner(userId) && !isMember) {
      throw new NotCollectionMemberError();
    }
  }

  toSnapshot(): CollectionSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
