import { Entity, UniqueEntityID } from "@cookmate/core";
import type { EquipmentProps, EquipmentSnapshot } from "./equipment.schema";
import { equipmentPropsSchema } from "./equipment.schema";
import { InvalidEquipmentDataError } from "./errors";

export class EquipmentEntity extends Entity<EquipmentProps> {
  private constructor(props: EquipmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: EquipmentProps, id?: string): EquipmentEntity {
    const result = equipmentPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidEquipmentDataError();
    }

    return new EquipmentEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toSnapshot(): EquipmentSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
