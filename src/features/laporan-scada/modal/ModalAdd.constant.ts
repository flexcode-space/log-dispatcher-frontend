import * as yup from 'yup'

export const initialValues = {
  aksi: '',
  aset: '',
  bay: '',
  gardu_induk_id: '',
  keterangan: '',
  status: '',
  tanggal: new Date(),
  tanggal_konfirmasi: new Date(),
  tipe: '',
}

export const validationSchema = yup.object({
  aksi: yup.string().required('This field is required'),
  aset: yup.string().required('This field is required'),
  bay: yup.string().required('This field is required'),
  gardu_induk_id: yup.string().required('This field is required'),
  keterangan: yup.string().required('This field is required'),
  status: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
  tanggal_konfirmasi: yup.string(),
  tipe: yup.string().required('This field is required'),
})