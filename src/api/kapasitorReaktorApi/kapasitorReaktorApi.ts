import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  limit?: number
  page?: number
}

interface ParamsReport {
  tanggal_start: string
  tanggal_end: string
}

const endpoint = '/dispatch/kapasitor-reaktor'

const kapasitorReaktorApi = () => {
  const [kapasitorReaktorList, setKapasitorReaktorList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)

  const getKapasitorReaktorList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setKapasitorReaktorList(data || [])
      setCountData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const createKapasitorReaktor = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Kapsitor Reaktor')
    } catch (error) {
      toast.error('Gagal menambahkan Kapsitor Reaktor')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateKapasitorReaktor = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Kapsitor Reaktor')
    } catch (error) {
      toast.error('Gagal mengubah Kapsitor Reaktor')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteKapasitorReaktor = useCallback(async (payload: any) => {
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
    kapasitorReaktorList,
    loading,
    countData,
    getKapasitorReaktorList,
    createKapasitorReaktor,
    updateKapasitorReaktor,
    deleteKapasitorReaktor,
    loadingDownload,
    getReport
  }
}

export default kapasitorReaktorApi