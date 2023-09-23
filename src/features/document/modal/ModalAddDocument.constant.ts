import * as yup from 'yup'

export type UploadDocumentType = {
  keterangan: string,
  nama: string,
  nama_url: string,
  tipe: string,
}

export const initialValues: UploadDocumentType = {
  keterangan: '',
  nama: '',
  nama_url: '',
  tipe: '',
}

export const validationSchema = yup.object({
  keterangan: yup.string().required(),
  nama: yup.string().required(),
  nama_url: yup.string().required(),
  tipe: yup.string().required(),
})