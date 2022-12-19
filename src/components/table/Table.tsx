import {
  Table,
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
  TableContainer,
  TableBody,
  Typography,
} from "@mui/material";
import { TableCellHeadProps } from "./Table.type";
import React from "react";

export const TableHead: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <MuiTableHead sx={{ height: "30px" }}>{children}</MuiTableHead>;
};

export const TableCellHead = ({
  children,
  minWidth,
  size = "small",
  ...props
}: TableCellHeadProps) => {
  return (
    <TableCell variant="head" size={size} style={{ minWidth }} {...props}>
      {children}
    </TableCell>
  );
};

export const RenderCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography variant="subtitle2" noWrap sx={{ textTransform: "capitalize" }}>
      {children}
    </Typography>
  );
};

export { TableContainer, Table, TableBody, TableCell, TableRow };
