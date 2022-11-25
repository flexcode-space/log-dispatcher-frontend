import { TableCell as MuiTableCell } from "@mui/material";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

export const TableCell = styled(MuiTableCell)({});

const borderColor = "1px solid rgba(233, 233, 236, 1)";

export const DataGrid = styled(MuiDataGrid)({
  ".MuiDataGrid-cell": {
    borderRight: borderColor,

    ":first-child": {
      borderLeft: borderColor,
    },
  },

  ".MuiDataGrid-row:last-child": {
    ".MuiDataGrid-cell": {
      borderBottom: borderColor,
    },
  },
});
