import { laporanPekerjaanList } from '../LaporanPekerjaan.constant'

export const useModalAdd = () => {

  const jenisPekerjaanOptions = laporanPekerjaanList.map(({ title, type }) => ({ value: type, label: title }))

  return {
    jenisPekerjaanOptions,
  };
};
