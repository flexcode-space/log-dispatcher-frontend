import { proxy } from 'valtio'
import { TargetIslandList } from '../types'


const initialValues = {
  data: {} as TargetIslandList
}

export const targetIsland = proxy<{ data: TargetIslandList }>(initialValues)

export const selectData = (data: TargetIslandList): void => {
  targetIsland.data = data
}

export const removeData = (): void => {
  targetIsland.data = initialValues.data
}