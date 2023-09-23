import * as yup from 'yup'

export const initialValues = {
  bahan_bakar_id: '',
  dmn: null,
  gardu_induk_id: undefined,
  id_amr: '',
  jenis_pembangkit_id: '',
  kategori_pembangkit_id: undefined,
  nama: '',
  b1: '',
  b2: '',
  b3: '',
  sub_sistem_id: '',
  tml: null
}

export const validationSchema = yup.object({
  bahan_bakar_id: yup.string().required('This field is required'),
  dmn: yup.number().typeError('This field is required').required('This field is required'),
  gardu_induk_id: yup.string().required('This field is required'),
  id_amr: yup.string().required('This field is required'),
  jenis_pembangkit_id: yup.string().required('This field is required'),
  kategori_pembangkit_id: yup.string().required('This field is required'),
  nama: yup.string().required('This field is required'),
  b1: yup.string().required('This field is required'),
  b2: yup.string().required('This field is required'),
  b3: yup.string().required('This field is required'),
  sub_sistem_id: yup.string().required('This field is required'),
  tml: yup.number().typeError('This field is required').required('This field is required')
})