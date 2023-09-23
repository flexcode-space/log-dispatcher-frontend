import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { modal } from 'src/state/modal'
import { pembangkitApi } from 'src/api/pembangkit'

export const useModalAdd = () => {
  const modalSnap = useSnapshot(modal)
  const { getPembangkitList, pembangkitList } = pembangkitApi()

  const pembangkitOptions = pembangkitList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-add-batubara") {
      getPembangkitList()
    }
  }, [modalSnap.isOpen])

  return {
    pembangkitOptions,
  }
}