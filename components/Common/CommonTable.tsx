"use client";
import React from "react";

export type Column<Row = any> = {
  key: string;
  label: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  nowrap?: boolean;
  headerStyle?: React.CSSProperties;
  cellStyle?: React.CSSProperties;
  render?: (row: Row, rowIndex: number) => React.ReactNode; // custom cell
};

type CommonTableProps<Row = any> = {
  columns: Column<Row>[];
  rows: Row[];
  isLoading?: boolean;
  emptyText?: string;
  headerColor?: string; // default brand color
  rounded?: number; // border radius
  bordered?: boolean; // wrapper border
  wrapperStyle?: React.CSSProperties; // extra wrapper styles
  showTopBar?: boolean;
  rangeText?: string; // e.g. "Showing 1–10 of 42"
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onRowsPerPageChange?: (size: number) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export default function CommonTable<Row = any>({
  columns,
  rows,
  isLoading = false,
  emptyText = "No data found.",
  headerColor = "#0e0d0dff",
  rounded = 10,
  bordered = true,
  wrapperStyle,
  showTopBar = false,
  rangeText,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onRowsPerPageChange,
  page,
  totalPages,
  onPageChange,
}: CommonTableProps<Row>) {
  const hasPagination =
    typeof page === "number" &&
    typeof totalPages === "number" &&
    typeof onPageChange === "function";

    const thBase: React.CSSProperties = {
      backgroundColor: headerColor,
      color: "#fff",
      borderColor: headerColor,
      fontWeight: 600,
      verticalAlign: "middle",
      whiteSpace: "nowrap",
      padding: "12px 24px",   // ⭐ HEADER horizontal + vertical gap
    };

  const baseBtn: React.CSSProperties = {
    color: headerColor,
    borderColor: headerColor,
    backgroundColor: "transparent",
    minWidth: 40,
    padding: "6px 10px",
  };
  const activeBtn: React.CSSProperties = {
    backgroundColor: headerColor,
    color: "#fff",
    borderColor: headerColor,
    minWidth: 40,
    padding: "6px 10px",
  };
  const disabledBtn: React.CSSProperties = {
    color: "#adb5bd",
    borderColor: "#e9ecef",
    backgroundColor: "#f8f9fa",
    minWidth: 40,
    padding: "6px 10px",
    cursor: "not-allowed",
  };

  const goPrev = () => onPageChange && page! > 1 && onPageChange(page! - 1);
  const goNext = () =>
    onPageChange && page! < totalPages! && onPageChange(page! + 1);

  const pageNumbers = React.useMemo(() => {
    if (!hasPagination) return [] as number[];
    const windowSize = 5;
    const start = Math.max(1, page! - Math.floor(windowSize / 2));
    const end = Math.min(totalPages!, start + windowSize - 1);
    const adjustedStart = Math.max(1, end - windowSize + 1);
    return Array.from(
      { length: end - adjustedStart + 1 },
      (_, i) => adjustedStart + i
    );
  }, [hasPagination, page, totalPages]);

  return (
    <div>
      <div
        className="table-responsive"
        style={{
          borderRadius: rounded,
          border: bordered ? "1px solid #e9ecef" : undefined,
          background: "#fff",
          ...wrapperStyle,
        }}
      >
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.key}
                  style={{
                    ...thBase,
                    ...(idx === 0 ? { borderTopLeftRadius: rounded } : {}),
                    ...(idx === columns.length - 1
                      ? { borderTopRightRadius: rounded }
                      : {}),
                    ...(col.width ? { width: col.width } : {}),
                    ...(col.headerStyle || {}),
                    ...(col.align === "center"
                      ? { textAlign: "center" }
                      : col.align === "right"
                      ? { textAlign: "right" }
                      : {}),
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  <div
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                  />
                  <div className="mt-2">Loading…</div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-5">
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row, rIdx) => (
                <tr key={(row as any)._id ?? rIdx}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        ...(col.cellStyle || {}),
                        ...(col.align === "center"
                          ? { textAlign: "center" }
                          : col.align === "right"
                          ? { textAlign: "right" }
                          : {}),
                        ...(col.nowrap ? { whiteSpace: "nowrap" } : {}),
                      }}
                    >
                      {col.render
                        ? col.render(row, rIdx)
                        : (row as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hasPagination && (
        <nav aria-label="Table pagination" className="mt-2">
          <div className="d-flex justify-content-between align-items-center">
            {!!onRowsPerPageChange && (
              <div className="d-flex align-items-center" style={{ gap: 8 }}>
                <label className="mb-0 me-2 small">Rows per page</label>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 100 }}
                  value={rowsPerPage}
                  onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                >
                  {rowsPerPageOptions.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <ul className="pagination mb-0" style={{ gap: 6 }}>
              <li className={`page-item ${page! <= 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={goPrev}
                  style={{
                    ...(page! <= 1 ? disabledBtn : baseBtn),
                    borderRadius: 8,
                  }}
                >
                  Prev
                </button>
              </li>

              {pageNumbers.map((p) => {
                const isActive = p === page;
                return (
                  <li
                    key={p}
                    className={`page-item ${isActive ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => onPageChange && onPageChange(p)}
                      style={{
                        ...(isActive ? activeBtn : baseBtn),
                        borderRadius: 8,
                      }}
                    >
                      {p}
                    </button>
                  </li>
                );
              })}

              <li
                className={`page-item ${
                  page! >= totalPages! ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={goNext}
                  style={{
                    ...(page! >= totalPages! ? disabledBtn : baseBtn),
                    borderRadius: 8,
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}
