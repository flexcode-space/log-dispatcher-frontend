import { proxy } from 'valtio'
import { Catatan } from '../types'


const initialValues = {
  data: {} as Catatan
}

export const laporanFreeGov = proxy<{ data: Catatan }>(initialValues)

export const selectData = (data: Catatan): void => {
  laporanFreeGov.data = data
}

export const removeData = (): void => {
  laporanFreeGov.data = initialValues.data
}