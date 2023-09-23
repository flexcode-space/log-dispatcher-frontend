import { useEffect } from "react";
import { optionJenisPeralatan } from './ModalEditBebanHarian.constant'
import { peralatanApi } from "src/api/peralatan";
import { subsistemApi } from "src/api/subsistem";

export const useModal = (jenisPeralatan: string, subsistemID: string) => {
  const { getPeralatanByPath, peralatanList } = peralatanApi()
  const { getSubsistemList, subsistemList } = subsistemApi()

  const peralatanOptions = peralatanList.map(({ id, nama }) => ({ value: id, label: nama }))
  const subsistemOptions = subsistemList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    getSubsistemList()
  }, [])

  useEffect(() => {
    if (!!jenisPeralatan) {
      getPeralatanByPath(`${jenisPeralatan}/sub-sistem/${subsistemID}`)
    }
  }, [jenisPeralatan])

  return {
    peralatanList,
    peralatanOptions,
    optionJenisPeralatan,
    subsistemOptions
  };
};
