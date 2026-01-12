"use client";

interface PaginationProps {
  page: number;
  totalRecords: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (size: number) => void;
}

export default function Pagination({
  page,
  totalRecords,
  rowsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));

  if (!totalRecords || totalPages <= 1) return null;

  return (
    <div className="flex justify-end py-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="
            px-3 py-1.5 rounded-md border text-sm
            bg-white text-gray-700 border-gray-300
            hover:bg-gray-100
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
          "
        >
          Prev
        </button>
        <button
          type="button"
          disabled
          className="
            px-3 py-1.5 rounded-md text-sm font-medium
            bg-[#2f2f2f] text-white
            border border-[#1f1f1f]
            cursor-default
          "
        >
          {page}
        </button>
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="
            px-3 py-1.5 rounded-md border text-sm
            bg-white text-gray-700 border-gray-300
            hover:bg-gray-100
            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}
