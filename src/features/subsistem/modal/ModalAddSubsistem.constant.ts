import * as yup from 'yup'

export const initialValues = {
  subsistem: [
    {
      nama: ''
    }
  ],
}

export const validationSchema = yup.object({
  subsistem: yup.array().of(
    yup.object().shape({
      nama: yup.string().required()
    })
  )
})