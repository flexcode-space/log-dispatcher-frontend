import { Typography, Chip } from "@mui/material";
import { CellType } from "src/types";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "island",
    minWidth: 200,
    headerName: "Island",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "tahap",
    headerName: "Tahap",
    renderCell: ({ row }: CellType) => {
      const { tahap } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {tahap?.value}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "frekuensi",
    headerName: "Frekuensi",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "gardu_induk",
    headerName: "Gardu Induk",
    renderCell: ({ row }: CellType) => {
      const { gardu_induk } = row;
      return (
        <Typography
          variant="subtitle2"
          noWrap
          sx={{ textTransform: "capitalize" }}
        >
          {gardu_induk?.nama}
        </Typography>
      );
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "target_trip",
    headerName: "Target Trip",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "tanggal",
    headerName: "Tanggal Aktif",
  },
];
