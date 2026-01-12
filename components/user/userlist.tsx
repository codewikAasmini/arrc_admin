"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";

import { apiPatch, getApi } from "@/utils/endpoints/common";
import {
  API_GET_ALL_USERS,
  API_USER_STATUS_UPDATE,
} from "@/utils/api/APIConstant";

import CommonTable, { Column } from "../Common/CommonTable";
import SearchData from "../DataTable/SearchData";
export default function UserList() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [searchText, setSearchText] = useState("");

  const { data, isPending, refetch } = useQuery({
    queryKey: ["users", page, rowsPerPage, searchText],
    queryFn: () =>
      getApi({
        url: API_GET_ALL_USERS,
        page,
        rowsPerPage,
        searchText,
      }),
  });

  const users =
    data?.data?.users?.map((u: any, i: number) => ({
      id: i + 1 + (page - 1) * rowsPerPage,
      ...u,
      dob:
        u.dobDay && u.dobMonth && u.dobYear
          ? `${u.dobDay}-${u.dobMonth}-${u.dobYear}`
          : "—",
      createdAt: new Date(u.createdAt).toLocaleString(),
    })) ?? [];

  const columns: Column<any>[] = [
    { key: "id", label: "ID", width: 60 },
    { key: "firstName", label: "First Name", width: 140 },
    { key: "lastName", label: "Last Name", width: 140 },
    { key: "email", label: "Email", width: 280, nowrap: true },
    { key: "phoneNo", label: "Phone", width: 140 },
    { key: "state", label: "State", width: 100 },
    { key: "city", label: "City", width: 120 },
    {
      key: "stripeCardholderId",
      label: "Stripe Cardholder ID",
      width: 320,
      nowrap: true,
      cellClass: "mono",
    },
    { key: "dob", label: "DOB", width: 120 },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (row) => (
        <Button
          size="small"
          variant="outlined"
          color={row.status ? "success" : "error"}
          onClick={async () => {
            await apiPatch({
              url: API_USER_STATUS_UPDATE(row._id),
              values: { status: row.status ? 0 : 1 },
            });
            refetch();
          }}
        >
          {row.status ? "ACTIVE" : "INACTIVE"}
        </Button>
      ),
    },
    { key: "createdAt", label: "Created At", width: 200 },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Users List
        </Typography>

        <SearchData
          handleSearch={(t: string) => {
            setSearchText(t);
            setPage(1);
          }}
        />
      </Box>

      <CommonTable
        columns={columns}
        rows={users}
        isLoading={isPending}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRecords={data?.data?.pagination?.totalRecords ?? 0}
        onPageChange={setPage}
        onRowsPerPageChange={(n) => {
          setRowsPerPage(n);
          setPage(1);
        }}
      />
    </Box>
  );
}
