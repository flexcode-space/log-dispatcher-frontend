import { useEffect } from 'react'
import { pembangkitApi } from 'src/api/pembangkit'
import { STATUS } from './SwitchingPembangkit.constant'
// import { garduIndukApi } from 'src/api/gardu-induk'
// import { pengaturanTeganganApi } from 'src/api/pengaturan-tegangan'

export const useSwitchingPembengkit = () => {
  const { getPembangkitList, pembangkitList } = pembangkitApi()
  // const { getKonfigurasiList, konfigurasiList } = pengaturanTeganganApi()

  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))
  const statusOptions = STATUS.map((value) => ({ value: value, label: value }))
  const jenisSwitchingOptions = [
    { value: 'naik-turn', label: 'Naik Turun' },
    { value: 'change-over', label: 'Change Over' },
    { value: 'start-stop', label: 'Start Stop' },
  ]
  const energiPrimerOptions = [
    { value: 'Air', label: 'Air' },
    { value: 'Gas', label: 'Gas' },
    { value: 'Batubara', label: 'Batubara' },
  ]


  useEffect(() => {
    getPembangkitList()
    // getKonfigurasiList()
  }, [])

  return {
    pembangkitOptions,
    jenisSwitchingOptions,
    statusOptions,
    energiPrimerOptions
  }
}