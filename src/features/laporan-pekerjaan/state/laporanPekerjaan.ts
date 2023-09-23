import { proxy } from 'valtio'
import { LaporanPekerjaanList } from '../types'


const initialValues = {
  data: {} as LaporanPekerjaanList
}

export const laporanPekerjaan = proxy<{ data: LaporanPekerjaanList }>(initialValues)

export const selectData = (data: LaporanPekerjaanList): void => {
  laporanPekerjaan.data = data
}

export const removeData = (): void => {
  laporanPekerjaan.data = initialValues.data
}