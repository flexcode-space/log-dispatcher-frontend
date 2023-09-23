import * as yup from 'yup'
import { Filter } from "../../types";

export const initialValues: Filter = {
  pembangkit_id: '',
  status: '',
  jenis: '',
  tanggal: null
};

export const validationSchema = yup.object({
  pembangkit_id: yup.string(),
  status: yup.string(),
  jenis: yup.string(),
  tanggal: yup.string().nullable()
})
