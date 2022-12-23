import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { modal } from 'src/state/modal'
import { subsistemApi } from 'src/api/subsistem'
import { ibtApi } from 'src/api/ibt'
import { pembangkitApi } from 'src/api/pembangkit'
import { garduIndukApi } from 'src/api/gardu-induk'

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getIbtList, ibtList } = ibtApi()
  const { getPembangkitList, pembangkitList } = pembangkitApi()

  const typeOptions = [
    { value: 'oop', label: 'Monitoring Scada OOP' },
    { value: 'tidak-sesuai', label: 'Monitoring Telemetering Tidak Sesuai' },
  ]
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const ibtOptions = ibtList.map(({ id, nama }) => ({ value: id, label: nama }))
  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-laporan-scada") {
      getSubsistemList()
      getIbtList()
      getPembangkitList()
      getGarduIndukList()
    }
  }, [modalSnap.isOpen])

  return {
    garduIndukOptions,
    pembangkitOptions,
    ibtOptions,
    typeOptions,
  }
}