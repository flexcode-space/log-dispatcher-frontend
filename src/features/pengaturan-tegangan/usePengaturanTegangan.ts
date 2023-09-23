import { useEffect } from 'react'
import { garduIndukApi } from 'src/api/gardu-induk'
import { pengaturanTeganganApi } from 'src/api/pengaturan-tegangan'

export const usePengaturanTegangan = () => {
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getKonfigurasiList, konfigurasiList } = pengaturanTeganganApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const konfigurasiOptions = konfigurasiList.map(({ id, jurusan }) => ({ value: id, label: jurusan }))
  const openCloseOptions = [
    { value: 'open', label: 'Open' },
    { value: 'close', label: 'Close' },
  ]


  useEffect(() => {
    getGarduIndukList()
    getKonfigurasiList()
  }, [])

  return {
    garduIndukOptions,
    konfigurasiOptions,
    openCloseOptions,
  }
}