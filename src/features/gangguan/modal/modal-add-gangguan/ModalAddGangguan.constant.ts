import * as yup from 'yup'

export const optionJenisPeralatan = [
  { label: "IBT", value: "ibt" },
  { label: "Pembangkit", value: "pembangkit" },
  { label: "Trafo", value: "trafo" },
  { label: "Busbar", value: "busbar" },
  { label: "Penghantar", value: "penghantar" },
  { label: "Reaktor", value: "reaktor" },
]

export const initialValues = {
  jenis_peralatan: '',
}

export const validationSchema = yup.object({
  jenis_peralatan: yup.string().required('This field is required'),
})