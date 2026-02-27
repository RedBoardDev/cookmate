import { ValueObject } from "@cookmate/core";
import { collectionValueSchemas } from "@cookmate/domain/collection";

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
