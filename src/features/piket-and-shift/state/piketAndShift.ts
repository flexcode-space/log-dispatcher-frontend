import { proxy } from 'valtio'
import { PiketList } from 'src/api/piket/piketApi'

type DataPiket = {
  tanggal: string
  pimpinan: PiketList
  shiftPagi: PiketList[]
  shiftSiang: PiketList[]
  shiftMalam: PiketList[]
  bidFasop: PiketList[]
}

const initialValues = {
  data: {} as DataPiket
}

export const piketAndShift = proxy<{ data: DataPiket }>(initialValues)

export const selectData = (data: DataPiket): void => {
  piketAndShift.data = data
}

export const removeData = (): void => {
  piketAndShift.data = initialValues.data
}