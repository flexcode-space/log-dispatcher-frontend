import * as yup from "yup";
import { CellType } from "src/types";
import { RenderCell } from "src/components/table";
import dayjs from "dayjs";
import { PayloadCatatanPembangkitan } from "./types";

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
    minWidth: 80,
    field: "operator",
    headerName: "Operator",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "tanggal_mulai",
    headerName: "Waktu Mulai",
    renderCell: ({ row }: CellType) => {
      const startDate = dayjs(row?.tanggal_mulai).format("DD MMM YYYY, HH:mm");
      return <RenderCell>{startDate}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "waktu_akhir",
    headerName: "Waktu Akhir",
    renderCell: ({ row }: CellType) => {
      const endDate = dayjs(row?.tanggal_akhir).format("DD MMM YYYY, HH:mm");
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

export const initialValues: PayloadCatatanPembangkitan = {
  pembangkit_id: "",
  mampu: null,
  status: "",
  tanggal_mulai: new Date(),
  waktu_mulai: new Date(),
  tanggal_akhir: new Date(),
  waktu_akhir: new Date(),
  keterangan: "",
  operator: "",
};

export const validationSchema = yup.object({
  pembangkit_id: yup.string().required("This field is required"),
  mampu: yup.number().required("This field is required"),
  status: yup.string().required("This field is required"),
  tanggal_mulai: yup.string(),
  waktu_mulai: yup.string(),
  tanggal_akhir: yup.string(),
  waktu_akhir: yup.string(),
  keterangan: yup.string().required("This field is required"),
  operator: yup.string().required("This field is required"),
});
