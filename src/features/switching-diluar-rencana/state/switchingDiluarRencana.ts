import { proxy } from 'valtio'
import { SwitchingLuarRencanaList } from '../types'

const initialState = {
  data: {} as SwitchingLuarRencanaList
}

export const switchingDiluarRencana = proxy<{ data: SwitchingLuarRencanaList }>(initialState)

export const selectData = (data: SwitchingLuarRencanaList): void => {
  switchingDiluarRencana.data = data
}

export const removeData = (): void => {
  switchingDiluarRencana.data = initialState.data
}