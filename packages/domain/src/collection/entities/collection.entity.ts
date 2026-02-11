import { Entity, UniqueEntityID } from "@cookmate/core";
import { CollectionPolicies } from "../collection.policies";
import { InvalidCollectionDataError } from "../errors";
import type { CollectionProps, CollectionSnapshot } from "../schemas/collection.schema";
import { collectionPropsSchema } from "../schemas/collection.schema";

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

  // Policies

  isOwner(userId: string): boolean {
    return CollectionPolicies.isOwner(this.ownerId, userId);
  }

  canView(userId: string, isMember: boolean): boolean {
    return CollectionPolicies.canView(this.ownerId, userId, isMember);
  }

  assertOwner(userId: string): void {
    CollectionPolicies.assertOwner(this.ownerId, userId);
  }

  assertCanView(userId: string, isMember: boolean): void {
    CollectionPolicies.assertCanView(this.ownerId, userId, isMember);
  }

  assertIsMember(userId: string, isMember: boolean): void {
    CollectionPolicies.assertIsMember(this.ownerId, userId, isMember);
  }

  assertCanRemoveMember(memberId: string): void {
    CollectionPolicies.assertCanRemoveMember(this.ownerId, memberId);
  }

  toSnapshot(): CollectionSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
