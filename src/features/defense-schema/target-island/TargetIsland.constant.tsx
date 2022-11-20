import { Typography, Chip } from "@mui/material";
import { array } from "yup";

export interface CellType {
  row: any;
}

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
    field: "app",
    headerName: "APP",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "gardu_induk",
    headerName: "Gardu Induk",
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
    field: "tanggal_aktif",
    headerName: "Tanggal Aktif",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "status",
    headerName: "Status",
    renderCell: ({ row }: CellType) => {
      const { status } = row;
      return <Chip label={status} color="success" />;
    },
  },
];

export const dataMock = () => {
  const data = {
    island: "RDRUT - KRAPK",
    tahap: 1,
    frekuensi: "48,3",
    app: "Semarang",
    gardu_induk: "Ungaran",
    target_trip: "PMT 150 kV IBT 3",
    tanggal_aktif: "18 Jan 2020",
    status: "Aktif",
  };

  const arr = [];

  for (let i = 0; i < 5; i++) {
    arr.push({
      id: i,
      ...data,
    });
  }

  return arr;
};
