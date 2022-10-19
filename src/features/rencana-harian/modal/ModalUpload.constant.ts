import * as yup from 'yup'

export const initialValues = {
  tipe: "",
}

export const validationSchema = yup.object({
  tipe: yup.string().required('This field is required'),
})