import * as yup from 'yup'

export const initialValues = {
  tipe: "",
  scada: "",
  tanggal: "",
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
  scada: yup.string(),
  tanggal: yup.date().required('This field is required'),
  pembangkit: yup.object().shape({
    w: yup.string(),
    var: yup.string()
  })
})