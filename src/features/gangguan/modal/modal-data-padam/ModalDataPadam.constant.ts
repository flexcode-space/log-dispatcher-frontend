import * as yup from 'yup'

export const columns = [
  {
    flex: 0.25,
    minWidth: 100,
    field: "penyulang",
    headerName: "Penyulang",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "kw",
    headerName: "KW",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "menit",
    headerName: "Menit",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "kwh",
    headerName: "kwh",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "keterangan",
    headerName: "Keterangan",
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: "aksi",
    headerName: "Aksi",
  },
];

export const initialValues = {
  keterangan: "",
  kw: 0,
  menit: 0,
  penyulang: ""
}

export const validationSchema = yup.object({
  keterangan: yup.string().required('This field is required'),
  kw: yup.number().required('This field is required'),
  menit: yup.number().required('This field is required'),
  penyulang: yup.string().required('This field is required')
})