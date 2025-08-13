export type SortDirection = "asc" | "desc";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: string, direction: SortDirection) => void;
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  emptyMessage?: string;
}
