import { Typography } from "@mui/material";
import { CellType } from "src/types";

export const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "pembangkit",
    headerName: "Pembangkit",
    renderCell: ({ row }: CellType) => {
      const { pembangkit } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {pembangkit.nama}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "stock",
    headerName: "Stock",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "satuan",
    headerName: "Satuan",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "harian",
    headerName: "Hari",
  },
  {
    flex: 0.25,
    minWidth: 150,
    field: "unit",
    headerName: "Unit",
  },
];
