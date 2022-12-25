import * as yup from 'yup'

export const initialValues = {
  gardu_induk: [{ id: "" }],
  buka: [{ value: new Date() }],
  tutup: [{ value: new Date() }],
  jurusan: [{ value: "" }],
  keterangan: '',
}

export const validationSchema = yup.object({
  gardu_induk: yup.array().of(
    yup.object().shape({
      id: yup.string().required('This field is required'),
    })
  ),
  buka: yup.array().of(
    yup.object().shape({
      value: yup.date(),
    })
  ),
  tutup: yup.array().of(
    yup.object().shape({
      value: yup.date(),
    })
  ),
  jurusan: yup.array().of(
    yup.object().shape({
      value: yup.string().required('This field is required'),
    })
  ),
  keterangan: yup.string().required('This field is required'),
})