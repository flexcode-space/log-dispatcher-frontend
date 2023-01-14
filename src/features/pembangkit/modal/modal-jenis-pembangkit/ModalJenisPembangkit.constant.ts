import * as yup from 'yup'

export const initialValues = {
  tipe_jenis_pembangkit_id: "",
  nama: ""
}

export const validationSchema = yup.object({
  tipe_jenis_pembangkit_id: yup.string().required('This field is required'),
  nama: yup.string().required('This field is required')
})

export const columns = [
  {
    flex: 0.25,
    minWidth: 10,
    field: "nama",
    headerName: "Nama Jenis Pembangkit",
  },
  {
    flex: 0.25,
    minWidth: 10,
    field: "jumlah",
    headerName: "Jumlah Pembangkit",
  },
];