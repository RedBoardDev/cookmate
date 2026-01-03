import { z } from "zod";

const EQUIPMENT_NAME_MAX_LENGTH = 100;

export const equipmentField = {
  name: z.string().min(1).max(EQUIPMENT_NAME_MAX_LENGTH),
};

export const equipmentSystemField = {
  createdAt: z.date(),
};

export const equipmentFields = {
  name: { name: equipmentField.name },
  createdAt: { createdAt: equipmentSystemField.createdAt },
};

export const equipmentPropsSchema = z.object({
  ...equipmentField,
  ...equipmentSystemField,
});

export type EquipmentProps = z.infer<typeof equipmentPropsSchema>;

export const equipmentSnapshotSchema = equipmentPropsSchema.extend({
  id: z.uuid(),
});

export type EquipmentSnapshot = z.infer<typeof equipmentSnapshotSchema>;
