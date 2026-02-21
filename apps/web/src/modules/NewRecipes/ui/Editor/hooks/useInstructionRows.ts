import { useCallback, useMemo } from "react";
import { useEditableList } from "@/modules/NewRecipes/ui/Editor/hooks/useEditableList";

export interface InstructionRow {
  readonly text: string;
  readonly hasDuration: boolean;
  readonly durationMin: number | null;
}

const createInstructionRow = (): InstructionRow => ({
  text: "",
  hasDuration: false,
  durationMin: null,
});

export function useInstructionRows(initialCount: number) {
  const initialRows = useMemo(
    () => Array.from({ length: Math.max(1, initialCount) }, createInstructionRow),
    [initialCount],
  );

  const { items, canRemove, addItem, removeItem, updateItem } = useEditableList<InstructionRow>(initialRows, {
    createEmptyItem: createInstructionRow,
    minItems: 1,
  });

  const updateText = useCallback(
    (index: number, text: string) => {
      updateItem(index, (row) => ({ ...row, text }));
    },
    [updateItem],
  );

  const toggleDuration = useCallback(
    (index: number) => {
      updateItem(index, (row) => ({
        ...row,
        hasDuration: !row.hasDuration,
        // Automatically reset duration to null if duration is toggled off
        durationMin: row.hasDuration ? null : row.durationMin,
      }));
    },
    [updateItem],
  );

  const setDurationFromInput = useCallback(
    (index: number, value: string) => {
      updateItem(index, (row) => {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
          return { ...row, durationMin: null };
        }

        const parsedValue = Number.parseInt(trimmedValue, 10);

        // Fail fast: return unmodified row if input is invalid
        if (Number.isNaN(parsedValue) || parsedValue < 0) {
          return row;
        }

        return { ...row, durationMin: parsedValue };
      });
    },
    [updateItem],
  );

  return {
    rows: items,
    canRemove,
    addRow: addItem,
    removeRow: removeItem,
    updateText,
    toggleDuration,
    setDurationFromInput,
  };
}
