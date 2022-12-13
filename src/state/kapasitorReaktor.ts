import { proxy } from 'valtio'
import { KapasitorReaktorList } from 'src/features/kapasitor-reaktor/types'

interface KapasitorReaktor {
  data: KapasitorReaktorList
}

const initialKapasitorReaktor = {
  data: {} as KapasitorReaktorList
}

export const kapasitorReaktor = proxy<KapasitorReaktor>(initialKapasitorReaktor)

export const selectData = (data: KapasitorReaktorList): void => {
  kapasitorReaktor.data = data
}

export const removeData = (): void => {
  kapasitorReaktor.data = initialKapasitorReaktor.data
}