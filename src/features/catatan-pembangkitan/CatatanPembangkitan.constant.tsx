import { CellType } from "src/types";
import { RenderCell } from "src/components/table";
import dayjs from "dayjs";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "pembangkit",
    minWidth: 200,
    headerName: "Pembangkit",
    renderCell: ({ row }: CellType) => {
      const { pembangkit } = row;
      return <RenderCell>{pembangkit?.nama}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 70,
    field: "mampu",
    headerName: "Mampu",
  },
  {
    flex: 0.25,
    minWidth: 80,
    field: "status",
    headerName: "Status",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "operator",
    headerName: "Operator",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "tanggal_mulai",
    headerName: "Waktu Mulai",
    renderCell: ({ row }: CellType) => {
      const startDate = dayjs(row?.tanggal_mulai).format("HH:MM");
      return <RenderCell>{startDate}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "waktu_akhir",
    headerName: "Waktu Akhir",
    renderCell: ({ row }: CellType) => {
      const endDate = dayjs(row?.tanggal_akhir).format("HH:MM");
      return <RenderCell>{endDate}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "keterangan",
    headerName: "Keterangan",
  },
];

export const STATUS = [
  "FD1",
  "FD2",
  "FD3",
  "MD",
  "MDE",
  "PD",
  "PDE",

  "FO1",
  "FO2",
  "FO3",
  "MO",
  "ME",
  "PO",
  "PE",

  "IR",
  "MB",
  "NC",
  "RS",
  "RU",
  "SF",
];
