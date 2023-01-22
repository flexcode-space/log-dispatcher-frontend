import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { modal } from 'src/state/modal'
import { subsistemApi } from 'src/api/subsistem'
import { ibtApi } from 'src/api/ibt'
import { pembangkitApi } from 'src/api/pembangkit'

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getIbtList, ibtList } = ibtApi()
  const { getPembangkitList, pembangkitList } = pembangkitApi()

  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))
  const ibtOptions = ibtList.map(({ id, nama }) => ({ value: id, label: nama }))
  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-neraca-daya") {
      getSubsistemList()
      getIbtList()
      getPembangkitList()
    }
  }, [modalSnap.isOpen])

  return {
    subsistemOptions,
    pembangkitOptions,
    ibtOptions
  }
}