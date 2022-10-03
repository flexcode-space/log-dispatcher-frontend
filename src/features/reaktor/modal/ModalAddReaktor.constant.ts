import * as yup from 'yup'

export const initialValues = {
  gardu_induk_id: "",
  jenis: "",
  mvar: null,
  nama: "",
  b1: "",
  b2: "",
  b3: "",
  setting: null,
  sub_sistem_id: "",
  tagangan_id: ""
}

export const validationSchema = yup.object({
  gardu_induk_id: yup.string().required('This field is required'),
  jenis: yup.string().required('This field is required'),
  mvar: yup.number().typeError('This field is required').required('This field is required'),
  nama: yup.string().required('This field is required'),
  b1: yup.string().required('This field is required'),
  b2: yup.string().required('This field is required'),
  b3: yup.string().required('This field is required'),
  setting: yup.number().typeError('This field is required').required('This field is required'),
  sub_sistem_id: yup.string().required('This field is required'),
  tegangan_id: yup.string().required('This field is required'),
})

export const jenisReaktorOptions = [
  { value: "Radial", label: "Radial" },
  { value: "Transfer", label: "Transfer" },
  { value: "Loop", label: "Loop" }
]