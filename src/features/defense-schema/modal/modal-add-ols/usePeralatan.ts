import { useEffect } from "react";
import { optionJenisPeralatan as jenisPeralatanTargetOptions } from './ModalAddOLS.constant'
import { peralatanApi } from "src/api/peralatan";

export const usePeralatan = (jenisPeralatan: string, garduIndukId: string) => {
  const { getPeralatanByPath, peralatanList } = peralatanApi()

  const peralatantargetOptions = peralatanList.map(({ id, nama }) => ({ value: id, label: nama }))

  useEffect(() => {
    if (!!jenisPeralatan) {
      getPeralatanByPath(`${jenisPeralatan}/gardu-induk/${garduIndukId}`)
    }
  }, [jenisPeralatan])

  return {
    peralatantargetOptions,
    jenisPeralatanTargetOptions,
  };
};
