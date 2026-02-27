import { ValueObject } from "@cookmate/core";
import type { RecipeSource as DomainRecipeSource } from "@cookmate/domain/recipe";
import { InvalidSourceError, SOURCES } from "@cookmate/domain/shared/value-objects";

interface RecipeSourceProps {
  value: DomainRecipeSource;
}

export class RecipeSourceVO extends ValueObject<RecipeSourceProps> {
  private constructor(props: RecipeSourceProps) {
    super(props);
  }

  public static create(value: string): RecipeSourceVO {
    if (!SOURCES.includes(value as DomainRecipeSource)) {
      throw new InvalidSourceError(value);
    }

    return new RecipeSourceVO({ value: value as DomainRecipeSource });
  }

  get value(): DomainRecipeSource {
    return this.props.value;
  }
}
