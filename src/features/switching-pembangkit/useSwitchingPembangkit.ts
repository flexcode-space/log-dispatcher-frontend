import { useEffect } from 'react'
import { pembangkitApi } from 'src/api/pembangkit'
import { STATUS } from './SwitchingPembangkit.constant'
import { switchingPembangkitApi } from 'src/api/switching-pembangkit'

export const useSwitchingPembengkit = () => {
  const { getPembangkitList, pembangkitList } = pembangkitApi()
  const { getPersonList, personList } = switchingPembangkitApi()

  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))
  const statusOptions = STATUS.map((value) => ({ value: value, label: value }))
  const personOptions = personList.map(({ id, name }) => ({ value: id, label: name }))
  const jenisSwitchingOptions = [
    { value: 'naik-turun', label: 'Naik Turun' },
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
    getPersonList()
  }, [])

  return {
    pembangkitOptions,
    jenisSwitchingOptions,
    statusOptions,
    energiPrimerOptions,
    personOptions
  }
}