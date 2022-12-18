import { useEffect } from 'react'
import { pembangkitApi } from 'src/api/pembangkit'
// import { garduIndukApi } from 'src/api/gardu-induk'
// import { pengaturanTeganganApi } from 'src/api/pengaturan-tegangan'

export const useSwitchingPembengkit = () => {
  const { getPembangkitList, pembangkitList } = pembangkitApi()
  // const { getKonfigurasiList, konfigurasiList } = pengaturanTeganganApi()

  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))
  const jenisSwitchingOptions = [
    { value: 'naik-turn', label: 'Naik Turun' },
    { value: 'change-over', label: 'Change Over' },
    { value: 'start-stop', label: 'Start Stop' },
  ]


  useEffect(() => {
    getPembangkitList()
    // getKonfigurasiList()
  }, [])

  return {
    pembangkitOptions,
    jenisSwitchingOptions,
  }
}