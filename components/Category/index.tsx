"use client";
import { useEffect, useState } from "react";
import {
  API_GET_ALL_CATEGORY,
  API_UPDATE_CATEGORY,
  API_DELETE_CATEGORY,
  API_CREATE_CATEGORY,
} from "@/utils/api/APIConstant";
import { getApi, apiPost } from "@/utils/endpoints/common";
import { Pencil, Trash } from "lucide-react";

import CommonTable, { Column } from "@/components/Common/CommonTable";

/* ================= TYPES ================= */
interface Category {
  _id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
}

/* ================= PAGE ================= */
export default function CategoriesPage() {
  const [rows, setRows] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  /* ===== CREATE ===== */
  const [showCreate, setShowCreate] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

  /* ===== EDIT ===== */
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  /* ================= FETCH ================= */
const fetchCategories = async () => {
  try {
    setLoading(true);

    const res = await getApi({
      url: API_GET_ALL_CATEGORY,
      page,
      rowsPerPage,    
      searchText,  
    });

    setRows(res?.categories ?? []);
    setTotalRecords(res?.pagination?.totalRecords ?? 0);
  } finally {
    setLoading(false);
  }
};



useEffect(() => {
  const timer = setTimeout(() => {
    fetchCategories();
  }, 400);

  return () => clearTimeout(timer);
}, [searchText]);

useEffect(() => {
  fetchCategories();
}, [page, rowsPerPage]);

  /* ================= CREATE ================= */
  const createCategory = async () => {
    if (!newCategory.name || !newCategory.slug) return;

    try {
      setCreateLoading(true);
      await apiPost({
        url: API_CREATE_CATEGORY,
        values: newCategory,
      });
      setShowCreate(false);
      setNewCategory({ name: "", slug: "", isActive: true });
      fetchCategories();
    } finally {
      setCreateLoading(false);
    }
  };

  /* ================= UPDATE ================= */
  const updateCategory = async () => {
    if (!editItem) return;

    try {
      setEditLoading(true);
      await apiPost({
        url: API_UPDATE_CATEGORY,
        values: {
          id: editItem._id,
          name: editItem.name,
          slug: editItem.slug,
          isActive: editItem.isActive,
        },
      });
      setEditItem(null);
      fetchCategories();
    } finally {
      setEditLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;

    await apiPost({
      url: API_DELETE_CATEGORY,
      values: { id },
    });
    fetchCategories();
  };

  /* ================= TABLE COLUMNS ================= */
  const columns: Column<Category>[] = [
    {
      key: "name",
      label: "Name",
      width: 200,
    },
    {
      key: "slug",
      label: "Slug",
      width: 200,
    },
    {
      key: "isActive",
      label: "Status",
      width: 140,
      render: (row) => (
        <span
          className={`font-medium ${
            row.isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      width: 180,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "action",
      label: "Action",
      width: 140,
      render: (row) => (
        <div className="flex gap-3">
          <button
            onClick={() => setEditItem(row)}
            className="text-blue-600 hover:opacity-80"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => deleteCategory(row._id)}
            className="text-red-600 hover:opacity-80"
          >
            <Trash size={18} />
          </button>
        </div>
      ),
    },
  ];

  /* ================= UI ================= */
  return (
    <>
      <div className="mx-auto w-full max-w-full px-4 sm:p-6 lg:p-8">
        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="MuiTypography-root MuiTypography-h5 css-stnzmu-MuiTypography-root">Categories</h1>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search category..."
              value={searchText}
              onChange={(e) => {
                setPage(1);
                setSearchText(e.target.value);
              }}
              className="px-3 py-2 border rounded-md text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />

            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              + Add Category
            </button>
          </div>
        </div>

        {/* ================= COMMON TABLE ================= */}
        <CommonTable
          columns={columns}
          rows={rows}
          isLoading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRecords={totalRecords}
          onPageChange={setPage}
          onRowsPerPageChange={(size) => {
            setRowsPerPage(size);
            setPage(1);
          }}
        />
      </div>

      {/* ================= CREATE MODAL ================= */}
      {showCreate && (
        <Modal
          title="Create Category"
          loading={createLoading}
          onClose={() => setShowCreate(false)}
          onSubmit={createCategory}
        >
          <Input
            placeholder="Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <Input
            placeholder="Slug"
            value={newCategory.slug}
            onChange={(e) =>
              setNewCategory({ ...newCategory, slug: e.target.value })
            }
          />
        </Modal>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editItem && (
        <Modal
          title="Edit Category"
          loading={editLoading}
          onClose={() => setEditItem(null)}
          onSubmit={updateCategory}
        >
          <Input
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <Input
            value={editItem.slug}
            onChange={(e) => setEditItem({ ...editItem, slug: e.target.value })}
          />
        </Modal>
      )}
    </>
  );
}

/* ================= HELPERS ================= */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="w-full border px-3 py-2 mb-3 rounded-md" />
  );
}

function Modal({
  title,
  children,
  onClose,
  onSubmit,
  loading,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        {children}

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={onSubmit}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
