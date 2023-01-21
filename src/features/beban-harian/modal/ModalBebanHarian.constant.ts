import * as yup from 'yup'

export const initialValues = {
  nama_peralatan: "",
  peralatan_id: "",
  subsistem_awal_id: "",
  subsistem_akhir_id: "",
  tanggal: new Date(),
  waktu: new Date(),
}

export const validationSchema = yup.object({
  nama_peralatan: yup.string().required('This field is required'),
  peralatan_id: yup.string().required('This field is required'),
  subsistem_awal_id: yup.string().required('This field is required'),
  subsistem_akhir_id: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
  waktu: yup.string().required('This field is required'),
})

export const optionJenisPeralatan = [
  { label: "IBT", value: "ibt" },
  { label: "Pembangkit", value: "pembangkit" },
  { label: "Trafo", value: "trafo" },
  { label: "Busbar", value: "busbar" },
  { label: "Penghantar", value: "penghantar" },
  { label: "Reaktor", value: "reaktor" },
]