import * as yup from 'yup'

export const symbolOptions = [
  {
    value: 'x',
    label: '(x) Dikali'
  },
  {
    value: ':',
    label: '(÷) Dibagi'
  },
  {
    value: '+',
    label: '(+) Ditambah'
  },
  {
    value: '-',
    label: '(-) Dikurang'
  },
]

export const initialValues = {
  kof_sym: 'x',
  kof_num: 1
}

export const validationSchema = yup.object({
  kof_sym: yup.string().required('This field is required'),
  kof_num: yup.number().required('This field is required')
})