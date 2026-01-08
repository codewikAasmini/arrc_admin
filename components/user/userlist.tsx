"use client";

import { useEffect, useState } from "react";
import {
  API_GET_ALL_USERS,
  API_USER_STATUS_UPDATE,
} from "@/utils/api/APIConstant";
import { getApi, apiPatch } from "@/utils/endpoints/common";
import Pagination from "@/libs/pagination";
interface User {
  _id: string;
  email: string;
  status?: number; 
  search:string;
  createdAt?: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // 🔍 SEARCH
  const [searchText, setSearchText] = useState("");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      setLoading(true);

     const res = await getApi({
        url: API_GET_ALL_USERS,
        page,
        rowsPerPage,
        searchText: searchText, // ✅ IMPORTANT
      });

      if (res?.success) {
        setUsers(res.data.users);
        setTotalRecords(res.data.pagination.totalRecords);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= UPDATE STATUS =================
  const updateUserStatus = async (userId: string, status: number) => {
    if (updatingId) return;

    try {
      setUpdatingId(userId);
      await apiPatch({
        url: API_USER_STATUS_UPDATE(userId),
        values: { status },
      });
      fetchUsers();
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= DEBOUNCED FETCH =================
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(timer);
  }, [page, searchText]);

  return (
    <div className="flex-1 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Users
        </h1>

        {/* 🔍 SEARCH BOX */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search by email or name..."
            value={searchText}
            onChange={(e) => {
              setPage(1);
              setSearchText(e.target.value);
            }}
            className="w-64 px-4 py-2 border rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading users...
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Joined
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">{user.email}</td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        {user.status === 1 ? (
                          <span
                            onClick={() =>
                              updateUserStatus(user._id, 0)
                            }
                            className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full 
                              bg-green-100 text-green-700 hover:bg-green-200 transition
                              ${
                                updatingId === user._id
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }`}
                          >
                            Active
                          </span>
                        ) : (
                          <span
                            onClick={() =>
                              updateUserStatus(user._id, 1)
                            }
                            className={`cursor-pointer px-3 py-1 text-xs font-semibold rounded-full 
                              bg-red-100 text-red-700 hover:bg-red-200 transition
                              ${
                                updatingId === user._id
                                  ? "opacity-50 pointer-events-none"
                                  : ""
                              }`}
                          >
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
          <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          totalRecords={totalRecords}
          loading={loading}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  );
}
