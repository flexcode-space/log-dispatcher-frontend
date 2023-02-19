import * as yup from 'yup'
import { FilterProps } from '../../types'

export const values: FilterProps = {
  pembangkit_id: '',
  status: '',
  tanggal_mulai: null,
  tanggal_akhir: null,
  operator: ''
}

export const initialValues = {
  derating: { ...values },
  outage: { ...values },
  lain: { ...values }
}

export const validationSchema = yup.object({
  derating: yup.object({
    pembangkit_id: yup.string(),
    status: yup.string(),
    tanggal_mulai: yup.string().nullable(),
    tanggal_akhir: yup.string().nullable(),
    operator: yup.string()
  }),
  outage: yup.object({
    pembangkit_id: yup.string(),
    status: yup.string(),
    tanggal_mulai: yup.string().nullable(),
    tanggal_akhir: yup.string().nullable(),
    operator: yup.string()
  }),
  lain: yup.object({
    pembangkit_id: yup.string(),
    status: yup.string(),
    tanggal_mulai: yup.string().nullable(),
    tanggal_akhir: yup.string().nullable(),
    operator: yup.string()
  })
})