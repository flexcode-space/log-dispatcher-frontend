import { proxy } from 'valtio'
import { LaporanNeracaDayaList } from '../types'


const initialValues = {
  data: {} as LaporanNeracaDayaList
}

export const laporanNeracaDaya = proxy<{ data: LaporanNeracaDayaList }>(initialValues)

export const selectData = (data: LaporanNeracaDayaList): void => {
  laporanNeracaDaya.data = data
}

export const removeData = (): void => {
  laporanNeracaDaya.data = initialValues.data
}