import { Entity, UniqueEntityID } from "@cookmate/core";
import { InvalidUnitDataError } from "./errors";
import type { UnitProps, UnitSnapshot } from "./unit.schema";
import { unitPropsSchema } from "./unit.schema";

export class UnitEntity extends Entity<UnitProps> {
  private constructor(props: UnitProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: UnitProps, id?: string): UnitEntity {
    const result = unitPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidUnitDataError();
    }

    return new UnitEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get abbreviation(): string {
    return this.props.abbreviation;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toSnapshot(): UnitSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
