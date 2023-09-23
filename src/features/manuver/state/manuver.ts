import { proxy } from 'valtio'
import { ManuverList } from '../types'


const initialValues = {
  data: {} as ManuverList
}

export const manuver = proxy<{ data: ManuverList }>(initialValues)

export const selectData = (data: ManuverList): void => {
  manuver.data = data
}

export const removeData = (): void => {
  manuver.data = initialValues.data
}