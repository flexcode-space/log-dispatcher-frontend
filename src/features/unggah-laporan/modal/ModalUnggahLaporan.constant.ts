import * as yup from 'yup'

export const initialValues = {
  tipe: "",
  jenis: "mw-mvar",
  scada: "",
  tanggal: new Date(),
  jam: new Date(),
  pembangkit: {
    w: "",
    var: ""
  },
  trafo: {
    w: "",
    var: ""
  },
  ibt: {
    w: "",
    var: ""
  }
}

export const validationSchema = yup.object({
  tipe: yup.string().required('This field is required'),
  jenis: yup.string(),
  scada: yup.string(),
  tanggal: yup.date().required('This field is required'),
  pembangkit: yup.object().shape({
    w: yup.string(),
    var: yup.string()
  })
})