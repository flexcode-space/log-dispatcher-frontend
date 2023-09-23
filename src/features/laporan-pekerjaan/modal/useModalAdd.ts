import { useEffect } from 'react';
import { garduIndukApi } from 'src/api/gardu-induk';
import { laporanPekerjaanList } from '../LaporanPekerjaan.constant'

export const useModalAdd = () => {
  const { getGarduIndukList, garduIndukList } = garduIndukApi()

  const jenisPekerjaanOptions = laporanPekerjaanList.map(({ title, type }) => ({ value: type, label: title }))
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    getGarduIndukList()
  }, [])

  return {
    jenisPekerjaanOptions,
    garduIndukOptions,
  };
};
