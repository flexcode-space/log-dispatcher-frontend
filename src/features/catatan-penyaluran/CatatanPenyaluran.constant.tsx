import * as yup from "yup";
import { CellType } from "src/types";
import { RenderCell } from "src/components/table";
import { PayloadCatatanPenyaluran } from "./types";
import dayjs from "dayjs";

export const defaultColumns = [
  {
    flex: 0.25,
    field: "gardu_induk",
    minWidth: 200,
    headerName: "Lokasi",
    renderCell: ({ row }: CellType) => {
      const { gardu_induk } = row;
      return <RenderCell>{gardu_induk?.nama}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 50,
    field: "jurusan",
    headerName: "Jurusan",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "tanggal_mulai",
    headerName: "Waktu Mulai",
    renderCell: ({ row }: CellType) => {
      const startDate = row?.tanggal_mulai
        ? dayjs(row?.tanggal_mulai).format("DD MMM YYYY, HH:mm")
        : "-";
      return <RenderCell>{startDate}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "tanggal_akhir",
    headerName: "Waktu Akhir",
    renderCell: ({ row }: CellType) => {
      const endDate = row?.tanggal_akhir
        ? dayjs(row?.tanggal_akhir).format("DD MMM YYYY, HH:mm")
        : "-";
      return <RenderCell>{endDate}</RenderCell>;
    },
  },
  {
    flex: 0.25,
    minWidth: 600,
    field: "keterangan",
    headerName: "Keterangan",
  },
];

export const initialValues: PayloadCatatanPenyaluran = {
  gardu_induk_id: "",
  jurusan: "",
  keterangan: "",
  tanggal_mulai: new Date(),
  waktu_mulai: new Date(),
  tanggal_akhir: new Date(),
  waktu_akhir: new Date(),
};

export const validationSchema = yup.object({
  gardu_induk_id: yup.string().required("This field is required"),
  jurusan: yup.string().required("This field is required"),
  tanggal_akhir: yup.string(),
  waktu_akhir: yup.string(),
  tanggal_mulai: yup.string().required("This field is required"),
  waktu_mulai: yup.string().required("This field is required"),
  keterangan: yup.string(),
});
