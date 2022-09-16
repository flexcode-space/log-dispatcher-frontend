import Typography from "@mui/material/Typography";
import { CellType } from "./types";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "name",
    minWidth: 240,
    headerName: "Id Subsistem",
    renderCell: ({ row }: CellType) => <Typography>{row.name}</Typography>,
  },
  {
    flex: 0.35,
    minWidth: 280,
    field: "assignedTo",
    headerName: "Nama Subsistem",
    renderCell: ({ row }: CellType) => (
      <Typography>{row.assignedTo}</Typography>
    ),
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: "createdDate",
    headerName: "Jumlah Gardu Induk",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.createdDate}</Typography>
    ),
  },
];

export const DATA = [
  {
    id: 1,
    name: "231423423",
    assignedTo: "Ungaran",
    createdDate: "8",
  },
];
