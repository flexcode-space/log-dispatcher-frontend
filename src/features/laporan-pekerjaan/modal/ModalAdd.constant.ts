import * as yup from 'yup'

type TypeUnion =
  "emergency"
  | "terencana"
  | "lain"
  | "menginap"
  | "tidak-terpenuhi"
  | "DEFAULT"


export const initialValues = {
  bay: "",
  gardu_induk_id: "",
  keterangan: "",
  kontingensi: "",
  progress: "",
  tagar: "",
  tanggal: new Date(),
  tipe: "DEFAULT" as TypeUnion,
  unit_pelaksana: "",
  uraian_pekerjaan: "",
  tanggal_awal: new Date(),
  waktu_awal: new Date(),
  tanggal_akhir: new Date(),
  waktu_akhir: new Date(),

}

export const validationSchema = yup.object({
  tipe: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required')
})