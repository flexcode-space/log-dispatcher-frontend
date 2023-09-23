import { useEffect } from 'react';
import { useSnapshot } from 'valtio'
import { subsistemApi } from 'src/api/subsistem'
import { garduIndukApi } from 'src/api/gardu-induk'
import { pembangkitApi } from 'src/api/pembangkit'
import { modal } from 'src/state/modal'

export const useModal = () => {
  const modalSnap = useSnapshot(modal)
  const { getSubsistemList, subsistemList } = subsistemApi()
  const { getGarduIndukList, garduIndukList } = garduIndukApi()
  const {
    getJenisPembangkit,
    jenisPembangkit,
    getBahanBakar,
    bahanBakar,
    getKategoriPembangkit,
    kategoriPembangkit
  } = pembangkitApi()

  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))
  const jenisPembangkitOptions = jenisPembangkit.map(({ id, nama }) => ({ value: id, label: nama }))
  const bahanBakarOptions = bahanBakar.map(({ id, nama }) => ({ value: id, label: nama }))
  const kategoriPembangkitOptions = kategoriPembangkit.map(({ id, nama }) => ({ value: id, label: nama }))


  useEffect(() => {
    if (modalSnap.isOpen) {
      getSubsistemList()
      getGarduIndukList()
      getJenisPembangkit()
      getBahanBakar()
      getKategoriPembangkit()
    }
  }, [modalSnap.isOpen])

  return {
    subsistemOptions,
    garduIndukOptions,
    jenisPembangkitOptions,
    bahanBakarOptions,
    kategoriPembangkitOptions
  };
};
