import { proxy } from 'valtio'
import { LaporanScadaList } from '../type'


const initialValues = {
  data: {} as LaporanScadaList
}

export const laporanScada = proxy<{ data: LaporanScadaList }>(initialValues)

export const selectData = (data: LaporanScadaList): void => {
  laporanScada.data = data
}

export const removeData = (): void => {
  laporanScada.data = initialValues.data
}