import * as yup from 'yup'

export const initialValues = {
  pimpinan: ''
}

export const validationSchema = yup.object({
  pimpinan: yup.array()
})