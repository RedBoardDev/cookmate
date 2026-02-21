import { useCallback, useState } from "react";

export interface UseEditableListOptions<T> {
  createEmptyItem: () => T;
  minItems?: number;
}

export function useEditableList<T>(
  initialItems: readonly T[],
  { createEmptyItem, minItems = 1 }: UseEditableListOptions<T>,
) {
  const [items, setItems] = useState<readonly T[]>(() => {
    if (initialItems.length >= minItems) {
      return initialItems;
    }

    return Array.from({ length: minItems }, (_, index) => initialItems[index] ?? createEmptyItem());
  });

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, createEmptyItem()]);
  }, [createEmptyItem]);

  const removeItem = useCallback(
    (index: number) => {
      setItems((prev) => {
        if (prev.length <= minItems) return prev;
        return prev.filter((_, currentIndex) => currentIndex !== index);
      });
    },
    [minItems],
  );

  const updateItem = useCallback((index: number, updater: (item: T) => T) => {
    setItems((prev) => prev.map((item, currentIndex) => (currentIndex === index ? updater(item) : item)));
  }, []);

  return {
    items,
    canRemove: items.length > minItems,
    addItem,
    removeItem,
    updateItem,
  };
}
