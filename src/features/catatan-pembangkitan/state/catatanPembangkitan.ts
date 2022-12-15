import { proxy } from 'valtio'
import { CatatanPembangkitanList } from '../types'

const initialState = {
  data: {} as CatatanPembangkitanList
}

export const catatanPembangkitan = proxy<{ data: CatatanPembangkitanList }>(initialState)

export const selectData = (data: CatatanPembangkitanList): void => {
  catatanPembangkitan.data = data
}

export const removeData = (): void => {
  catatanPembangkitan.data = initialState.data
}