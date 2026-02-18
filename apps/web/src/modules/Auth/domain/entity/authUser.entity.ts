import { Entity, UniqueEntityID } from "@cookmate/core";

interface AuthUserEntityProps {
  email: string;
  name: string;
  avatarUrl: string | null;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export class AuthUserEntity extends Entity<AuthUserEntityProps> {
  private constructor(props: AuthUserEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: AuthUserEntityProps, id: string): AuthUserEntity {
    return new AuthUserEntity(props, new UniqueEntityID(id));
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

  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  get createdAt(): string {
    return this.props.createdAt;
  }

  get updatedAt(): string {
    return this.props.updatedAt;
  }
}
