import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { garduIndukApi } from 'src/api/gardu-induk'
import { penghantarApi } from 'src/api/penghantar'
import { modal } from 'src/state/modal'

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getPenghantarList, penghantarList } = penghantarApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const penghantarOptions = penghantarList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-switching-luar-rencana") {
      getGarduIndukList()
      getPenghantarList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions,
    penghantarOptions
  }
}