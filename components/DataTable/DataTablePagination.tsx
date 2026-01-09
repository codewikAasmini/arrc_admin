"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export default function DataTablePagination({
  isLoading,
  rowData,
  columns,
  handlePaginationModelChange,
  pageNo,
  pageLimit,
  totalRows,
}: any) {
  return (
    <>
      <Paper elevation={0} className="border-0">
        <DataGrid
         sx={{"& .MuiDataGrid-columnHeaders": { backgroundColor: "red", color: "#fd7e14", fontWeight: "bold",},}}
         className="border-0" rows={rowData} columns={columns}
         autosizeOptions={{includeOutliers: true,includeHeaders: false,}}
         loading={isLoading}
         paginationModel={{ page: pageNo ? pageNo - 1 : 0, pageSize: pageLimit ? pageLimit : 10,}}
         rowCount={totalRows}
         paginationMode="server"
         onPaginationModelChange={handlePaginationModelChange}
        />
      </Paper>
    </>
  );
}


// "use client";
// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { Paper } from "@mui/material";

// export default function DataTablePagination({
//   isLoading,
//   rowData,
//   columns,
//   handlePaginationModelChange,
//   pageNo,
//   pageLimit,
//   totalRows,
// }: any) {
//   return (
//     <>
//       <Paper elevation={3}>
//         <DataGrid
//           rows={rowData}
//           columns={columns}
//           sx={{
//             "& .MuiDataGrid-columnHeader": {
//               backgroundColor: "#e0e0e0",
//               color: "#424242",
//             },
//           }}
//           autosizeOptions={{
//             includeOutliers: true,
//             includeHeaders: false,
//           }}
//           loading={isLoading}
//           paginationModel={{
//             page: pageNo ? pageNo - 1 : 0,
//             pageSize: pageLimit ? pageLimit : 10,
//           }}
//           rowCount={totalRows}
//           paginationMode="server"
//           onPaginationModelChange={handlePaginationModelChange}
//         />
//       </Paper>
//     </>
//   );
// }