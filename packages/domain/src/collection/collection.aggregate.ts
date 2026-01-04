import { CollectionEntity } from "./entities/collection.entity";
import { CollectionMemberEntity } from "./entities/collection-member.entity";
import type { CollectionProps, CollectionSnapshot } from "./schemas/collection.schema";
import type { CollectionMemberSnapshot } from "./schemas/collection-member.schema";

export interface CollectionAggregateProps {
  collection: CollectionEntity;
  members: CollectionMemberEntity[];
}

export interface CollectionAggregateSnapshot {
  collection: CollectionSnapshot;
  members: CollectionMemberSnapshot[];
}

export class CollectionAggregate {
  private readonly _collection: CollectionEntity;
  private readonly _members: CollectionMemberEntity[];

  private constructor(props: CollectionAggregateProps) {
    this._collection = props.collection;
    this._members = [...props.members];
  }

  static create(props: CollectionAggregateProps): CollectionAggregate {
    return new CollectionAggregate(props);
  }

  static createNew(collectionProps: CollectionProps, collectionId?: string): CollectionAggregate {
    const collection = CollectionEntity.create(collectionProps, collectionId);
    return new CollectionAggregate({ collection, members: [] });
  }

  get id(): string {
    return this._collection.id;
  }

  get collection(): CollectionEntity {
    return this._collection;
  }

  get members(): readonly CollectionMemberEntity[] {
    return this._members;
  }

  isOwner(userId: string): boolean {
    return this._collection.isOwner(userId);
  }

  assertOwner(userId: string): void {
    this._collection.assertOwner(userId);
  }

  assertCanRemoveMember(memberId: string): void {
    this._collection.assertCanRemoveMember(memberId);
  }

  assertCanView(userId: string, isMember: boolean): void {
    this._collection.assertCanView(userId, isMember);
  }

  addMember(member: CollectionMemberEntity): void {
    this._members.push(member);
  }

  removeMember(memberId: string): void {
    const index = this._members.findIndex((member) => member.id === memberId);
    if (index !== -1) {
      this._members.splice(index, 1);
    }
  }

  toSnapshot(): CollectionAggregateSnapshot {
    return {
      collection: this._collection.toSnapshot(),
      members: this._members.map((member) => member.toSnapshot()),
    };
  }
}
