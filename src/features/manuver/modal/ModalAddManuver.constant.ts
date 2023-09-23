import * as yup from 'yup'
import { InitialValue } from './types'

export const initialValues: InitialValue = {
  gardu_induk: [{ id: "" }],
  buka: [{ value: null }],
  tutup: [{ value: null }],
  jurusan: [{ value: "" }],
  keterangan: [{ value: "" }],
}

export const validationSchema = yup.object({
  gardu_induk: yup.array().of(
    yup.object().shape({
      id: yup.string().required('This field is required'),
    })
  ),
  buka: yup.array().of(
    yup.object().shape({
      value: yup.date().nullable(),
    })
  ),
  tutup: yup.array().of(
    yup.object().shape({
      value: yup.date().nullable(),
    })
  ),
  jurusan: yup.array().of(
    yup.object().shape({
      value: yup.string().required('This field is required'),
    })
  ),
  keterangan: yup.array().of(
    yup.object().shape({
      value: yup.string().required('This field is required')
    })
  ),
})