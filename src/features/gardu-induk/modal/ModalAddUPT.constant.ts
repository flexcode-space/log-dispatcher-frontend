import * as yup from 'yup'

export const initialValues = {
  nama: "",
}

export const validationSchema = yup.object({
  nama: yup.string().required()
})