import type { RecipeEntity } from "@cookmate/domain/recipe";
import type { RecipeSnapshot } from "@cookmate/domain/recipe";

export interface RecipeAggregateProps {
  recipe: RecipeEntity;
  imageUrl: string | null;
  href: string;
}

export interface RecipeAggregateSnapshot {
  recipe: RecipeSnapshot;
  imageUrl: string | null;
  href: string;
}

export class RecipeAggregate {
  private readonly _recipe: RecipeEntity;
  private readonly _imageUrl: string | null;
  private readonly _href: string;

  private constructor(props: RecipeAggregateProps) {
    this._recipe = props.recipe;
    this._imageUrl = props.imageUrl;
    this._href = props.href;
  }

  static create(props: RecipeAggregateProps): RecipeAggregate {
    return new RecipeAggregate(props);
  }

  get id(): string {
    return this._recipe.id;
  }

  get recipe(): RecipeEntity {
    return this._recipe;
  }

  get imageUrl(): string | null {
    return this._imageUrl;
  }

  get href(): string {
    return this._href;
  }

  toSnapshot(): RecipeAggregateSnapshot {
    return {
      recipe: this._recipe.toSnapshot(),
      imageUrl: this._imageUrl,
      href: this._href
    };
  }
}
