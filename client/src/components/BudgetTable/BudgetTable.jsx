import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 100,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 100,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
];

function BudgetTable({dataset}) {
  let tableData = dataset? dataset : {columns, rows}
  
  return (
    <div className="budget-table">
      <Box sx={{height: 300, width: "100%"}}>
        <DataGrid
          rows={tableData.rows}
          columns={tableData.columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default BudgetTable;
