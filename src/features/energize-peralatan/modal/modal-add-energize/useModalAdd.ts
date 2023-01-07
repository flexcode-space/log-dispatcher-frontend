import { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { garduIndukApi } from 'src/api/gardu-induk'
import { peralatanApi } from 'src/api/peralatan'
import { modal } from 'src/state/modal'
import { optionJenisPeralatan } from './ModalAdd.contant'

export const useModalAdd = (jenisPeralatan: string, garduIndukId: string) => {
  const modalSnap = useSnapshot(modal)
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const { getPeralatanByPath, peralatanList } = peralatanApi()

  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const peratanOptions = peralatanList.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen && modalSnap.target === "modal-energize-peralatan") {
      getGarduIndukList()
    }
  }, [modalSnap.isOpen])

  useEffect(() => {
    if (!!jenisPeralatan) {
      getPeralatanByPath(`${jenisPeralatan}/gardu-induk/${garduIndukId}`)
    }
  }, [jenisPeralatan])

  return {
    garduIndukOptions,
    optionJenisPeralatan,
    peratanOptions
  }
}