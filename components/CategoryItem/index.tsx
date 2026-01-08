"use client";

import { useEffect, useState } from "react";
import {
  API_GET_ALL_CATEGORY_ITEMS,
  API_CREATE_CATEGORY_ITEM,
  API_UPDATE_CATEGORY_ITEM,
  API_DELETE_CATEGORY_ITEM,
  API_GET_ALL_CATEGORY,
} from "@/utils/api/APIConstant";
import { apiPost, apiPatch, apiDelete, getApi } from "@/utils/endpoints/common";
import Pagination from "@/libs/pagination";
import { Pencil, Trash } from "lucide-react";

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

const emptyForm = {
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
  const rowsPerPage = 10;
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [form, setForm] = useState<any>(emptyForm);

  /* ================= FETCH ITEMS ================= */

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await apiPost({
        url: API_GET_ALL_CATEGORY_ITEMS,
        values: { page, rowsPerPage, q: searchText },
      });
      setItems(res?.items || []);
      setTotalRecords(res?.pagination?.totalRecords || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchItems, 400);
    return () => clearTimeout(t);
  }, [page, searchText]);

  /* ================= FETCH CATEGORIES ================= */

  const fetchCategories = async () => {
       const res = await getApi({
          url: API_GET_ALL_CATEGORY,
          page,
          rowsPerPage,
          searchText: searchText, 
        });
    
        setCategories(res.categories || []);
        setTotalRecords(res.pagination?.totalRecords || 0);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= SAVE ================= */

  const handleSave = async () => {
    if (!form.categoryId) {
      alert("Please select a category");
      return;
    }

    if (editingItem) {
      await apiPatch({
        url: API_UPDATE_CATEGORY_ITEM,
        values: { id: editingItem._id, ...form },
      });
    } else {
      await apiPost({
        url: API_CREATE_CATEGORY_ITEM,
        values: form,
      });
    }

    setShowModal(false);
    setEditingItem(null);
    setForm(emptyForm);
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

  return (
    <div className="flex-1 bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">

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
                setForm(emptyForm);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              + Add Item
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Reward</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id} className="border-b">
                  <td className="px-4 py-3">{i.name}</td>
                  <td className="px-4 py-3">{i.stockSymbol}</td>
                  <td className="px-4 py-3">{i.price}</td>
                  <td className="px-4 py-3">{i.rewardRate}</td>
                 <td
                    className={`px-4 py-3 font-medium ${
                        i.isActive ? "text-green-600" : "text-red-600"
                    }`}
                    >
                    {i.isActive ? "Active" : "Inactive"}
                    </td>
                  <td className="px-4 py-3 text-right space-x-3">
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        setEditingItem(i);
                        setForm({
                          ...i,
                          categoryId:
                            typeof i.categoryId === "object"
                              ? i.categoryId._id
                              : i.categoryId,
                        });
                        setShowModal(true);
                      }}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(i._id)}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalRecords={totalRecords}
          loading={loading}
          onPageChange={setPage}
        />
      </div>

      {/* MODAL */}
      {showModal && (
        <Modal
          title={editingItem ? "Edit Category Item" : "Create Category Item"}
          onClose={() => setShowModal(false)}
        >
          {/* CATEGORY DROPDOWN */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <label className="text-sm text-gray-700">Category</label>
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm({ ...form, categoryId: e.target.value })
              }
              className="col-span-3 border rounded px-3 py-2 text-sm"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <FormRow label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <FormRow label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <FormRow label="Stock Symbol" value={form.stockSymbol} onChange={(v) => setForm({ ...form, stockSymbol: v })} />
          <FormRow label="Reward Rate" type="number" value={String(form.rewardRate)} onChange={(v) => setForm({ ...form, rewardRate: +v })} />
          <FormRow label="Price" type="number" value={String(form.price)} onChange={(v) => setForm({ ...form, price: +v })} />
          <FormRow label="Sort Order" type="number" value={String(form.sortOrder)} onChange={(v) => setForm({ ...form, sortOrder: +v })} />
          <FormRow label="Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
         <div className="grid grid-cols-4 gap-4 items-center">
                <label className="text-sm text-gray-700">Featured</label>

                <input
                    type="checkbox"
                    checked={Boolean(form.isFeatured)}
                    onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                    }
                    className="h-4 w-4"
                />
                </div>

          <ModalActions
            onCancel={() => setShowModal(false)}
            onSave={handleSave}
            saveText={editingItem ? "Update" : "Create"}
          />
        </Modal>
      )}
    </div>
  );
}

/* ================= UI HELPERS ================= */

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

function FormRow({
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
    <div className="grid grid-cols-4 gap-4 items-center">
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="col-span-3 border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}

function ModalActions({ onCancel, onSave, saveText }: any) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t mt-6">
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSave} className="bg-black text-white px-5 py-2 rounded">
        {saveText}
      </button>
    </div>
  );
}





// "use client";

// import { useEffect, useState } from "react";
// import {
//   API_GET_ALL_CATEGORY_ITEMS,
//   API_CREATE_CATEGORY_ITEM,
//   API_UPDATE_CATEGORY_ITEM,
//   API_DELETE_CATEGORY_ITEM,
// } from "@/utils/api/APIConstant";
// import { apiPost, apiPatch, apiDelete } from "@/utils/endpoints/common";
// import Pagination from "@/libs/pagination";
// import { Pencil, Trash } from "lucide-react";

