import * as yup from "yup";

export const initialValues = {
  gardu_induk_id: "",
  jenis: "",
  jurusan: "",
};

export const validationSchema = yup.object({
  gardu_induk_id: yup.string().required("This field is required"),
  jenis: yup.string().required("This field is required"),
  jurusan: yup.string().required("This field is required"),
});