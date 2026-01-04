import { RecipeEntity } from "./recipe.entity";
import type { RecipeProps, RecipeSnapshot } from "./recipe.schema";
import type { InstructionEntity } from "../instruction/instruction.entity";
import type { InstructionSnapshot } from "../instruction/instruction.schema";
import type { RecipeIngredientEntity } from "../recipe-ingredient/recipe-ingredient.entity";
import type { RecipeIngredientSnapshot } from "../recipe-ingredient/recipe-ingredient.schema";
import type { EquipmentEntity } from "../equipment/equipment.entity";
import type { EquipmentSnapshot } from "../equipment/equipment.schema";
import type { RecipeImageEntity } from "../recipe-image/recipe-image.entity";
import type { RecipeImageSnapshot } from "../recipe-image/recipe-image.schema";

export interface RecipeAggregateProps {
  recipe: RecipeEntity;
  ingredients: RecipeIngredientEntity[];
  instructions: InstructionEntity[];
  equipments: EquipmentEntity[];
  images: RecipeImageEntity[];
}

export interface RecipeAggregateSnapshot {
  recipe: RecipeSnapshot;
  ingredients: RecipeIngredientSnapshot[];
  instructions: InstructionSnapshot[];
  equipments: EquipmentSnapshot[];
  images: RecipeImageSnapshot[];
}

export class RecipeAggregate {
  private readonly _recipe: RecipeEntity;
  private readonly _ingredients: RecipeIngredientEntity[];
  private readonly _instructions: InstructionEntity[];
  private readonly _equipments: EquipmentEntity[];
  private readonly _images: RecipeImageEntity[];

  private constructor(props: RecipeAggregateProps) {
    this._recipe = props.recipe;
    this._ingredients = [...props.ingredients];
    this._instructions = [...props.instructions];
    this._equipments = [...props.equipments];
    this._images = [...props.images];
  }

  static create(props: RecipeAggregateProps): RecipeAggregate {
    return new RecipeAggregate(props);
  }

  static createNew(
    recipeProps: RecipeProps,
    recipeId?: string
  ): RecipeAggregate {
    const recipe = RecipeEntity.create(recipeProps, recipeId);
    return new RecipeAggregate({
      recipe,
      ingredients: [],
      instructions: [],
      equipments: [],
      images: [],
    });
  }

  // Getters
  get id(): string {
    return this._recipe.id;
  }

  get recipe(): RecipeEntity {
    return this._recipe;
  }

  get ingredients(): readonly RecipeIngredientEntity[] {
    return this._ingredients;
  }

  get instructions(): readonly InstructionEntity[] {
    return this._instructions;
  }

  get equipments(): readonly EquipmentEntity[] {
    return this._equipments;
  }

  get images(): readonly RecipeImageEntity[] {
    return this._images;
  }

  // Delegate to recipe
  get userId(): string {
    return this._recipe.userId;
  }

  get title(): string {
    return this._recipe.title;
  }

  // Policies (delegate to recipe entity)
  isOwner(userId: string): boolean {
    return this._recipe.isOwner(userId);
  }

  assertOwner(userId: string): void {
    this._recipe.assertOwner(userId);
  }

  assertCanView(userId: string): void {
    this._recipe.assertCanView(userId);
  }

  assertCanEdit(userId: string): void {
    this._recipe.assertCanEdit(userId);
  }

  assertCanDelete(userId: string): void {
    this._recipe.assertCanDelete(userId);
  }

  // Mutations for ingredients
  addIngredient(ingredient: RecipeIngredientEntity): void {
    this._ingredients.push(ingredient);
  }

  removeIngredient(ingredientId: string): void {
    const index = this._ingredients.findIndex((i) => i.id === ingredientId);
    if (index !== -1) {
      this._ingredients.splice(index, 1);
    }
  }

  // Mutations for instructions
  addInstruction(instruction: InstructionEntity): void {
    this._instructions.push(instruction);
  }

  removeInstruction(instructionId: string): void {
    const index = this._instructions.findIndex((i) => i.id === instructionId);
    if (index !== -1) {
      this._instructions.splice(index, 1);
    }
  }

  // Mutations for equipments
  addEquipment(equipment: EquipmentEntity): void {
    this._equipments.push(equipment);
  }

  removeEquipment(equipmentId: string): void {
    const index = this._equipments.findIndex((e) => e.id === equipmentId);
    if (index !== -1) {
      this._equipments.splice(index, 1);
    }
  }

  // Mutations for images
  addImage(image: RecipeImageEntity): void {
    this._images.push(image);
  }

  removeImage(imageId: string): void {
    const index = this._images.findIndex((i) => i.id === imageId);
    if (index !== -1) {
      this._images.splice(index, 1);
    }
  }

  // Snapshot for persistence
  toSnapshot(): RecipeAggregateSnapshot {
    return {
      recipe: this._recipe.toSnapshot(),
      ingredients: this._ingredients.map((i) => i.toSnapshot()),
      instructions: this._instructions.map((i) => i.toSnapshot()),
      equipments: this._equipments.map((e) => e.toSnapshot()),
      images: this._images.map((i) => i.toSnapshot()),
    };
  }
}
