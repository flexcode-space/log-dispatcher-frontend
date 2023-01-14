import * as yup from 'yup'

export const initialValues = {
  tanggal: new Date(),
  pimpinan: '',
  shift_pagi: [],
  shift_siang: [],
  shift_malam: [],
  bid_fasop: [],
}

export const validationSchema = yup.object({
  tanggal: yup.string().required('This field is required'),
  pimpinan: yup.string().required('This field is required'),
  shift_pagi: yup.array().of(yup.string()).min(1),
  shift_siang: yup.array().of(yup.string()).min(1),
  shift_malam: yup.array().of(yup.string()).min(1),
  bid_fasop: yup.array().of(yup.string()).min(1),
})