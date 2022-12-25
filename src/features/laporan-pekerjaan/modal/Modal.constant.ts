import * as yup from 'yup'

type InitialValues = {
  jenis: "emergency"
  | "terencana"
  | "lain"
  | "menginap"
  | "tidak-terpenuhi"
  | "DEFAULT"
}

export const initialValues: InitialValues = {
  jenis: 'DEFAULT'
}

export const validationSchema = yup.object({
  jenis: yup.string()
})