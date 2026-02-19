import { ValueObject } from "@cookmate/core";
import type { Instruction } from "@cookmate/domain/instruction";
import type { RecipeDuration } from "@/modules/RecipeDetail/domain/vo/recipeDuration.vo";

interface RecipeInstructionProps {
  step: number;
  description: Instruction["text"];
  duration?: RecipeDuration | null;
  tip?: string | null;
}

function isValidStep(value: number) {
  return Number.isInteger(value) && value > 0;
}

function isValidDescription(value: string) {
  return value.trim().length > 0;
}

export class RecipeInstruction extends ValueObject<RecipeInstructionProps> {
  private constructor(props: RecipeInstructionProps) {
    super(props);
  }

  public static create(props: RecipeInstructionProps): RecipeInstruction {
    if (!isValidStep(props.step) || !isValidDescription(props.description)) {
      throw new Error("RecipeInstruction requires a valid step and description.");
    }
    return new RecipeInstruction({
      ...props,
      description: props.description.trim(),
    });
  }

  public static fromValue(props?: RecipeInstructionProps | null): RecipeInstruction | null {
    if (!props) return null;
    if (!isValidStep(props.step) || !isValidDescription(props.description)) {
      return null;
    }

    return new RecipeInstruction({
      ...props,
      description: props.description.trim(),
    });
  }

  get step(): number {
    return this.props.step;
  }

  get description(): string {
    return this.props.description;
  }

  get duration(): RecipeDuration | null | undefined {
    return this.props.duration;
  }

  get tip(): string | null | undefined {
    return this.props.tip;
  }
}
