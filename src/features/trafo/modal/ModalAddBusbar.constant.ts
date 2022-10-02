import * as yup from 'yup'

export const initialValues = {
  arus_mampu: null,
  arus_nominal: null,
  gardu_induk_id: "",
  id_amr: "",
  nama: "",
  no: "",
  rasio_tegangan_id: "",
  mva_id: "",
  b1: "",
  b2: "",
  b3: "",
  sub_sistem_id: "",
}

export const validationSchema = yup.object({
  arus_mampu: yup.number().typeError('This field is required').required('This field is required'),
  arus_nominal: yup.number().typeError('This field is required').required('This field is required'),
  gardu_induk_id: yup.string().required('This field is required'),
  id_amr: yup.string().required('This field is required'),
  nama: yup.string().required('This field is required'),
  rasio_tegangan_id: yup.string().required('This field is required'),
  mva_id: yup.string().required('This field is required'),
  no: yup.string().required('This field is required'),
  b1: yup.string().required('This field is required'),
  b2: yup.string().required('This field is required'),
  b3: yup.string().required('This field is required'),
  sub_sistem_id: yup.string().required('This field is required'),
})

export const trafoListOptions = [...Array(10)].map((_, index) => {
  const value = `TRAFO NO-${index + 1}`;
  return { value, label: value };
});