import { Entity, UniqueEntityID } from "@cookmate/core";
import { type User, UserPolicies } from "@cookmate/domain/user";
import { userAvatarService } from "@/shared/modules/user-session/domain/services/userAvatar.service";

interface SettingsAggregateProps {
  user: User;
  emailVerified: boolean;
}

const AVATAR_COUNT = 9;

export interface AvatarOption {
  id: number;
  path: string;
}

export class SettingsAggregate extends Entity<SettingsAggregateProps> {
  private constructor(props: SettingsAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: SettingsAggregateProps): SettingsAggregate {
    return new SettingsAggregate(props, new UniqueEntityID(props.user.id));
  }

  get id(): string {
    return this._id.toString();
  }

  get user(): User {
    return this.props.user;
  }

  get profile() {
    return {
      name: this.props.user.name,
      avatar: this.props.user.avatar,
    };
  }

  get account() {
    return {
      email: this.props.user.email,
      createdAt: this.props.user.createdAt.toISOString(),
      emailVerified: this.props.emailVerified,
    };
  }

  get isEmailVerified(): boolean {
    return UserPolicies.isEmailVerified(this.props.emailVerified);
  }

  get hasAvatar(): boolean {
    return this.props.user.avatar !== null && this.props.user.avatar.trim().length > 0;
  }

  get displayName(): string {
    const name = this.props.user.name?.trim();
    if (name) return name;

    const email = this.props.user.email;
    const atIndex = email.indexOf("@");
    return atIndex > 0 ? email.slice(0, atIndex) : email;
  }

  get avatarFallback(): string {
    return userAvatarService.resolveFallback(this.props.user.name);
  }

  static get avatarOptions(): AvatarOption[] {
    return Array.from({ length: AVATAR_COUNT }, (_, i) => ({
      id: i + 1,
      path: `/avatars/avatar_${i + 1}.png`,
    }));
  }
}
