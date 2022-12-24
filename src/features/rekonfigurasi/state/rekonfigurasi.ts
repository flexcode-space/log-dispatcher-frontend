import { proxy } from 'valtio'
import { RekonfigurasiList } from '../types'


const initialValues = {
  data: {} as RekonfigurasiList
}

export const rekonfigurasi = proxy<{ data: RekonfigurasiList }>(initialValues)

export const selectData = (data: RekonfigurasiList): void => {
  rekonfigurasi.data = data
}

export const removeData = (): void => {
  rekonfigurasi.data = initialValues.data
}