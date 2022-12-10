import { useSnapshot } from 'valtio'
import { garduIndukApi } from 'src/api/gardu-induk'
import { modal } from 'src/state/modal'
import { useEffect } from 'react'

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-energize-peralatan") {
      getGarduIndukList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions
  }
}