import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  page?: number
  limit?: number
}

interface ParamsReport {
  tanggal_start: string
  tanggal_end: string
}

const endpoint = '/dispatch/switching-pembangkit'

const switchingPembangkitApi = () => {
  const [switchingPembangkitList, setSwitchingPembangkitList] = useState<[]>([])
  const [personList, setPersonList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)

  const getSwitchingPembangkitList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setSwitchingPembangkitList(data || [])
      setCountData(total || 0)
    } finally {
      setLoading(false)
    }
  }, [])

  const createSwitchingPembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Switching Pembangkit')
    } catch (error) {
      toast.error('Gagal menambahkan Switching Pembangkit')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSwitchingPembangkit = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Switching Pembangkit')
    } catch (error) {
      toast.error('Gagal mengubah Switching Pembangkit')
    } finally {
      setLoading(false)
    }
  }, [])

  const getPersonList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/person`, { params })
      setPersonList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteSwitchingPembangkit = useCallback(async (payload: any) => {
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
    personList,
    switchingPembangkitList,
    loading,
    countData,
    getSwitchingPembangkitList,
    getPersonList,
    createSwitchingPembangkit,
    updateSwitchingPembangkit,
    deleteSwitchingPembangkit,
    getReport,
    loadingDownload
  }
}

export default switchingPembangkitApi