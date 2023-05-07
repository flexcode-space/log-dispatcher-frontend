import { useCallback, useState } from "react";
import { toast } from 'src/components/toast'
import { Axios } from "../axios";
import { Params } from "../types";
import { Total } from "./types";

interface ParamsBebanList extends Params {
  tanggal?: string;
}

interface ParamsReportBeban {
  tanggal_start: string
  tanggal_end: string
}

const endpoint = "/beban";

const bebanApi = () => {
  const [bebanList, setBebanList] = useState<[]>([]);
  const [bebanIBTList, setbebanIBTList] = useState<[]>([]);
  const [bebanTrafoList, setBebanTrafoList] = useState<[]>([]);
  const [bebanPenghantarList, setBebanPenghantarList] = useState<[]>([]);
  const [teganganBusbarList, setTeganganBusbarList] = useState<[]>([]);
  const [totalData, setTotalData] = useState<Total>({} as Total);
  const [loading, setLoading] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const getBebanList = useCallback(async (params: ParamsBebanList = {}) => {
    setLoading(true);

    try {
      const {
        data: { data, other },
      } = await Axios.get(endpoint, { params });
      setBebanList(data || []);
      setTotalData(other);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBeban = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.put(endpoint, payload);
      toast.success('Berhasil mengubah Beban Harian')
    } catch (error) {
      toast.error('Gagal mengubah Beban Harian')
    } finally {
      setLoading(false)
    }
  }, []);

  const getBebanIBTList = useCallback(async (params: ParamsBebanList = {}) => {
    setLoading(true);

    try {
      const {
        data: { data, total },
      } = await Axios.get(`${endpoint}/ibt`, { params });
      setbebanIBTList(data || []);
      setCountData(total || 0)
    } finally {
      setLoading(false);
    }
  }, []);

  const getBebanTrafoList = useCallback(
    async (params: ParamsBebanList = {}) => {
      setLoading(true);

      try {
        const {
          data: { data, total },
        } = await Axios.get(`${endpoint}/trafo`, { params });
        setBebanTrafoList(data || []);
        setCountData(total || 0)
      } finally {
        setLoading(false);
      }
    }, []);

  const getBebanPenghantarHarianList = useCallback(
    async (params: ParamsBebanList = {}) => {
      setLoading(true);

      try {
        const {
          data: { data, total },
        } = await Axios.get(`${endpoint}/penghantar`, { params });
        setBebanPenghantarList(data || []);
        setCountData(total || 0)
      } finally {
        setLoading(false);
      }
    }, []);

  const getTeganganBusbarList = useCallback(
    async (params: ParamsBebanList = {}) => {
      setLoading(true);

      try {
        const {
          data: { data, total },
        } = await Axios.get(`${endpoint}/busbar`, { params });
        setTeganganBusbarList(data || []);
        setCountData(total)
      } finally {
        setLoading(false);
      }
    }, []);

  const createPindahBeban = useCallback(async (payload: any) => {
    try {
      await Axios.post(`${endpoint}/pindah`, payload);
      toast.success('Berhasil pindah subsistem')
    } catch (error) {
      toast.error('Gagal pindah subsistem')
    }
  }, []);

  const getReportBeban = useCallback(
    async (params: ParamsReportBeban, path?: string) => {
      setLoadingDownload(true);

      try {
        const url = path ? `${endpoint}/${path}` : endpoint
        const { data } = await Axios.get(`${url}/report`, { params });
        return data
      } finally {
        setLoadingDownload(false);
      }
    }, []);

  return {
    bebanList,
    bebanIBTList,
    bebanTrafoList,
    bebanPenghantarList,
    teganganBusbarList,
    loading,
    totalData,
    countData,
    getBebanList,
    getBebanIBTList,
    getBebanTrafoList,
    getBebanPenghantarHarianList,
    getTeganganBusbarList,
    createPindahBeban,
    getReportBeban,
    loadingDownload,
    updateBeban
  };
};

export default bebanApi;
