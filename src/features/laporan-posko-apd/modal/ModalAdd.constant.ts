import * as yup from 'yup'

export const initialValues = {
  beban_puncak: 0,
  cadangan_kit: 0,
  keterangan: '',
  pasokan_ibt: 0,
  pasokan_kit: 0,
  start_time: new Date,
  end_time: new Date,
  status: '',
  tanggal: new Date,
}

export const validationSchema = yup.object({
  beban_puncak: yup.number().required('This field is required'),
  cadangan_kit: yup.number().required('This field is required'),
  keterangan: yup.string().required('This field is required'),
  pasokan_ibt: yup.number().required('This field is required'),
  pasokan_kit: yup.number().required('This field is required'),
  start_time: yup.string().required('This field is required'),
  end_time: yup.string().required('This field is required'),
  status: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
})