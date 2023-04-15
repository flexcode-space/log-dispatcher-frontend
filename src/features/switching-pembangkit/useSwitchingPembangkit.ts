import { useEffect } from 'react'
import { pembangkitApi } from 'src/api/pembangkit'
import { STATUS } from './SwitchingPembangkit.constant'
import { switchingPembangkitApi } from 'src/api/switching-pembangkit'

type Person = {
  id: string
  name: string
  status: string
}

export const useSwitchingPembengkit = () => {
  const { getPembangkitList, pembangkitList } = pembangkitApi()
  const { getPersonList, personList } = switchingPembangkitApi()

  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))
  const statusOptions = STATUS.map((value) => ({ value: value, label: value }))
  const bopsOptions = personList.filter((value: Person) => value?.status === 'bops').map(({ id, name }) => ({ value: id, label: name }))
  const accOptions = personList.filter((value: Person) => value?.status === 'acc').map(({ id, name }) => ({ value: id, label: name }))
  const operatorOptions = personList.filter((value: Person) => value?.status === 'operator').map(({ id, name }) => ({ value: id, label: name }))
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
    bopsOptions,
    accOptions,
    operatorOptions,
  }
}