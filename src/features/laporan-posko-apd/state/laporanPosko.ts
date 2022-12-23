import { proxy } from 'valtio'
import { LaporanPoskoList } from '../types'


const initialValues = {
  data: {} as LaporanPoskoList
}

export const laporanPosko = proxy<{ data: LaporanPoskoList }>(initialValues)

export const selectData = (data: LaporanPoskoList): void => {
  laporanPosko.data = data
}

export const removeData = (): void => {
  laporanPosko.data = initialValues.data
}