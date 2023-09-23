import { useCallback, useState } from "react";
import { toast } from "src/components/toast";
import { Axios } from "../axios";

export type Params = {
  search?: string;
  tanggal?: string;
  tipe?: string;
};

const endpoint = "/report/laporan-pekerjaan";

const laporanPekerjaanApi = () => {
  const [laporanPekerjaanList, setLaporanPekerjaanList] = useState<[]>([]);
  const [laporanPekerjaanGenerateList, setLaporanPekerjaanGenerateList] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getLaporanPekerjaanList = useCallback(async (params: Params) => {
    setLoading(true);

    try {
      const {
        data: { data },
      } = await Axios.get(endpoint, { params });
      setLaporanPekerjaanList(data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const createLaporanPekerjaan = useCallback(async (payload: any) => {
    setLoading(true);

    try {
      await Axios.post(endpoint, payload);
      toast.success("Berhasil menambahkan Laporan Pekerjaan APD");
    } catch (error) {
      toast.error("Gagal menambahkan Laporan Pekerjaan APD");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLaporanPekerjaan = useCallback(async (payload: any) => {
    setLoading(true);

    try {
      await Axios.put(endpoint, payload);
      toast.success("Berhasil mengubah Laporan Pekerjaan");
    } catch (error) {
      toast.error("Gagal mengubah Laporan Pekerjaan");
    } finally {
      setLoading(false);
    }
  }, []);

  const getLaporanPekerjaanGenerate = useCallback(async (params: Params) => {
    setLoading(true);

    try {
      const {
        data: { result },
      } = await Axios.get(`${endpoint}/generate`, { params });
      setLaporanPekerjaanGenerateList(result || "");
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLaporanPekerjaan = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus')
    } catch (error) {
      toast.error('Gagal menghapus')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    laporanPekerjaanList,
    laporanPekerjaanGenerateList,
    loading,
    getLaporanPekerjaanList,
    getLaporanPekerjaanGenerate,
    createLaporanPekerjaan,
    updateLaporanPekerjaan,
    deleteLaporanPekerjaan
  };
};

export default laporanPekerjaanApi;
