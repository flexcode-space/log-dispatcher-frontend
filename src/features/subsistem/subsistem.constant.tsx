import Typography from "@mui/material/Typography";
import { CellType } from "./types";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "name",
    headerName: "Subsistem",
    renderCell: ({ row }: CellType) => <Typography>{row.subsistem}</Typography>,
  },
  {
    flex: 0.35,
    field: "jumlah_ibt",
    headerName: "Jumlah IBT",
    renderCell: ({ row }: CellType) => (
      <Typography>{row.jumlah_ibt}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "jumlah_pembangkit",
    headerName: "Jumlah Pembangkit",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.jumlah_pembangkit}</Typography>
    ),
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: "jumlah_penghantar",
    headerName: "Jumlah Penghantar",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.jumlah_penghantar}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "jumlah_trafo",
    headerName: "Jumlah Trafo",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.jumlah_trafo}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "busbar",
    headerName: "Busbar",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.busbar}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "reaktor_kapasitor",
    headerName: "Reaktor Kapasitor",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.reaktor_kapasitor}</Typography>
    ),
  },
];

export const DATA = [
  {
    id: 1,
    subsistem: "Ungaran",
    jumlah_ibt: 1,
    jumlah_pembangkit: 1,
    jumlah_penghantar: 1,
    jumlah_trafo: 1,
    busbar: 1,
    reaktor_kapasitor: 1,
  },
];
