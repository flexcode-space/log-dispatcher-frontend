import * as yup from 'yup'
import { PayloadSwitchingLuarRencana } from '../types'

export const initialValues: PayloadSwitchingLuarRencana = {
  gardu_induk_id: '',
  jam_buka: new Date(),
  jam_tutup: new Date,
  keterangan: '',
  penghantar_id: '',
  tanggal: '',
}

export const validationSchema = yup.object({
  gardu_induk_id: yup.string().required('This field is required'),
  jam_buka: yup.date().required('This field is required'),
  jam_tutup: yup.date().required('This field is required'),
  keterangan: yup.string().required('This field is required'),
  penghantar_id: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
})