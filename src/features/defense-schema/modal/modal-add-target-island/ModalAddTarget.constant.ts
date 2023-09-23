import * as yup from 'yup'

export const initialValues = {
  defense_tahap_id: '',
  frekuensi: 0,
  gardu_induk_id: '',
  island: '',
  keterangan: '',
  status: 'true',
  tanggal: new Date(),
  target_trip: [
    {
      value: ''
    }
  ]
}

export const validationSchema = yup.object({
  defense_tahap_id: yup.string().required('This field is required'),
  frekuensi: yup.number().required('This field is required'),
  gardu_induk_id: yup.string().required('This field is required'),
  island: yup.string().required('This field is required'),
  keterangan: yup.string().required('This field is required'),
  status: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
  target_trip: yup.array().of(
    yup.object().shape({
      value: yup.string().required('This field is required')
    })
  ),
})