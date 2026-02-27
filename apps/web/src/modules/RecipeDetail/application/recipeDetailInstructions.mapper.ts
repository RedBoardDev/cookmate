import type { GetRecipesRecipeid200 } from "@/generated/types";
import { RecipeDuration } from "@/modules/RecipeDetail/domain/vo/recipeDuration.vo";
import { RecipeInstruction } from "@/modules/RecipeDetail/domain/vo/recipeInstruction.vo";

type RecipeInstructionsData = GetRecipesRecipeid200["data"]["instructions"];

export const RecipeDetailInstructionsMapper = {
  toDomain(instructions: RecipeInstructionsData): RecipeInstruction[] {
    return instructions
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((instruction, index) => {
        const duration =
          instruction.durationMin !== null && instruction.durationMin !== undefined
            ? RecipeDuration.create(instruction.durationMin)
            : null;

        return RecipeInstruction.create({
          step: index + 1,
          description: instruction.text,
          duration,
          tip: null,
        });
      });
  },
};
