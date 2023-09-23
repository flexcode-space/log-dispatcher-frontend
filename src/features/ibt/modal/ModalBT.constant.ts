import * as yup from 'yup'

export const initialValues = {
  arus_mampu: null,
  arus_nominal: null,
  gardu_induk_id: undefined,
  id_amr: '',
  mva_id: '',
  nama: '',
  no: '',
  rasio_tegangan_id: undefined,
  b1: '',
  b2: '',
  b3: '',
  sub_sistem_id: '',
}

export const validationSchema = yup.object({
  arus_mampu: yup.number().typeError('This field is required').required('This field is required'),
  arus_nominal: yup.number().typeError('This field is required').required('This field is required'),
  gardu_induk_id: yup.string().required('This field is required'),
  id_amr: yup.string().required('This field is required'),
  mva_id: yup.string().required('This field is required'),
  nama: yup.string().required('This field is required'),
  no: yup.string().required('This field is required'),
  rasio_tegangan_id: yup.string().required('This field is required'),
  b1: yup.string().required('This field is required'),
  b2: yup.string().required('This field is required'),
  b3: yup.string().required('This field is required'),
  sub_sistem_id: yup.string().required('This field is required'),
})

export const numberIbtOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" }
]