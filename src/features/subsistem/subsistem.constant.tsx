import Typography from "@mui/material/Typography";
import { CellType } from "./types";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "nama",
    headerName: "Subsistem",
  },
  {
    flex: 0.35,
    field: "ibt",
    headerName: "Jumlah IBT",
    renderCell: ({ row }: CellType) => (
      <Typography>{row.ibt}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "pembangkit",
    headerName: "Jumlah Pembangkit",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.pembangkit}</Typography>
    ),
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: "penghantar",
    headerName: "Jumlah Penghantar",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.penghantar}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "trafo",
    headerName: "Jumlah Trafo",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.trafo}</Typography>
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
    field: "reaktor",
    headerName: "Reaktor Kapasitor",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.reaktor}</Typography>
    ),
  },
];

export const DATA = [
  {
    busbar: 2,
    ibt: 2,
    id: "c836c745-e1db-4777-9699-e40fffaa302d",
    nama: "Tanjung Jati",
    pembangkit: 2,
    penghantar: 2,
    reaktor: 2,
    trafo: 2,
  },
];
