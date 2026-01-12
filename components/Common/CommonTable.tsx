"use client";
import Pagination from "@/libs/pagination";
import React from "react";

export type Column<Row = any> = {
  key: string;
  label: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  nowrap?: boolean;
  headerClass?: string;
  cellClass?: string;
  render?: (row: Row, rowIndex: number) => React.ReactNode;
  sortable?: boolean;
  onSort?: () => void;
};

type CommonTableProps<Row = any> = {
  columns: Column<Row>[];
  rows: Row[];
  isLoading?: boolean;
  emptyText?: string;
  page?: number;
  totalRecords?: number;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (size: number) => void;
  stickyHeader?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  compact?: boolean;
  bordered?: boolean;
  shadow?: boolean;
  rounded?: boolean;
  className?: string;
};

export default function CommonTable<Row = any>({
  columns,
  rows,
  isLoading = false,
  emptyText = "No data found",
  page,
  totalRecords,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  stickyHeader = false,
  hoverable = true,
  striped = false,
  compact = false,
  bordered = true,
  shadow = true,
  rounded = true,
  className = "",
}: CommonTableProps<Row>) {
  const getAlignmentClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "left": return "text-start";
      case "center": return "text-center";
      case "right": return "text-end";
      default: return "text-start";
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Table Container */}
      <div className={`
        overflow-hidden
        bg-white
        ${shadow ? "shadow-xs" : ""}
        ${rounded ? "rounded-lg" : ""}
        ${bordered ? "border border-gray-200" : ""}
      `}>
        <div className="overflow-x-auto">
          <table className={`
            w-full
            ${compact ? "text-sm" : "text-base"}
            ${bordered ? "divide-y divide-gray-200" : ""}
          `}>
            
            {/* Table Header */}
            <thead className={`
              ${stickyHeader ? "sticky top-0 z-10" : ""}
              bg-black/80 text-white backdrop-blur-xs
              ${stickyHeader && shadow ? "shadow-xs" : ""}
            `}>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`
                      px-6 py-3
                      font-semibold
                      text-gray-900
                      tracking-wide
                      ${getAlignmentClass(col.align)}
                      ${col.nowrap ? "whitespace-nowrap" : "whitespace-normal"}
                      ${col.headerClass || ""}
                      ${bordered ? "border-b border-gray-200" : ""}
                      ${compact ? "px-4 py-2" : ""}
                      hover:bg-gray-100/50 transition-colors
                    `}
                    style={{ width: col.width }}
                  >
                    <div className={`
                      flex items-center gap-2
                      ${col.align === "right" ? "justify-end" : 
                        col.align === "center" ? "justify-center" : "justify-start"}
                    `}>
                      <span className="truncate text-white">{col.label}</span>
                      {col.sortable && (
                        <button
                          onClick={col.onSort}
                          className="
                            shrink-0
                            size-4
                            text-gray-400
                            hover:text-gray-600
                            active:text-gray-800
                            transition-colors
                            focus:outline-hidden
                            focus-visible:ring-2
                            focus-visible:ring-gray-300
                            focus-visible:ring-offset-1
                            rounded-xs
                          "
                          aria-label={`Sort by ${col.label}`}
                        >
                          <svg className="size-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200/50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="
                        size-8
                        border-2
                        border-gray-300
                        border-t-gray-900
                        rounded-full
                        animate-spin
                      "></div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-gray-900 font-medium">Loading data</span>
                        <span className="text-sm text-gray-500">Please wait...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3">
                      <svg
                        className="size-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-gray-900 font-medium text-lg">{emptyText}</span>
                        <span className="text-gray-500">Try adjusting your search or filter</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={(row as any)._id ?? i}
                    className={`
                      bg-white
                      ${hoverable ? "hover:bg-gray-50/80 transition-colors" : ""}
                      ${striped && i % 2 === 1 ? "bg-gray-50/50" : ""}
                      active:bg-gray-100/50
                    `}
                  >
                    {columns.map((col) => (
                      <td
                        key={`${col.key}-${i}`}
                        className={`
                          px-6 py-4
                          text-gray-700
                          ${getAlignmentClass(col.align)}
                          ${col.nowrap ? "whitespace-nowrap" : "whitespace-normal"}
                          ${compact ? "px-4 py-3" : ""}
                          ${col.cellClass || ""}
                          ${bordered ? "border-b border-gray-200/50 last:border-b-0" : ""}
                        `}
                      >
                        <div className={col.nowrap ? "truncate max-w-64" : ""}>
                          {col.render
                            ? col.render(row, i)
                            : (row as any)[col.key] !== undefined && (row as any)[col.key] !== null
                              ? (row as any)[col.key]
                              : (
                                <span className="text-gray-400 italic">—</span>
                              )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {page !== undefined && 
       totalRecords !== undefined && 
       rowsPerPage !== undefined && 
       onPageChange && 
       onRowsPerPageChange && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {Math.min((page - 1) * rowsPerPage + 1, totalRecords).toLocaleString()}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(page * rowsPerPage, totalRecords).toLocaleString()}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {totalRecords.toLocaleString()}
            </span>{" "}
            results
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label htmlFor="rows-per-page" className="text-sm text-gray-600 whitespace-nowrap">
                Rows per page:
              </label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange?.(Number(e.target.value))}
                className="
                  px-3 py-1.5
                  text-sm
                  border border-gray-300
                  rounded-md
                  bg-white
                  text-gray-900
                  focus:outline-hidden
                  focus-visible:ring-2
                  focus-visible:ring-gray-500
                  focus-visible:border-transparent
                  transition-shadow
                "
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            
            <Pagination
              page={page}
              totalRecords={totalRecords}
              rowsPerPage={rowsPerPage}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}