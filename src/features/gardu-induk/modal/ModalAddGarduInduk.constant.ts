import * as yup from 'yup'

export const initialValues = {
  upt_id: "",
  gardu_induk: [
    {
      nama: ''
    }
  ],
}

export const validationSchema = yup.object({
  upt_id: yup.string().required(),
  gardu_induk: yup.array().of(
    yup.object().shape({
      nama: yup.string().required()
    })
  )
})