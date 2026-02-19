import { Entity, UniqueEntityID } from "@cookmate/core";
import type { User } from "@cookmate/domain/user";

interface CurrentUserAggregateProps {
  user: User;
  emailVerified: boolean;
}

export class CurrentUserAggregate extends Entity<CurrentUserAggregateProps> {
  private constructor(props: CurrentUserAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: CurrentUserAggregateProps): CurrentUserAggregate {
    return new CurrentUserAggregate(props, new UniqueEntityID(props.user.id));
  }

  get id(): string {
    return this._id.toString();
  }

  get email(): string {
    return this.props.user.email;
  }

  get name(): string {
    return this.props.user.name;
  }

  get avatarUrl(): string {
    return this.props.user.avatar;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  get createdAt(): Date {
    return this.props.user.createdAt;
  }

  get updatedAt(): Date {
    return this.props.user.updatedAt;
  }

  get displayName(): string {
    const trimmedName = this.props.user.name.trim();
    if (trimmedName.length > 0) {
      return trimmedName;
    }

    const atIndex = this.props.user.email.indexOf("@");
    return atIndex > 0 ? this.props.user.email.slice(0, atIndex) : this.props.user.email;
  }
}
