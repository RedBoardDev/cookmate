import { collectionValueSchemas } from "@cookmate/domain/collection";
import { ValueObject } from "@cookmate/domain-driven-design";

interface EmojiProps {
  value: string;
}

export class EmojiVO extends ValueObject<EmojiProps> {
  private constructor(props: EmojiProps) {
    super(props);
  }

  static from(value: string): EmojiVO {
    const parsed = collectionValueSchemas.emoji.safeParse(value);
    if (!parsed.success) {
      throw new Error("Invalid emoji");
    }
    return new EmojiVO({ value: parsed.data });
  }

  get value(): string {
    return this.props.value;
  }
}
