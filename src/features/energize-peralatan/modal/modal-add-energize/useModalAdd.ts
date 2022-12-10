import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { garduIndukApi } from 'src/api/gardu-induk'
import { energizePeralatanApi } from 'src/api/energize-peralatan'
import { modal } from 'src/state/modal'
import { optionJenisPeralatan } from './ModalAdd.contant'

export const useModalAdd = (jenisPeralatan: string) => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getPeralatanByPath, peralatanList } = energizePeralatanApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const peratanOptions = peralatanList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-energize-peralatan") {
      getGarduIndukList()
    }
  }, [modalSnap.isOpen])

  useEffect(() => {
    if (!!jenisPeralatan) {
      getPeralatanByPath(jenisPeralatan)
    }
  }, [jenisPeralatan])

  return {
    garduIndukOptions,
    optionJenisPeralatan,
    peratanOptions
  }
}