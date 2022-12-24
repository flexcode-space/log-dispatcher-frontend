import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { modal } from 'src/state/modal'
import { garduIndukApi } from 'src/api/gardu-induk'
import { subsistemApi } from 'src/api/subsistem'

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getSubsistemList, subsistemList } = subsistemApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: nama, label: nama }))
  const subsitemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-rekonfigurasi") {
      getGarduIndukList()
      getSubsistemList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions,
    subsitemOptions
  }
}