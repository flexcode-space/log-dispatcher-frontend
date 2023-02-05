import * as yup from "yup";
import { PayloadKapasitorReaktor } from "./types";

export const initialValues: PayloadKapasitorReaktor = {
  gardu_induk_id: "",
  jam_buka: null,
  jam_tutup: null,
  keterangan: "Pengaturan Tegangan",
  tanggal: new Date(),
  tegangan_sebelum: null,
  tegangan_sesudah: null,
};

export const validationSchema = yup.object().shape(
  {
    gardu_induk_id: yup.string().required("This field is required"),
    jam_buka: yup.string().when("jam_tutup", {
      is: null,
      then: yup.string().required("This field is required"),
      otherwise: yup.string().nullable(),
    }),
    jam_tutup: yup.string().when("jam_buka", {
      is: null,
      then: yup.string().required("This field is required"),
      otherwise: yup.string().nullable(),
    }),
    keterangan: yup.string().required("This field is required"),
    tanggal: yup.date().required("This field is required"),
    tegangan_sebelum: yup.number().required("This field is required"),
    tegangan_sesudah: yup.number().required("This field is required"),
  },
  [["jam_buka", "jam_tutup"]]
);
