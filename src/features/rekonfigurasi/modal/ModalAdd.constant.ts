import * as yup from 'yup'

export const initialValues = {
  alasan_rekonfigurasi: '',
  gi: '',
  keterangan: '',
  sub_sistem_akhir_id: '',
  sub_sistem_awal_id: '',
  tanggal: new Date(),
  jam: new Date(),
}

export const validationSchema = yup.object({
  alasan_rekonfigurasi: yup.string().required('This field is required'),
  gi: yup.string().required('This field is required'),
  keterangan: yup.string().required('This field is required'),
  sub_sistem_akhir_id: yup.string().required('This field is required'),
  sub_sistem_awal_id: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
  jam: yup.string().required('This field is required'),
})