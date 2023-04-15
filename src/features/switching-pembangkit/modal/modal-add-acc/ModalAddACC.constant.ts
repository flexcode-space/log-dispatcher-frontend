import * as yup from 'yup'

export const initialValues = {
  name: ""
}

export const validationSchema = yup.object({
  name: yup.string().required('This field is required')
})

export const columns = [
  {
    flex: 0.25,
    field: "name",
    headerName: "Nama",
  },
];