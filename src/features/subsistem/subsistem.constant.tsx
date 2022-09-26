import Link from "next/link";
import Typography from "@mui/material/Typography";
import { CellType } from "./types";

export const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 150,
    field: "nama",
    headerName: "Subsistem",
  },
  {
    flex: 0.35,
    field: "ibt",
    minWidth: 80,
    headerName: "Jumlah IBT",
    renderCell: ({ row }: CellType) => (
      <Link href="/master-data/subsistem/detail">
        <a>{row.ibt}</a>
      </Link>
    ),
  },
  {
    flex: 0.25,
    field: "pembangkit",
    minWidth: 80,
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
    minWidth: 80,
    headerName: "Jumlah Trafo",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.trafo}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "busbar",
    minWidth: 80,
    headerName: "Busbar",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.busbar}</Typography>
    ),
  },
  {
    flex: 0.25,
    field: "reaktor",
    minWidth: 80,
    headerName: "Reaktor Kapasitor",
    renderCell: ({ row }: CellType) => (
      <Typography variant="body2">{row.reaktor}</Typography>
    ),
  },
];
