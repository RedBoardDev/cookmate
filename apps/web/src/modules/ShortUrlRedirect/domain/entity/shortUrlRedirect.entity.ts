import { Entity, UniqueEntityID } from "@cookmate/core";

interface ShortUrlRedirectEntityProps {
  shortUrl: string;
  recipeId: string;
}

export class ShortUrlRedirectEntity extends Entity<ShortUrlRedirectEntityProps> {
  private constructor(props: ShortUrlRedirectEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ShortUrlRedirectEntityProps): ShortUrlRedirectEntity {
    return new ShortUrlRedirectEntity(props, new UniqueEntityID(props.recipeId));
  }

  get id(): string {
    return this._id.toString();
  }

  get shortUrl(): string {
    return this.props.shortUrl;
  }

  get recipeId(): string {
    return this.props.recipeId;
  }

  get targetPath(): string {
    return `/recipes/${this.props.recipeId}`;
  }
}