// interface CategoryItem {
//   _id: string;
//   name?: string;
//   slug?: string;
//   isActive?: boolean;
//   createdAt?: string;
// }

// export default function CategoryItemPage() {
//   const [items, setItems] = useState<CategoryItem[]>([]);
//   const [page, setPage] = useState(1);
//   const rowsPerPage = 10;

//   const [totalRecords, setTotalRecords] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState("");

//   // MODAL STATE
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);

//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     isActive: true,
//   });

//   // ================= FETCH =================
//   const fetchItems = async () => {
//     try {
//       setLoading(true);

//       const res = await apiPost({
//         url: API_GET_ALL_CATEGORY_ITEMS,
//         values: {
//           page,
//           rowsPerPage,
//           q: searchText,
//         },
//       });

//       setItems(res?.items || []);
//       setTotalRecords(res?.pagination?.totalRecords || 0);
//     } catch (error) {
//       console.error("Failed to fetch items", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= CREATE / UPDATE =================
//   const handleSubmit = async () => {
//     try {
//       if (editingItem) {
//         await apiPatch({
//           url: API_UPDATE_CATEGORY_ITEM,
//           values: {
//             id: editingItem._id,
//             ...form,
//           },
//         });
//       } else {
//         await apiPost({
//           url: API_CREATE_CATEGORY_ITEM,
//           values: form,
//         });
//       }

//       setShowModal(false);
//       setEditingItem(null);
//       setForm({ name: "", slug: "", isActive: true });
//       fetchItems();
//     } catch (error) {
//       console.error("Save failed", error);
//     }
//   };

//   // ================= DELETE =================
//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this item?")) return;

//     try {
//       await apiDelete({
//         url: API_DELETE_CATEGORY_ITEM,
//         params: id,
//       });
//       fetchItems();
//     } catch (error) {
//       console.error("Delete failed", error);
//     }
//   };

//   // ================= EFFECT =================
//   useEffect(() => {
//     const timer = setTimeout(fetchItems, 400);
//     return () => clearTimeout(timer);
//   }, [page, searchText]);

//   return (
//     <div className="flex-1 bg-slate-50 p-6">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-semibold text-gray-800">
//             Category Items
//           </h1>

//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Search items..."
//               value={searchText}
//               onChange={(e) => {
//                 setPage(1);
//                 setSearchText(e.target.value);
//               }}
//               className="px-4 py-2 border rounded-md text-sm"
//             />

//             <button
//               onClick={() => {
//                 setEditingItem(null);
//                 setForm({ name: "", slug: "", isActive: true });
//                 setShowModal(true);
//               }}
//               className="px-4 py-2 bg-black text-white rounded-md text-sm"
//             >
//               + Create Item
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           {loading ? (
//             <div className="p-10 text-center text-gray-500">
//               Loading items...
//             </div>
//           ) : (
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="px-6 py-4 text-left">Name</th>
//                   <th className="px-6 py-4 text-left">Slug</th>
//                   <th className="px-6 py-4 text-left">Status</th>
//                   <th className="px-6 py-4 text-left">Created</th>
//                   <th className="px-6 py-4 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {items.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
//                       No items found
//                     </td>
//                   </tr>
//                 ) : (
//                   items.map((item) => (
//                     <tr key={item._id} className="border-b hover:bg-gray-50">
//                       <td className="px-6 py-4">{item.name}</td>
//                       <td className="px-6 py-4">{item.slug}</td>
//                       <td className="px-6 py-4">
//                         {item.isActive ? "Active" : "Inactive"}
//                       </td>
//                       <td className="px-6 py-4">
//                         {item.createdAt
//                           ? new Date(item.createdAt).toLocaleDateString()
//                           : "-"}
//                       </td>
//                       <td className="px-6 py-4 text-right space-x-2">
//                         <button
//                           className="text-blue-600"
//                           onClick={() => {
//                             setEditingItem(item);
//                             setForm({
//                               name: item.name || "",
//                               slug: item.slug || "",
//                               isActive: item.isActive ?? true,
//                             });
//                             setShowModal(true);
//                           }}
//                         >
                     
//                              <Pencil size={18} />
//                         </button>
//                         <button
//                           className="text-red-600"
//                           onClick={() => handleDelete(item._id)}
//                         >
//                          <Trash size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* PAGINATION */}
//         <Pagination
//           page={page}
//           rowsPerPage={rowsPerPage}
//           totalRecords={totalRecords}
//           loading={loading}
//           onPageChange={setPage}
//         />
//       </div>

//       {/* MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-96 space-y-4">
//             <h2 className="text-lg font-semibold">
//               {editingItem ? "Edit Item" : "Create Item"}
//             </h2>

//             <input
//               placeholder="Name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded"
//             />

//             <input
//               placeholder="Slug"
//               value={form.slug}
//               onChange={(e) =>
//                 setForm({ ...form, slug: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded"
//             />

//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={form.isActive}
//                 onChange={(e) =>
//                   setForm({ ...form, isActive: e.target.checked })
//                 }
//               />
//               Active
//             </label>

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="px-4 py-2 bg-black text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
