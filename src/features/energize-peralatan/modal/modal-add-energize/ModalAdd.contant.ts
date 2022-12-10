import * as yup from 'yup'
import { convertDate } from 'src/utils/date'
import { CreateEnergizePeralatan } from "../../types"

const date: any = new Date()

export const optionJenisPeralatan = [
  { label: "IBT", value: "ibt" },
  { label: "Pembangkit", value: "pembangkit" },
  { label: "Trafo", value: "trafo" },
  { label: "Busbar", value: "busbar" },
  { label: "Penghantar", value: "penghantar" },
  { label: "Reaktor", value: "reaktor" },
]

export const initialValues: CreateEnergizePeralatan = {
  ba_ptp: '',
  gardu_induk_id: '',
  jenis_peralatan: '',
  keterangan: '',
  manuver: '',
  peralatan_id: '',
  permohonan: '',
  rlb: '',
  sop: '',
  tanggal: convertDate(date),
}

export const validationSchema = yup.object({
  ba_ptp: yup.string().required('This field is required'),
  gardu_induk_id: yup.string().required('This field is required'),
  jenis_peralatan: yup.string().required('This field is required'),
  keterangan: yup.string(),
  manuver: yup.string().required('This field is required'),
  peralatan_id: yup.string().required('This field is required'),
  permohonan: yup.string().required('This field is required'),
  rlb: yup.string().required('This field is required'),
  sop: yup.string().required('This field is required'),
  tanggal: yup.date().required('This field is required'),
})