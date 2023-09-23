import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { modal } from 'src/state/modal'
import { garduIndukApi } from 'src/api/gardu-induk'
import { defenseApi } from 'src/api/defense'

export const useModalTargetIsland = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getTahapList, tahapList } = defenseApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const tahapOptions = tahapList.map(({ id, nama }) => ({ value: id, label: nama }))
  const statusOptions = [
    { value: 'true', label: "ON" },
    { value: 'false', label: "OFF" }
  ]


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-add-target-island") {
      getGarduIndukList()
      getTahapList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions,
    tahapOptions,
    statusOptions
  }
}