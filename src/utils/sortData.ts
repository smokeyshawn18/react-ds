import type { SortDirection } from "../interfaces/dataTableInterface";

export function sortData<T extends Record<string, any>>(
  data: T[],
  sortKey: string | null,
  sortDirection: SortDirection
) {
  if (!sortKey) return data;
  return [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue == null) return 1;
    if (bValue == null) return -1;
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });
}
