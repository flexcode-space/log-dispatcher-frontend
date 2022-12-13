import * as yup from "yup";
import { PayloadKapasitorReaktor } from "./types";

export const initialValues: PayloadKapasitorReaktor = {
  gardu_induk_id: "",
  jam_buka: new Date(),
  jam_tutup: new Date(),
  keterangan: "",
  tanggal: new Date(),
  tegangan_sebelum: null,
  tegangan_sesudah: null,
};

export const validationSchema = yup.object({
  gardu_induk_id: yup.string().required("This field is required"),
  jam_buka: yup.date().required("This field is required"),
  jam_tutup: yup.date().required("This field is required"),
  keterangan: yup.string().required("This field is required"),
  tanggal: yup.date().required("This field is required"),
  tegangan_sebelum: yup.number().required("This field is required"),
  tegangan_sesudah: yup.number().required("This field is required"),
});
