import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { modal } from 'src/state/modal'
import { garduIndukApi } from 'src/api/gardu-induk'
import { subsistemApi } from 'src/api/subsistem'
import { trafoApi } from 'src/api/trafo'
import { defenseApi } from 'src/api/defense'

export const useModalUFR = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getTrafoList, trafoList } = trafoApi()
  const { getTahapList, tahapList } = defenseApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))
  const trafoOptions = trafoList.map(({ id, nama }) => ({ value: id, label: nama }))
  const tahapOptions = tahapList.map(({ id, nama }) => ({ value: id, label: nama }))
  const statusOptions = [
    { value: 'true', label: "ON" },
    { value: 'false', label: "OFF" }
  ]


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-add-ufr") {
      getGarduIndukList()
      getSubsistemList()
      getTrafoList()
      getTahapList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions,
    subsistemOptions,
    trafoOptions,
    tahapOptions,
    statusOptions
  }
}