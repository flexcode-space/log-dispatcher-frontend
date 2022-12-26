import { proxy } from 'valtio'
import { GangguanList } from '../types'


const initialValues = {
  gangguanId: '',
  data: {} as GangguanList
}

export const gangguan = proxy<{ gangguanId: string, data: GangguanList }>(initialValues)

export const setGangguanID = (id: string): void => {
  gangguan.gangguanId = id
}

export const removeGangguanID = (): void => {
  gangguan.gangguanId = initialValues.gangguanId
}

export const selectData = (data: GangguanList): void => {
  gangguan.data = data
}

export const removeData = (): void => {
  gangguan.data = initialValues.data
}