import { useEffect } from 'react'
import { garduIndukApi } from 'src/api/gardu-induk'

export const useCatatanPenyaluran = () => {
  const { getGarduIndukList, garduIndukList } = garduIndukApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    getGarduIndukList()
  }, [])

  return {
    garduIndukOptions,
  }
}