import * as yup from 'yup'

export const initialValues = {
  beban_ibt: 0,
  beban_kit: 0,
  dm_pasok: 0,
  ibt_id: "",
  keterangan: "",
  pembangkit_id: "",
  sub_sistem_id: "",
  tanggal: new Date()
}

export const validationSchema = yup.object({
  beban_ibt: yup.number(),
  beban_kit: yup.number(),
  dm_pasok: yup.number().required('This field is required'),
  ibt_id: yup.string(),
  keterangan: yup.string().required('This field is required'),
  pembangkit_id: yup.string(),
  sub_sistem_id: yup.string().required('This field is required'),
  tanggal: yup.string().required('This field is required')
})