"use client";

import { useEffect, useState } from "react";
import {
  API_GET_ALL_CATEGORY_ITEMS,
  API_CREATE_CATEGORY_ITEM,
  API_UPDATE_CATEGORY_ITEM,
  API_DELETE_CATEGORY_ITEM,
  API_GET_ALL_CATEGORY,
} from "@/utils/api/APIConstant";
import { apiPost, apiPatch, getApi } from "@/utils/endpoints/common";
import { Pencil, Trash } from "lucide-react";

import CommonTable, { Column } from "@/components/Common/CommonTable";

/* ================= TYPES ================= */

interface Category {
  _id: string;
  name: string;
}

interface CategoryItem {
  _id: string;
  categoryId?: string | { _id: string; name?: string };
  name: string;
  description: string;
  rewardRate: number;
  stockSymbol: string;
  price: number;
  sortOrder: number;
  isActive: boolean;
  isFeatured: number;
  image_url: string;
  createdAt?: string;
}

const EMPTY_FORM = {
  categoryId: "",
  name: "",
  description: "",
  rewardRate: 0,
  stockSymbol: "",
  price: 0,
  sortOrder: 0,
  isActive: true,
  isFeatured: 0,
  image_url: "",
};

/* ================= PAGE ================= */

export default function CategoryItemPage() {
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [form, setForm] = useState<any>(EMPTY_FORM);

  /* ================= FETCH ITEMS ================= */

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await apiPost({
        url: API_GET_ALL_CATEGORY_ITEMS,
        values: { page, rowsPerPage, q: searchText },
      });

      const mappedItems = (res?.items || []).map((item: any) => ({
        ...item,
        categoryId: item.categoryId ?? item.category_id ?? "",
      }));

      setItems(mappedItems);
      setTotalRecords(res?.pagination?.totalRecords || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchItems, 400);
    return () => clearTimeout(t);
  }, [page, rowsPerPage, searchText]);

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    getApi({ url: API_GET_ALL_CATEGORY }).then((res) => {
      setCategories(res.categories || []);
    });
  }, []);

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!form.categoryId) {
      alert("Please select category");
      return;
    }

    const payload = {
      ...form,
      categoryId: form.categoryId,
    };

    if (editingItem) {
      await apiPatch({
        url: API_UPDATE_CATEGORY_ITEM,
        values: { id: editingItem._id, ...payload },
      });
    } else {
      await apiPost({
        url: API_CREATE_CATEGORY_ITEM,
        values: payload,
      });
    }

    setShowModal(false);
    setEditingItem(null);
    setForm(EMPTY_FORM);
    fetchItems();
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;

    await apiPost({
      url: API_DELETE_CATEGORY_ITEM,
      values: { id },
    });

    fetchItems();
  };

  /* ================= TABLE COLUMNS ================= */

  const columns: Column<CategoryItem>[] = [
    {
      key: "name",
      label: "Name",
      width: 220,
      cellClass: "font-medium",
    },

    {
      key: "stockSymbol",
      label: "Symbol",
      width: 120,
      nowrap: true,
      cellClass: "mono",
    },

    {
      key: "price",
      label: "Price",
      width: 120,
      align: "right",
      render: (row) => `$${row.price.toFixed(2)}`,
    },

    {
      key: "rewardRate",
      label: "Reward",
      width: 120,
      align: "right",
      render: (row) => row.rewardRate.toFixed(3),
    },

    {
      key: "isActive",
      label: "Status",
      width: 100,
      align: "center",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      key: "actions",
      label: "Action",
      width: 120,
      align: "right",
      render: (row) => (
        <div className="flex justify-end gap-3">
          <button
            className="text-blue-600 hover:opacity-80"
            onClick={() => {
              setEditingItem(row);
              setForm({
                ...row,
                categoryId:
                  typeof row.categoryId === "object"
                    ? row.categoryId._id
                    : row.categoryId ?? "",
              });
              setShowModal(true);
            }}
          >
            <Pencil size={18} />
          </button>

          <button
            className="text-red-600 hover:opacity-80"
            onClick={() => handleDelete(row._id)}
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
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">Category Items</h1>

          <div className="flex gap-3">
            <input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setPage(1);
                setSearchText(e.target.value);
              }}
              className="px-3 py-2 border rounded-md"
            />

            <button
              onClick={() => {
                setEditingItem(null);
                setForm(EMPTY_FORM);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              + Add Item
            </button>
          </div>
        </div>

        {/* COMMON TABLE */}
        <CommonTable
          columns={columns}
          rows={items}
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

      {/* ================= MODAL ================= */}

      {showModal && (
        <Modal
          title={editingItem ? "Edit Category Item" : "Create Category Item"}
          onClose={() => setShowModal(false)}
        >
          <FormRow label="Category">
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormRow>

          <Input
            label="Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Input
            label="Description"
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
          />
          <Input
            label="Stock Symbol"
            value={form.stockSymbol}
            onChange={(v) => setForm({ ...form, stockSymbol: v })}
          />
          <Input
            label="Reward Rate"
            type="number"
            value={String(form.rewardRate)}
            onChange={(v) => setForm({ ...form, rewardRate: +v })}
          />
          <Input
            label="Price"
            type="number"
            value={String(form.price)}
            onChange={(v) => setForm({ ...form, price: +v })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button
              onClick={handleSave}
              className="bg-black text-white px-5 py-2 rounded"
            >
              {editingItem ? "Update" : "Create"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

/* ================= HELPERS ================= */

function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow">
        <div className="flex justify-between px-6 py-4 border-b">
          <h2 className="font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="px-6 py-5 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function FormRow({ label, children }: any) {
  return (
    <div className="grid grid-cols-4 gap-4 items-center">
      <label className="text-sm text-gray-700">{label}</label>
      <div className="col-span-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <FormRow label={label}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
    </FormRow>
  );
}
