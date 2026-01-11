import { useCallback, useEffect, useMemo, useState } from "react";

type UseSelectableIdsOptions<T extends string> = {
  allId: T;
  syncWithInitial?: boolean;
};

export function useSelectableIds<T extends string>(
  initialIds: T[],
  { allId, syncWithInitial = false }: UseSelectableIdsOptions<T>
) {
  const normalizedInitial = useMemo(
    () => (initialIds.length ? initialIds : [allId]),
    [allId, initialIds]
  );
  const [selectedIds, setSelectedIds] = useState<T[]>(normalizedInitial);

  useEffect(() => {
    if (!syncWithInitial) {
      return;
    }

    setSelectedIds(normalizedInitial);
  }, [normalizedInitial, syncWithInitial]);

  const isSelected = useCallback(
    (id: T) => selectedIds.includes(id),
    [selectedIds]
  );

  const toggle = useCallback(
    (id: T) => {
      setSelectedIds((prev) => {
        const exists = prev.includes(id);

        if (id === allId) {
          return [allId];
        }

        const withoutAll = prev.filter((item) => item !== allId);
        const next = exists
          ? withoutAll.filter((item) => item !== id)
          : [...withoutAll, id];

        return next.length ? next : [allId];
      });
    },
    [allId]
  );

  return {
    selectedIds,
    isSelected,
    toggle
  };
}
