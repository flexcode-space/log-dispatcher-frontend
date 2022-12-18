import * as yup from 'yup'

export const initialValues = {
  gardu_induk_id: "",
  jurusan_id: "",
  keterangan: "",
  mvar: 0,
  open_close: "",
  sebelum: 0,
  sesudah: 0,
  tanggal: new Date(),
  waktu: new Date()
}

export const validationSchema = yup.object({
  gardu_induk_id: yup.string().required('This field is required'),
  jurusan_id: yup.string().required('This field is required'),
  keterangan: yup.string().required('This field is required'),
  mvar: yup.number().required('This field is required'),
  open_close: yup.string().required('This field is required'),
  sebelum: yup.number().required('This field is required'),
  sesudah: yup.number().required('This field is required'),
  tanggal: yup.date().required('This field is required'),
  waktu: yup.date().required('This field is required')
})