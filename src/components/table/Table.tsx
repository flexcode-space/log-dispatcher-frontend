import {
  Table,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableContainer,
  TableBody,
} from "@mui/material";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { TableCellHeadProps } from "./Table.type";

const borderColor = "1px solid rgba(233, 233, 236, 1)";

export const DataGrid = styled(MuiDataGrid)({
  ".MuiDataGrid-cell": {
    borderRight: borderColor,

    ":first-child": {
      borderLeft: borderColor,
    },
  },

  ".MuiDataGrid-footerContainer": {
    borderTop: "none",
  },

  ".MuiDataGrid-row:last-child": {
    ".MuiDataGrid-cell": {
      borderBottom: borderColor,
    },
  },
});

export const TableHead: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MuiTableHead sx={{ height: "30px", background: "#F5F5F7" }}>
      {children}
    </MuiTableHead>
  );
};

export const TableCellHead = ({
  children,
  minWidth,
  size = "small",
  ...props
}: TableCellHeadProps) => {
  return (
    <MuiTableCell
      variant="head"
      size={size}
      style={{ minWidth, borderRight: borderColor }}
      {...props}
    >
      {children}
    </MuiTableCell>
  );
};

export const TableCell = styled(MuiTableCell)({
  borderRight: borderColor,
});

export const TableRow = styled(MuiTableRow)({
  ".MuiTableCell-body": {
    ":first-child": {
      borderLeft: borderColor,
    },
  },
});

export { TableContainer, Table, TableBody };
