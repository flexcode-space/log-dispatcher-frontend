import * as yup from 'yup'

export const initialValues = {
  file: "",
  tanggal: null
}

export const validationSchema = yup.object({
  file: yup.string().required('This field is required'),
  tanggal: yup.date().required('This field is required'),
})