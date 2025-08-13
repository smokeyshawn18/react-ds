// src/components/DataTable/hooks/useSort.ts
import { useState, useCallback } from "react";

type SortDirection = "asc" | "desc";

export function useSort(
  initialKey: string | null = null,
  initialDir: SortDirection = "asc"
) {
  const [sortKey, setSortKey] = useState<string | null>(initialKey);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialDir);

  const handleSort = useCallback(
    (
      key: string,
      sortable?: boolean,
      onSort?: (k: string, d: SortDirection) => void
    ) => {
      if (!sortable) return;
      if (sortKey === key) {
        const nextDir: SortDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(nextDir);
        onSort && onSort(key, nextDir);
      } else {
        setSortKey(key);
        setSortDirection("asc");
        onSort && onSort(key, "asc");
      }
    },
    [sortKey, sortDirection]
  );

  return { sortKey, sortDirection, handleSort, setSortKey, setSortDirection };
}
