import * as yup from 'yup'

export const initialValues = {
  tanggal_start: new Date(),
  tanggal_end: new Date(),
}

export const validationSchema = yup.object({
  tanggal_start: yup.string().required('This field is required'),
  tanggal_end: yup.string().required('This field is required'),
})