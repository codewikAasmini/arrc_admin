"use client";

import { useEffect, useState } from "react";
import {
  API_GET_ALL_CATEGORY,
  API_UPDATE_CATEGORY,
  API_DELETE_CATEGORY,
  API_CREATE_CATEGORY,
} from "@/utils/api/APIConstant";
import { getApi, apiPatch, apiPost } from "@/utils/endpoints/common";
import Pagination from "@/libs/pagination";
import { Pencil, Trash } from "lucide-react";
interface Category {
  _id: string;
  name?: string;
  slug?: string;
  isActive?: boolean;
  createdAt?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // 🔥 EDIT STATE
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  // 🔥 CREATE STATE
  const [showCreate, setShowCreate] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

  // ================= FETCH =================
const fetchCategories = async () => {
  try {
    setLoading(true);

    const res = await getApi({
      url: API_GET_ALL_CATEGORY,
      page,
      rowsPerPage,
      searchText: searchText, 
    });

    setCategories(res.categories || []);
    setTotalRecords(res.pagination?.totalRecords || 0);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    fetchCategories();
  }, 400);

  return () => clearTimeout(timer);
}, [page, searchText]);


  const createCategory = async () => {
    if (!newCategory.name || !newCategory.slug) {
      alert("Name and slug are required");
      return;
    }

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

  // ================= UPDATE =================
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

  // ================= DELETE =================
  const deleteCategory = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    await apiPost({
      url: API_DELETE_CATEGORY,
      values: { id },
    });

    fetchCategories();
  };

  // ================= UI =================
  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Categories
          </h1>
              <div className="flex gap-3">
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

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading categories...
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Slug</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Created</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.slug}</td>
                    <td className="px-6 py-4">
                      {item.isActive ? (
                        <span className="text-green-600">Active</span>
                      ) : (
                        <span className="text-red-600">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => setEditItem(item)}
                        className="text-blue-600 hover:underline"
                      >
                     <Pencil size={18} />

                      </button>
                      <button
                        onClick={() => deleteCategory(item._id)}
                        className="text-red-600 hover:underline"
                      >
                         <Trash size={18} />

                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ================= CREATE MODAL ================= */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-lg font-semibold mb-4">
                Create Category
              </h2>

              <input
                className="w-full border px-3 py-2 mb-3"
                placeholder="Name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />

              <input
                className="w-full border px-3 py-2 mb-3"
                placeholder="Slug"
                value={newCategory.slug}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
              />

              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={newCategory.isActive}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      isActive: e.target.checked,
                    })
                  }
                />
                Active
              </label>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 border"
                >
                  Cancel
                </button>
                <button
                  disabled={createLoading}
                  onClick={createCategory}
                  className="px-4 py-2 bg-black text-white"
                >
                  {createLoading ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= EDIT MODAL (UNCHANGED) ================= */}
        {editItem && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Edit Category</h2>

              <input
                className="w-full border px-3 py-2 mb-3"
                value={editItem.name || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
              />

              <input
                className="w-full border px-3 py-2 mb-3"
                value={editItem.slug || ""}
                onChange={(e) =>
                  setEditItem({ ...editItem, slug: e.target.value })
                }
              />

              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={!!editItem.isActive}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      isActive: e.target.checked,
                    })
                  }
                />
                Active
              </label>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditItem(null)}
                  className="px-4 py-2 border"
                >
                  Cancel
                </button>
                <button
                  disabled={editLoading}
                  onClick={updateCategory}
                  className="px-4 py-2 bg-black text-white"
                >
                  {editLoading ? "Saving..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
