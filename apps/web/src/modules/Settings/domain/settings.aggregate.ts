import { UserEntity } from "@cookmate/domain/user";
import type { UserSnapshot } from "@cookmate/domain/user";

export interface SettingsAggregateProps {
  user: UserEntity;
  emailVerified: boolean;
}

export interface SettingsAggregateSnapshot {
  user: UserSnapshot;
  emailVerified: boolean;
}

export class SettingsAggregate {
  private readonly _user: UserEntity;
  private readonly _emailVerified: boolean;

  private constructor(props: SettingsAggregateProps) {
    this._user = props.user;
    this._emailVerified = props.emailVerified;
  }

  static create(props: SettingsAggregateProps): SettingsAggregate {
    return new SettingsAggregate(props);
  }

  get id(): string {
    return this._user.id;
  }

  get user(): UserEntity {
    return this._user;
  }

  get profile() {
    return {
      name: this._user.name,
      avatar: this._user.avatar,
    };
  }

  get account() {
    return {
      email: this._user.email,
      createdAt: this._user.createdAt.toISOString(),
      emailVerified: this._emailVerified,
    };
  }
}
