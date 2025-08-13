import { useMemo } from "react";
import type { DataTableProps } from "../../interfaces/dataTableInterface";
import { useSort } from "../../hooks/useSort";
import { usePagination } from "../../hooks/usePagination";
import { ChevronDown, ChevronUp } from "lucide-react";
import { sortData } from "../../utils/sortData";

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onSort,
  pagination,
  onPageChange,
  loading = false,
  emptyMessage = "No records found",
}: DataTableProps<T>) {
  const { sortKey, sortDirection, handleSort } = useSort();
  const { totalPages, currentPage, canGoPrev, canGoNext } =
    usePagination(pagination);

  const sortedData = useMemo(
    () => sortData(data, sortKey, sortDirection),
    [data, sortKey, sortDirection]
  );

  const headerOnSort = (key: string, sortable?: boolean) =>
    handleSort(key, sortable, onSort);

  return (
    <div className="w-full overflow-x-auto">
      <p className="mb-4">
        <strong>Data Table</strong> - Click on column headers to sort.
      </p>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {/* Serial Number Header */}
            <th className="px-4 py-2 border border-gray-300 text-left">#</th>
            {columns.map(({ key, label, sortable }) => (
              <th
                key={String(key)}
                onClick={() => headerOnSort(String(key), sortable)}
                className={`cursor-pointer select-none px-4 py-2 border border-gray-300 text-left ${
                  sortable ? "hover:bg-gray-200" : ""
                }`}
                aria-sort={
                  sortKey === key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                <div className="flex items-center space-x-1">
                  <span>{label}</span>

                  {sortable && sortKey === key && (
                    <span aria-hidden="true">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
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
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr>
              <td
                className="px-4 py-6 text-center text-gray-500"
                colSpan={columns.length + 1} // +1 for serial column
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData
              .slice(
                pagination ? (pagination.page - 1) * pagination.pageSize : 0,
                pagination
                  ? pagination.page * pagination.pageSize
                  : sortedData.length
              )
              .map((row, idx) => {
                const serialNumber = pagination
                  ? (pagination.page - 1) * pagination.pageSize + idx + 1
                  : idx + 1;

                return (
                  <tr
                    key={idx}
                    className="even:bg-gray-50 hover:bg-gray-100 cursor-default"
                  >
                    <td className="px-4 py-2 border border-gray-300">
                      {serialNumber}
                    </td>
                    {columns.map(({ key, render }) => (
                      <td
                        key={String(key)}
                        className="px-4 py-2 border border-gray-300 break-words max-w-xs"
                      >
                        {render ? render(row) : String(row[key])}
                      </td>
                    ))}
                  </tr>
                );
              })
          )}
        </tbody>
      </table>

      {pagination && (
        <div className="flex justify-between items-center mt-2 px-2 py-1">
          <button
            className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={!canGoPrev}
            onClick={() =>
              canGoPrev && onPageChange && onPageChange(currentPage - 1)
            }
            aria-label="Previous Page"
          >
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
            disabled={!canGoNext}
            onClick={() =>
              canGoNext && onPageChange && onPageChange(currentPage + 1)
            }
            aria-label="Next Page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
