import * as yup from 'yup'
import { FilterProps } from '../../types'

export const initialValues: FilterProps = {
  gardu_induk_id: '',
  jenis_peralatan: '',
  jurusan: '',
  tanggal_mulai: null,
  tanggal_akhir: null
}

export const validationSchema = yup.object({
  gardu_induk_id: yup.string(),
  jurusan: yup.string(),
  jenis_peralatan: yup.string(),
  tanggal_mulai: yup.string().nullable(),
  tanggal_akhir: yup.string().nullable()
})