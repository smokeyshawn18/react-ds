import { useMemo } from "react";
import type { Pagination } from "../interfaces/dataTableInterface";

export function usePagination(pagination?: Pagination) {
  const totalPages = useMemo(() => {
    if (!pagination) return 1;
    return Math.max(1, Math.ceil(pagination.total / pagination.pageSize));
  }, [pagination]);

  const currentPage = pagination?.page ?? 1;
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return { totalPages, currentPage, canGoPrev, canGoNext };
}
