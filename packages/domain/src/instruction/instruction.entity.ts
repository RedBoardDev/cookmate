import { Entity, UniqueEntityID } from "@cookmate/core";
import type { InstructionProps, InstructionSnapshot } from "./instruction.schema";
import { instructionPropsSchema } from "./instruction.schema";
import { InvalidInstructionDataError } from "./errors";

export class InstructionEntity extends Entity<InstructionProps> {
  private constructor(props: InstructionProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: InstructionProps, id?: string): InstructionEntity {
    const result = instructionPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidInstructionDataError();
    }

    return new InstructionEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get text(): string {
    return this.props.text;
  }

  get durationMin(): number | null {
    return this.props.durationMin;
  }

  get order(): number {
    return this.props.order;
  }

  get recipeId(): string | null {
    return this.props.recipeId;
  }

  get discoverRecipeId(): string | null {
    return this.props.discoverRecipeId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toSnapshot(): InstructionSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
