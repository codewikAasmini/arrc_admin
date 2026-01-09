"use client";
import * as React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export default function DataTable({
  isLoading,
  rowData,
  columns,
}: any) {

  return (
    <>
      <Paper elevation={3}>
        <DataGrid className="border-0" rows={rowData} columns={columns} autosizeOptions={{ includeOutliers: true, includeHeaders: false,}} loading={isLoading}/>
      </Paper>
    </>
  );
}
