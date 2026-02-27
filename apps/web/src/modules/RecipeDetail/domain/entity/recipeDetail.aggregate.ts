import { Entity, UniqueEntityID } from "@cookmate/core";
import type { RecipeCategory, RecipeSource } from "@cookmate/domain/recipe";
import type { RecipeDifficulty } from "@/modules/RecipeDetail/domain/vo/recipeDifficulty.vo";
import type { RecipeDuration } from "@/modules/RecipeDetail/domain/vo/recipeDuration.vo";
import type { RecipeImageItem, RecipeImages } from "@/modules/RecipeDetail/domain/vo/recipeImages.vo";
import type { RecipeIngredient } from "@/modules/RecipeDetail/domain/vo/recipeIngredient.vo";
import type { RecipeInstruction } from "@/modules/RecipeDetail/domain/vo/recipeInstruction.vo";
import type { RecipeServings } from "@/modules/RecipeDetail/domain/vo/recipeServings.vo";
import type { RecipeSourceVO } from "@/modules/RecipeDetail/domain/vo/recipeSource.vo";

export interface RecipeDetailAggregateProps {
  id: string;
  name: string;
  description: string | null;
  servings: RecipeServings;
  duration: RecipeDuration;
  difficulty: RecipeDifficulty;
  categories: readonly RecipeCategory[];
  source: RecipeSourceVO;
  sourceUrl: string | null;
  shortUrl: string;
  ingredients: readonly RecipeIngredient[];
  instructions: readonly RecipeInstruction[];
  images: RecipeImages;
  collectionIds: readonly string[];
}

export class RecipeDetailAggregate extends Entity<RecipeDetailAggregateProps> {
  private constructor(props: RecipeDetailAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeDetailAggregateProps): RecipeDetailAggregate {
    return new RecipeDetailAggregate(props, new UniqueEntityID(props.id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get categories(): readonly RecipeCategory[] {
    return this.props.categories;
  }

  get source(): RecipeSource {
    return this.props.source.value;
  }

  get sourceUrl(): string | null {
    return this.props.sourceUrl;
  }

  get shortUrl(): string {
    return this.props.shortUrl;
  }

  get duration(): RecipeDuration {
    return this.props.duration;
  }

  get servings(): number {
    return this.props.servings.value;
  }

  get difficulty(): RecipeDifficulty {
    return this.props.difficulty;
  }

  get ingredients(): readonly RecipeIngredient[] {
    return this.props.ingredients;
  }

  get instructions(): readonly RecipeInstruction[] {
    return this.props.instructions;
  }

  get images(): RecipeImages {
    return this.props.images;
  }

  get imageItems(): readonly RecipeImageItem[] {
    return this.props.images.items;
  }

  get collectionIds(): readonly string[] {
    return this.props.collectionIds;
  }
}
