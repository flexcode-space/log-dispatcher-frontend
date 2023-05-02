import * as yup from "yup";

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

export const initialValues = {
  energi_primer: "",
  jenis: "",
  keterangan: "",
  operator_acc_id: "",
  operator_bops_id: "",
  operator_pembangkit_id: "",
  pembangkit_id: "",
  // status: "",
  tanggal: new Date(),
  tegangan: 0,
  tipe: "",
  waktu_perintah: new Date(),
  waktu_real: null,
};

export const validationSchema = yup.object({
  energi_primer: yup.string(),
  jenis: yup.string().required("This field is required"),
  keterangan: yup.string().required("This field is required"),
  operator_acc_id: yup.string().required("This field is required"),
  operator_bops_id: yup.string().required("This field is required"),
  operator_pembangkit_id: yup.string().required("This field is required"),
  pembangkit_id: yup.string().required("This field is required"),
  // status: yup.string(),
  tanggal: yup.string().required("This field is required"),
  tegangan: yup.number(),
  tipe: yup.string(),
  waktu_perintah: yup.string().required("This field is required"),
  waktu_real: yup.string().nullable(true),
});
