import * as yup from 'yup'
import { Filter } from '../../types'

export const initialValues: Filter = {
  gardu_induk_id: '',
  gangguan_jenis_id: '',
  jenis_peralatan: '',
  peralatan_id: '',
  announciator: '',
  rele: '',
  tanggal: null,
}

export const validationSchema = yup.object({
  gardu_induk_id: yup.string(),
  gangguan_jenis_id: yup.string(),
  jenis_peralatan: yup.string(),
  peralatan_id: yup.string(),
  announciator: yup.string(),
  rele: yup.string(),
  tanggal: yup.string().nullable(),
})