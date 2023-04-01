import { useEffect } from "react";
import { optionJenisPeralatan } from './ModalEditBebanHarian.constant'
import { peralatanApi } from "src/api/peralatan";
import { garduIndukApi } from "src/api/gardu-induk";

export const useModal = (jenisPeralatan: string, garduIndukID: string) => {
  const { getPeralatanByPath, peralatanList } = peralatanApi()
  const { garduIndukList, getGarduIndukList } = garduIndukApi()

  const peralatanOptions = peralatanList.map(({ id, nama }) => ({ value: id, label: nama }))
  const garduIndukOptions = garduIndukList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    getGarduIndukList()
  }, [])

  useEffect(() => {
    if (!!jenisPeralatan) {
      getPeralatanByPath(`${jenisPeralatan}/gardu-induk/${garduIndukID}`)
    }
  }, [jenisPeralatan])

  return {
    peralatanList,
    peralatanOptions,
    optionJenisPeralatan,
    garduIndukOptions
  };
};
