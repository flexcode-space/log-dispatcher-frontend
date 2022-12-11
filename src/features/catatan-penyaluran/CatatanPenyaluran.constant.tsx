import * as yup from "yup";
import { CellType } from "src/types";
import { RenderCell } from "src/components/table";

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
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "tanggal_akhir",
    headerName: "Waktu Akhir",
  },
  {
    flex: 0.25,
    minWidth: 600,
    field: "keterangan",
    headerName: "Keterangan",
  },
];

export const initialValues = {
  gardu_induk_id: "",
  jurusan: "",
  keterangan: "",
  tanggal_akhir: "",
  waktu_akhir: "",
  tanggal_mulai: "",
  waktu_mulai: "",
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
