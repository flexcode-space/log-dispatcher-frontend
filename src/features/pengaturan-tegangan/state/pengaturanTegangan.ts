import { proxy } from 'valtio'
import { PengaturanTeganganList } from '../types'

const initialState = {
  data: {} as PengaturanTeganganList
}

export const pengaturanTegangan = proxy<{ data: PengaturanTeganganList }>(initialState)

export const selectData = (data: PengaturanTeganganList): void => {
  pengaturanTegangan.data = data
}

export const removeData = (): void => {
  pengaturanTegangan.data = initialState.data
}