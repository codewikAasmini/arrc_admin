"use client";

interface PaginationProps {
  page: number;
  totalRecords: number;
  rowsPerPage: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalRecords,
  rowsPerPage,
  loading = false,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));

  const pageList = (() => {
    const last = totalPages;
    if (last <= 5) return Array.from({ length: last }, (_, i) => i + 1);

    const pages: (number | string)[] = [];
    pages.push(1);

    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 2);
    const end = Math.min(last - 1, page + 2);

    for (let i = start; i <= end; i++) pages.push(i);

    if (page < last - 2) pages.push("...");

    pages.push(last);
    return pages;
  })();

  const showingStart =
    totalRecords === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const showingEnd = Math.min(totalRecords, page * rowsPerPage);

  const canPrev = page > 1;
  const canNext = page < totalPages;

  if (totalRecords === 0) return null;

  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between mt-6">
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{showingStart}</span> to{" "}
        <span className="font-medium">{showingEnd}</span> of{" "}
        <span className="font-medium">{totalRecords}</span> results
      </p>

      <nav className="inline-flex -space-x-px rounded-md shadow-sm">
        <button
          onClick={() => canPrev && onPageChange(page - 1)}
          disabled={!canPrev || loading}
          className="px-2 py-2 border rounded-l-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          ‹
        </button>

        {pageList.map((p) =>
          p === "..." ? (
            <span
              key={String(p)}
              className="px-4 py-2 border bg-white text-gray-500"
            >
              …
            </span>
          ) : (
            <button
              key={String(p)}
              onClick={() => onPageChange(p as number)}
              className={`px-4 py-2 border text-sm font-medium ${
                page === p
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => canNext && onPageChange(page + 1)}
          disabled={!canNext || loading}
          className="px-2 py-2 border rounded-r-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
        >
          ›
        </button>
      </nav>
    </div>
  );
}
