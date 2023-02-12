import { useCallback, useState } from 'react'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal: string
}

interface ParamsReport {
  tanggal_start: string
  tanggal_end: string
}

const endpoint = '/primer/total-produksi'

const produksiKwhApi = () => {
  const [produksiKwhList, setProduksiKwhList] = useState<{}>({})
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const getProduksiKwhList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setProduksiKwhList(data || {})
    } finally {
      setLoading(false)
    }
  }, [])

  const getReport = useCallback(
    async (params: ParamsReport, path?: string) => {
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
    produksiKwhList,
    loading,
    getProduksiKwhList,
    getReport,
    loadingDownload
  }
}

export default produksiKwhApi