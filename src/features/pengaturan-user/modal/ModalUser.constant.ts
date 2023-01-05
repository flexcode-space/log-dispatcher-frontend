import * as yup from 'yup'

export const initialValues = {
  email: "",
  hak: 0,
  jabatan: "",
  name: "",
  password: "",
  photo: "",
  username: ""
}

export const validationSchema = yup.object({
  email: yup.string().email().required('This field is required'),
  hak: yup.number().required('This field is required'),
  jabatan: yup.string().required('This field is required'),
  name: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
  photo: yup.string().required('This field is required'),
  username: yup.string().required('This field is required')
})