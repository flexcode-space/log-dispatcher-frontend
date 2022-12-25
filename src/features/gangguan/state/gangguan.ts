import { proxy } from 'valtio'


const initialValues = {
  gangguanId: ''
}

export const gangguan = proxy<{ gangguanId: string }>(initialValues)

export const setGangguanID = (id: string): void => {
  gangguan.gangguanId = id
}

export const removeGangguanID = (): void => {
  gangguan.gangguanId = initialValues.gangguanId
}