import { proxy } from 'valtio'
import { CatatanPenyaluranList } from 'src/features/catatan-penyaluran/types'

interface CatatanPenyaluran {
  data: CatatanPenyaluranList
}

const initialCatatanPenyaluran = {
  data: {} as CatatanPenyaluranList
}

export const catatanPenyaluran = proxy<CatatanPenyaluran>(initialCatatanPenyaluran)

export const selectData = (data: CatatanPenyaluranList): void => {
  catatanPenyaluran.data = data
}

export const removeData = (): void => {
  catatanPenyaluran.data = initialCatatanPenyaluran.data
}