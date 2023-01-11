import { Axios } from "../axios";
import { useCallback, useState } from "react";

import { Params } from "../types";

interface ParamsLaporanForGenerate extends Params {
  tanggal?: string;
}

const endpoint = "/report/laporan-for/generate";

const laporanForGenerate = () => {
  const [laporanForGenerateList, setLaporanForGenerateList] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getLaporanForGenerate = useCallback(
    async (params: ParamsLaporanForGenerate = {}) => {
      setLoading(true);
      try {
        const {
          data: { result },
        } = await Axios.get(endpoint, { params });
        setLaporanForGenerateList(result || "");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    laporanForGenerateList,
    loading,
    getLaporanForGenerate,
  };
};
export default laporanForGenerate;
