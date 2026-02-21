import { useCallback, useState } from "react";

export function useCategorySelection<T extends string>(initialValues: readonly T[] = []) {
  const [selectedValues, setSelectedValues] = useState<readonly T[]>(initialValues);

  const isSelected = (value: T) => selectedValues.includes(value);

  const toggleValue = useCallback((value: T) => {
    setSelectedValues((prev) => (prev.includes(value) ? prev.filter((entry) => entry !== value) : [...prev, value]));
  }, []);

  return {
    selectedValues,
    isSelected,
    toggleValue,
  } as const;
}
