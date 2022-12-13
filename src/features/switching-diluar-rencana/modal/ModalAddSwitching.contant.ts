import * as yup from 'yup'
import { InitialValuesSwitching } from '../types'

export const initialValues: InitialValuesSwitching = {
  gardu_induk_id: '',
  jam_buka: [
    {
      value: new Date()
    }
  ],
  jam_tutup: [
    {
      value: new Date()
    }
  ],
  keterangan: '',
  penghantar: [
    {
      id: ''
    }
  ],
  tanggal: new Date(),
}

export const validationSchema = yup.object({
  gardu_induk_id: yup.string().required('This field is required'),
  jam_buka: yup.array().of(
    yup.object().shape({
      value: yup.date(),
    })
  ),
  jam_tutup: yup.array().of(
    yup.object().shape({
      value: yup.date(),
    })
  ),
  penghantar: yup.array().of(
    yup.object().shape({
      id: yup.string().required('This field is required'),
    })
  ),
  keterangan: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
})