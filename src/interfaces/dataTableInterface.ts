import type { ReactNode } from "react";
import type { ThemeConfig, FeatureConfig } from "./themeInterface";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: string, direction: "asc" | "desc") => void;
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  loading?: boolean;
  emptyMessage?: string;

  // White-label configuration
  clientId?: string;
  theme?: ThemeConfig;
  features?: FeatureConfig;
  onRowAction?: (action: string, row: T) => void;
  onExport?: () => void;
}
