import { proxy } from 'valtio'
import { SwitchingPembangkitList } from '../types'

const initialValues = {
  data: {} as SwitchingPembangkitList
}

export const switchingPembangkit = proxy<{ data: SwitchingPembangkitList }>(initialValues)

export const selectData = (data: SwitchingPembangkitList): void => {
  switchingPembangkit.data = data
}

export const removeData = (): void => {
  switchingPembangkit.data = initialValues.data
}