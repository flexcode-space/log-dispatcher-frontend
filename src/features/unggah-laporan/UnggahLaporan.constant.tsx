import Typography from "@mui/material/Typography";
import { CellType } from "./types";

export const defaultColumns = [
  {
    flex: 0.35,
    minWidth: 100,
    field: "nama",
    headerName: "Nama Laporan",
  },
  {
    flex: 0.35,
    minWidth: 100,
    field: "tipe",
    headerName: "Tipe Laporan",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "tanggal",
    headerName: "Tanggal DIUNGGAH",
  },
];

export const tipeLaporanOptions = [
  {
    value: "amr",
    label: "AMR",
  },
  { value: "scada", label: "Scada" },
];
