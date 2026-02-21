import { Entity, UniqueEntityID } from "@cookmate/core";
import type { Recipe, RecipeCategory } from "@cookmate/domain/recipe";

interface RecipeEntityProps {
  recipe: Recipe;
  imageUrl: string | null;
  href: string;
}

const RECENT_THRESHOLD_DAYS = 7;

export class RecipeEntity extends Entity<RecipeEntityProps> {
  private constructor(props: RecipeEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeEntityProps): RecipeEntity {
    return new RecipeEntity(props, new UniqueEntityID(props.recipe.id));
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

  get description(): string | null {
    return this.props.recipe.description;
  }

  get servings(): number {
    return this.props.recipe.servings;
  }

  get prepTimeMin(): number | null {
    return this.props.recipe.prepTimeMin;
  }

  get cookTimeMin(): number | null {
    return this.props.recipe.cookTimeMin;
  }

  get totalTimeMin(): number {
    return this.props.recipe.totalTimeMin;
  }

  get difficulty(): Recipe["difficulty"] {
    return this.props.recipe.difficulty;
  }

  get budget(): Recipe["budget"] {
    return this.props.recipe.budget;
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

  get userId(): string {
    return this.props.recipe.userId;
  }

  get createdAt(): Date {
    return this.props.recipe.createdAt;
  }

  get updatedAt(): Date {
    return this.props.recipe.updatedAt;
  }

  get imageUrl(): string | null {
    return this.props.imageUrl;
  }

  get href(): string {
    return this.props.href;
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

  get isRecent(): boolean {
    const now = Date.now();
    const created = this.props.recipe.createdAt.getTime();
    const diffDays = (now - created) / (1000 * 60 * 60 * 24);
    return diffDays <= RECENT_THRESHOLD_DAYS;
  }

  get hasImage(): boolean {
    return this.props.imageUrl !== null;
  }

  hasCategory(category: RecipeCategory): boolean {
    return this.props.recipe.categories.includes(category);
  }

  hasTag(tag: RecipeCategory): boolean {
    return this.props.recipe.categories.includes(tag);
  }

  get formattedDuration(): string {
    if (this.isDurationShort) {
      return `${this.props.recipe.totalTimeMin} min`;
    }

    const hours = this.durationHours;
    const minutes = this.durationRemainingMinutes;

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}m`;
  }
}
