import { useEffect } from 'react';
import { subsistemApi } from 'src/api/subsistem'
import { garduIndukApi } from 'src/api/gardu-induk'
import { pembangkitApi } from 'src/api/pembangkit'

export const useModal = () => {
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
    getSubsistemList()
    getGarduIndukList()
    getJenisPembangkit()
    getBahanBakar()
    getKategoriPembangkit()
  }, [])

  return {
    subsistemOptions,
    garduIndukOptions,
    jenisPembangkitOptions,
    bahanBakarOptions,
    kategoriPembangkitOptions
  };
};
