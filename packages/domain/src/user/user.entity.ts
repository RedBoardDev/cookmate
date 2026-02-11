import { Entity, UniqueEntityID } from "@cookmate/core";
import { InvalidUserDataError } from "./errors";
import { UserPolicies } from "./user.policies";
import type { UserProps, UserSnapshot } from "./user.schema";
import { userPropsSchema } from "./user.schema";

export class UserEntity extends Entity<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: UserProps, id?: string): UserEntity {
    const result = userPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidUserDataError();
    }

    return new UserEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get avatar(): string {
    return this.props.avatar;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Policies

  canOwnMoreCollections(currentOwnedCount: number): boolean {
    return UserPolicies.canOwnMoreCollections(currentOwnedCount);
  }

  assertReachMaxCollections(currentOwnedCount: number): void {
    UserPolicies.assertReachMaxCollections(currentOwnedCount);
  }

  toSnapshot(): UserSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
