import { Entity, UniqueEntityID } from "@cookmate/core";
import type { Recipe, RecipeCategory } from "@cookmate/domain/recipe";
import { DIFFICULTIES } from "@cookmate/domain/shared/value-objects";
import { RecipeDifficulty, type RecipeDifficultyType } from "@/modules/RecipeDetail/domain/vo/recipeDifficulty.vo";
import type { RecipeImageItem, RecipeImages } from "@/modules/RecipeDetail/domain/vo/recipeImages.vo";
import type { RecipeIngredient } from "@/modules/RecipeDetail/domain/vo/recipeIngredient.vo";
import type { RecipeInstruction } from "@/modules/RecipeDetail/domain/vo/recipeInstruction.vo";

export const recipeTones = ["sunrise", "herb", "spice", "oat", "berry"];
export type RecipeTones = (typeof recipeTones)[number];

export interface RecipeDetailAggregateProps {
  recipe: Recipe;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  images: RecipeImages;
  heroTone: RecipeTones;
  collectionIds: string[];
}

export class RecipeDetailAggregate extends Entity<RecipeDetailAggregateProps> {
  private constructor(props: RecipeDetailAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeDetailAggregateProps): RecipeDetailAggregate {
    return new RecipeDetailAggregate(props, new UniqueEntityID(props.recipe.id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.recipe.name;
  }

  get title(): string {
    return this.props.recipe.name;
  }

  get description(): string {
    return this.props.recipe.description ?? "";
  }

  get categories(): readonly RecipeCategory[] {
    return this.props.recipe.categories;
  }

  get tags(): readonly RecipeCategory[] {
    return this.props.recipe.categories;
  }

  get source(): Recipe["source"] {
    return this.props.recipe.source;
  }

  get sourceUrl(): string | null {
    return this.props.recipe.sourceUrl;
  }

  get shortUrl(): string | null {
    return this.props.recipe.shortUrl;
  }

  get totalTimeMin(): number {
    return this.props.recipe.totalTimeMin;
  }

  get servings(): number {
    return this.props.recipe.servings;
  }

  get difficulty(): RecipeDifficultyType {
    return RecipeDifficulty.fromValue(this.props.recipe.difficulty)?.value ?? DIFFICULTIES[0];
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

  get heroTone(): RecipeTones {
    return this.props.heroTone;
  }

  get collectionIds(): readonly string[] {
    return this.props.collectionIds;
  }

  get hasImages(): boolean {
    return this.props.images.hasImages;
  }

  get primaryImage(): RecipeImageItem | null {
    return this.props.images.primaryImage;
  }

  get ingredientCount(): number {
    return this.props.ingredients.length;
  }

  get stepCount(): number {
    return this.props.instructions.length;
  }

  get hasShortUrl(): boolean {
    return this.props.recipe.shortUrl !== null && this.props.recipe.shortUrl.trim().length > 0;
  }

  get durationHours(): number {
    return Math.floor(this.props.recipe.totalTimeMin / 60);
  }

  get durationRemainingMinutes(): number {
    return this.props.recipe.totalTimeMin % 60;
  }

  get isDurationShort(): boolean {
    return this.props.recipe.totalTimeMin < 60;
  }

  belongsToCollection(collectionId: string): boolean {
    return this.props.collectionIds.includes(collectionId);
  }
}
