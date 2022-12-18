import { proxy } from 'valtio'
import { KonfigurasiPengaturanTegangan } from '../types'

const initialValue = {
  data: {} as KonfigurasiPengaturanTegangan
}

export const konfigurasiPengaturanTegangan = proxy<{ data: KonfigurasiPengaturanTegangan }>(initialValue)

export const selectData = (data: KonfigurasiPengaturanTegangan): void => {
  konfigurasiPengaturanTegangan.data = data
}

export const removeData = (): void => {
  konfigurasiPengaturanTegangan.data = initialValue.data
}