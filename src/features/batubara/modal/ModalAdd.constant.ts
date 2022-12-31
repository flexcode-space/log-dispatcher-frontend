import * as yup from 'yup'

export const initialValues = {
  harian: 0,
  pembangkit_id: "",
  satuan: "",
  stock: 0,
  tanggal: new Date(),
  unit: 0
}

export const validationSchema = yup.object({
  harian: yup.number().required('This field is required'),
  pembangkit_id: yup.string().required('This field is required'),
  satuan: yup.string().required('This field is required'),
  stock: yup.number().required('This field is required'),
  tanggal: yup.string().required('This field is required'),
  unit: yup.number().required('This field is required')
})