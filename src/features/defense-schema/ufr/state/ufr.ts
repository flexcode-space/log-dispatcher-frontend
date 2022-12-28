import { proxy } from 'valtio'
import { DefenseUFRList } from '../types'


const initialValues = {
  data: {} as DefenseUFRList
}

export const ufr = proxy<{ data: DefenseUFRList }>(initialValues)

export const selectData = (data: DefenseUFRList): void => {
  ufr.data = data
}

export const removeData = (): void => {
  ufr.data = initialValues.data
}