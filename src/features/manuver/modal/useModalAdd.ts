import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { modal } from 'src/state/modal'
import { garduIndukApi } from 'src/api/gardu-induk'

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-add-manuver") {
      getGarduIndukList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions,
  }
}