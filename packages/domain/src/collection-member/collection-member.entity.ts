import { Entity, UniqueEntityID } from "@cookmate/core";
import type { CollectionMemberProps, CollectionMemberSnapshot } from "./collection-member.schema";
import { collectionMemberPropsSchema } from "./collection-member.schema";
import { InvalidCollectionMemberDataError } from "./errors";

export class CollectionMemberEntity extends Entity<CollectionMemberProps> {
  private constructor(props: CollectionMemberProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: CollectionMemberProps, id?: string): CollectionMemberEntity {
    const result = collectionMemberPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidCollectionMemberDataError();
    }

    return new CollectionMemberEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get collectionId(): string {
    return this.props.collectionId;
  }

  get userId(): string {
    return this.props.userId;
  }

  get joinedAt(): Date {
    return this.props.joinedAt;
  }

  toSnapshot(): CollectionMemberSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
