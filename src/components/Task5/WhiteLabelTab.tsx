import { useMemo, useState } from "react";
import type { DataTableProps } from "../../interfaces/dataTableInterface";
import { useSort } from "../../hooks/useSort";
import { usePagination } from "../../hooks/usePagination";
import { ChevronDown, ChevronUp } from "lucide-react";
import { sortData } from "../../utils/sortData";
import {
  type ThemeConfig,
  type FeatureConfig,
  clientThemes,
  clientFeatures,
  defaultTheme,
  defaultFeatures,
} from "../../interfaces/themeInterface";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import { SearchInput } from "./SearchInput";
import { ExportButton } from "./ExportButton";
// import { RowActions } from "./RowActions";

export default function WhiteLabelDataTable<T extends Record<string, any>>({
  data,
  columns,
  onSort,
  pagination,
  onPageChange,
  loading = false,
  emptyMessage = "No records found",
  clientId,
  theme: customTheme,
  features: customFeatures,
  //   onRowAction,
  onExport,
}: DataTableProps<T>) {
  // Determine theme and features based on clientId or custom props
  const theme: ThemeConfig = useMemo(() => {
    if (customTheme) return customTheme;
    if (clientId && clientThemes[clientId]) return clientThemes[clientId];
    return defaultTheme;
  }, [clientId, customTheme]);

  const features: FeatureConfig = useMemo(() => {
    if (customFeatures) return customFeatures;
    if (clientId && clientFeatures[clientId]) return clientFeatures[clientId];
    return defaultFeatures;
  }, [clientId, customFeatures]);

  // Generate styles based on the theme
  const styles = useThemeStyles(theme);

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Sort functionality - conditionally used based on features
  const { sortKey, sortDirection, handleSort } = useSort();

  // Pagination - conditionally used based on features
  const { totalPages, currentPage, canGoPrev, canGoNext } = usePagination(
    features.showPagination ? pagination : undefined
  );

  // Apply sorting and filtering to data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search filtering if enabled
    if (features.showSearch && searchTerm) {
      result = result.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting if enabled
    if (features.allowSorting && sortKey) {
      result = sortData(result, sortKey, sortDirection);
    }

    return result;
  }, [
    data,
    features.showSearch,
    searchTerm,
    features.allowSorting,
    sortKey,
    sortDirection,
  ]);

  // Handle sorting - only if feature is enabled
  const headerOnSort = (key: string, sortable?: boolean) => {
    if (features.allowSorting && sortable) {
      handleSort(key, sortable, onSort);
    }
  };

  // Handle export
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export functionality
      const headers = columns.map((col) => String(col.label));
      const csvData = processedData.map((row) =>
        columns.map((col) => String(row[col.key]))
      );

      const csvContent = [
        headers.join(","),
        ...csvData.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "export.csv");
      link.click();
    }
  };

  return (
    <div
      className="w-full overflow-x-auto mt-4 p-4"
      style={{ fontFamily: theme.fontFamily }}
    >
      <div className="flex justify-between items-center mb-4">
        <p>
          <strong>Data Table - Task-5 with While-Label Configuration </strong>
          {features.allowSorting && " - Click on column headers to sort."}
        </p>

        {features.exportData && (
          <ExportButton onExport={handleExport} theme={theme} />
        )}
      </div>

      {features.showSearch && (
        <SearchInput onSearch={setSearchTerm} theme={theme} />
      )}

      <table
        className="min-w-full border-collapse border border-gray-300"
        style={{
          borderRadius: styles.table.borderRadius,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            {/* Serial Number Header */}
            <th
              className="px-4 py-2 border border-gray-300 text-left"
              style={{
                backgroundColor: styles.header.backgroundColor,
                color: styles.header.color,
                padding: styles.header.padding,
              }}
            >
              #
            </th>

            {columns.map(({ key, label, sortable }) => (
              <th
                key={String(key)}
                onClick={() => headerOnSort(String(key), sortable)}
                className={`select-none px-4 py-2 border border-gray-300 text-left ${
                  features.allowSorting && sortable
                    ? "cursor-pointer hover:bg-gray-200"
                    : ""
                }`}
                aria-sort={
                  sortKey === key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
                style={{
                  backgroundColor: styles.header.backgroundColor,
                  color: styles.header.color,
                  padding: styles.header.padding,
                }}
              >
                <div className="flex items-center space-x-1">
                  <span>{label}</span>

                  {features.allowSorting && sortable && sortKey === key && (
                    <span aria-hidden="true">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}

            {/* Row actions column if needed */}
            {/* {features.rowActions.length > 0 && (
              <th
                className="px-4 py-2 border border-gray-300 text-left"
                style={{
                  backgroundColor: styles.header.backgroundColor,
                  color: styles.header.color,
                  padding: styles.header.padding,
                }}
              >
                Actions
              </th>
            )} */}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: pagination?.pageSize ?? 5 }).map((_, idx) => (
              <tr key={idx} className="animate-pulse bg-white">
                <td className="px-4 py-2 border border-gray-300"></td>
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-2 border border-gray-300"
                  >
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                ))}
                {features.rowActions.length > 0 && (
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </td>
                )}
              </tr>
            ))
          ) : processedData.length === 0 ? (
            <tr>
              <td
                className="px-4 py-6 text-center text-gray-500"
                colSpan={
                  columns.length + 1 + (features.rowActions.length > 0 ? 1 : 0)
                }
                style={{ padding: styles.header.padding }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            (features.showPagination
              ? processedData.slice(
                  (pagination?.page ?? 1 - 1) * (pagination?.pageSize ?? 10),
                  (pagination?.page ?? 1) * (pagination?.pageSize ?? 10)
                )
              : processedData
            ).map((row, idx) => {
              const serialNumber =
                features.showPagination && pagination
                  ? (pagination.page - 1) * pagination.pageSize + idx + 1
                  : idx + 1;

              return (
                <tr
                  key={idx}
                  className={`even:bg-gray-50 hover:bg-gray-100 cursor-default ${
                    idx % 2 === 1 ? "bg-gray-50" : ""
                  }`}
                  style={{
                    ...styles.row.evenRow,
                    ...styles.row.hoverRow,
                  }}
                >
                  <td
                    className="px-4 py-2 border border-gray-300"
                    style={{ padding: styles.header.padding }}
                  >
                    {serialNumber}
                  </td>

                  {columns.map(({ key, render }) => (
                    <td
                      key={String(key)}
                      className="px-4 py-2 border border-gray-300 break-words max-w-xs"
                      style={{ padding: styles.header.padding }}
                    >
                      {render ? render(row) : String(row[key])}
                    </td>
                  ))}
                  {/* 
                  {features.rowActions.length > 0 && (
                    <td
                      className="px-4 py-2 border border-gray-300"
                      style={{ padding: styles.header.padding }}
                    >
                      <RowActions
                        row={row}
                        actions={features.rowActions}
                        onAction={(action, rowData) => {
                          if (onRowAction) onRowAction(action, rowData);
                        }}
                        theme={theme}
                      />
                    </td>
                  )} */}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {features.showPagination && pagination && (
        <div className="flex justify-between items-center mt-4 px-2 py-1">
          <button
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
            disabled={!canGoPrev}
            onClick={() =>
              canGoPrev && onPageChange && onPageChange(currentPage - 1)
            }
            aria-label="Previous Page"
            style={{
              backgroundColor: canGoPrev
                ? styles.pagination.button.backgroundColor
                : styles.pagination.disabledButton.backgroundColor,
              color: styles.pagination.button.color,
              borderRadius: styles.pagination.button.borderRadius,
              padding: styles.pagination.button.padding,
              opacity: canGoPrev
                ? "1"
                : styles.pagination.disabledButton.opacity,
            }}
          >
            Previous
          </button>

          <span
            className="text-sm"
            style={{
              color: styles.pagination.text.color,
              fontFamily: styles.pagination.text.fontFamily,
            }}
          >
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50"
            disabled={!canGoNext}
            onClick={() =>
              canGoNext && onPageChange && onPageChange(currentPage + 1)
            }
            aria-label="Next Page"
            style={{
              backgroundColor: canGoNext
                ? styles.pagination.button.backgroundColor
                : styles.pagination.disabledButton.backgroundColor,
              color: styles.pagination.button.color,
              borderRadius: styles.pagination.button.borderRadius,
              padding: styles.pagination.button.padding,
              opacity: canGoNext
                ? "1"
                : styles.pagination.disabledButton.opacity,
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
