import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  tipe: string
}

interface ParamsReport {
  tanggal_start: string
  tanggal_end: string
}

const endpoint = '/primer/hsd'

const batubaraApi = () => {
  const [batubaraList, setBatubaraList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const getBatubaraList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setBatubaraList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createBatubara = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan batubara dan hsd')
    } catch (error) {
      toast.error('Gagal menambahkan batubara dan hsd')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateBatubara = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah batubara dan hsd')
    } catch (error) {
      toast.error('Gagal mengubah batubara dan hsd')
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
    batubaraList,
    loading,
    getBatubaraList,
    createBatubara,
    updateBatubara,
    getReport,
    loadingDownload
  }
}

export default batubaraApi