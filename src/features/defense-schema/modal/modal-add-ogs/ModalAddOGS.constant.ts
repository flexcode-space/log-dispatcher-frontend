import * as yup from "yup";

export const optionJenisPeralatan = [
  { label: "IBT", value: "ibt" },
  { label: "Pembangkit", value: "pembangkit" },
  { label: "Trafo", value: "trafo" },
  { label: "Busbar", value: "busbar" },
  { label: "Penghantar", value: "penghantar" },
  { label: "Reaktor", value: "reaktor" },
]

export const initialValues = {
  amp_id: '',
  detik: 0,
  gardu_induk_id: '',
  jenis_peralatan: '',
  jenis_peralatan_target: '',
  keterangan: '',
  mw: 0,
  peralatan_id: '',
  peralatan_target_id: '',
  status: '',
  sub_sistem_id: '',
  tahap_id: '',
  tanggal: new Date(),

};

export const validationSchema = yup.object({
  amp_id: yup.string().required("This field is required"),
  detik: yup.number().required("This field is required"),
  gardu_induk_id: yup.string().required("This field is required"),
  jenis_peralatan: yup.string().required("This field is required"),
  jenis_peralatan_target: yup.string().required("This field is required"),
  keterangan: yup.string().required("This field is required"),
  mw: yup.number().required("This field is required"),
  peralatan_id: yup.string().required("This field is required"),
  peralatan_target_id: yup.string().required("This field is required"),
  status: yup.string().required("This field is required"),
  sub_sistem_id: yup.string().required("This field is required"),
  tahap_id: yup.string().required("This field is required"),
  tanggal: yup.string().required("This field is required"),
});
