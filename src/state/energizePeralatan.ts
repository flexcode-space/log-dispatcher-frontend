import { proxy } from 'valtio'
import { EnergizeList } from 'src/features/energize-peralatan/types'

interface EnergizePeralatan {
  data: EnergizeList
}

const initialEnergizePeralatan = {
  data: {} as EnergizeList
}

export const energizePeralatan = proxy<EnergizePeralatan>(initialEnergizePeralatan)

export const selectData = (data: EnergizeList): void => {
  energizePeralatan.data = data
}

export const removeData = (): void => {
  energizePeralatan.data = initialEnergizePeralatan.data
}