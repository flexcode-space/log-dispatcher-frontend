import * as yup from 'yup'

export const initialValues = {
  arus_mampu: null,
  arus_nominal: null,
  gardu_induk_id: undefined,
  gardu_induk_tujuan_id: undefined,
  id_amr: '',
  jenis: '',
  line: '',
  nama: '',
  b1: '',
  b2: '',
  b3: '',
  sub_sistem_id: '',
  tegangan_id: '',
  kof_sym: 'x',
  kof_num: 1
}

export const validationSchema = yup.object({
  arus_mampu: yup.number().typeError('This field is required').required('This field is required'),
  arus_nominal: yup.number().typeError('This field is required').required('This field is required'),
  gardu_induk_id: yup.string().required('This field is required'),
  gardu_induk_tujuan_id: yup.string().required('This field is required'),
  id_amr: yup.string().required('This field is required'),
  jenis: yup.string().required('This field is required'),
  line: yup.string().required('This field is required'),
  nama: yup.string().required('This field is required'),
  b1: yup.string().required('This field is required'),
  b2: yup.string().required('This field is required'),
  b3: yup.string().required('This field is required'),
  sub_sistem_id: yup.string().required('This field is required'),
  tegangan_id: yup.string().required('This field is required'),
  kof_sym: yup.string(),
  kof_num: yup.number()
})

export const jenisPenghantarOptions = [
  { value: "Radial", label: "Radial" },
  { value: "Transfer", label: "Transfer" },
  { value: "Loop", label: "Loop" }
]