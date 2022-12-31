import { proxy } from 'valtio'
import { BatubaraList } from '../types'

interface Batubara {
  data: BatubaraList
  type: string
}

const initialValues = {
  data: {} as BatubaraList,
  type: ''
}

export const batubara = proxy<Batubara>(initialValues)

export const selectType = (type: string): void => {
  batubara.type = type
}

export const selectData = (data: BatubaraList): void => {
  batubara.data = data
}

export const removeData = (): void => {
  batubara.type = initialValues.type
  batubara.data = initialValues.data
}