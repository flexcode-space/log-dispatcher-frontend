import * as yup from 'yup'

export const initialValues = {
  nama: ""
}

export const validationSchema = yup.object({
  nama: yup.string().required('This field is required')
})

export const columns = [
  {
    flex: 0.25,
    minWidth: 10,
    field: "nama",
    headerName: "Bahan Bakar",
  },
  {
    flex: 0.25,
    minWidth: 10,
    field: "jumlah",
    headerName: "Jumlah",
  },
];