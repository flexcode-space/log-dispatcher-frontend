import * as yup from 'yup'

export const initialValues: { table: string[] } = {
  table: []
}

export const validationSchema = yup.object({
  table: yup.array().of(yup.string()),
})

export const optionsFilter = [
  {
    value: 'i_nom',
    label: 'I (A)'
  },
  {
    value: 'mw',
    label: 'MW'
  },
  {
    value: 'mvar',
    label: 'MVAR'
  },
  {
    value: 'kwh',
    label: 'KWH'
  },
  {
    value: 'percent_i_nom',
    label: '% I NOM'
  },
  {
    value: 'i_mampu',
    label: '% I MAMPU'
  }
]