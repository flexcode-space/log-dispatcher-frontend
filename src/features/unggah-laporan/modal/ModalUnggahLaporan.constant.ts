import * as yup from 'yup'

export const initialValues = {
  tipe: "",
  scada: "",
  tanggal: new Date()
}

export const validationSchema = yup.object({
  // tipe: yup.string().required('This field is required'),
  // scada: yup.string().required('This field is required'),
  // tanggal: yup.date().required('This field is required'),
})