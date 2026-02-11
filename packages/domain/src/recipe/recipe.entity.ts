import { Entity, UniqueEntityID } from "@cookmate/core";
import { InvalidRecipeDataError } from "./errors";
import { RecipePolicies } from "./recipe.policies";
import type {
  RecipeBudget,
  RecipeDifficulty,
  RecipeProps,
  RecipeSnapshot,
  RecipeSource,
  RecipeTag,
} from "./recipe.schema";
import { recipePropsSchema } from "./recipe.schema";

export class RecipeEntity extends Entity<RecipeProps> {
  private constructor(props: RecipeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeProps, id?: string): RecipeEntity {
    const result = recipePropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidRecipeDataError();
    }

    return new RecipeEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get servings(): number {
    return this.props.servings;
  }

  get prepTimeMin(): number | null {
    return this.props.prepTimeMin;
  }

  get cookTimeMin(): number | null {
    return this.props.cookTimeMin;
  }

  get restTimeMin(): number | null {
    return this.props.restTimeMin;
  }

  get totalTimeMin(): number {
    return this.props.totalTimeMin;
  }

  get difficulty(): RecipeDifficulty | null {
    return this.props.difficulty;
  }

  get budget(): RecipeBudget | null {
    return this.props.budget;
  }

  get tags(): RecipeTag[] {
    return this.props.tags;
  }

  get source(): RecipeSource {
    return this.props.source;
  }

  get sourceUrl(): string | null {
    return this.props.sourceUrl;
  }

  get shortUrl(): string | null {
    return this.props.shortUrl;
  }

  get userId(): string {
    return this.props.userId;
  }

  get forkedFromDiscoverId(): string | null {
    return this.props.forkedFromDiscoverId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Policies (delegate to RecipePolicies)
  isOwner(userId: string): boolean {
    return RecipePolicies.isOwner(this.userId, userId);
  }

  assertOwner(userId: string): void {
    RecipePolicies.assertOwner(this.userId, userId);
  }

  assertCanView(userId: string): void {
    RecipePolicies.assertCanView(this.userId, userId);
  }

  assertCanEdit(userId: string): void {
    RecipePolicies.assertCanEdit(this.userId, userId);
  }

  assertCanDelete(userId: string): void {
    RecipePolicies.assertCanDelete(this.userId, userId);
  }

  toSnapshot(): RecipeSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
