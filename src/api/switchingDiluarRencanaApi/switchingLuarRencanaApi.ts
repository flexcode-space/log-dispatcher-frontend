import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { PayloadSwitchingLuarRencana } from 'src/features/switching-diluar-rencana/types';
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

const endpoint = '/dispatch/luar-rencana'

const switchingLuarRencanaApi = () => {
  const [switchingLuarRencana, setSwitchingLuarRencanaList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)

  const getSwitchingLuarRencanaList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setSwitchingLuarRencanaList(data || [])
      setCountData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const createSwitchingLuarRencana = useCallback(async (payload: PayloadSwitchingLuarRencana[]) => {
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

  const updateSwitchingLuarRencana = useCallback(async (payload: any) => {
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

  const deleteSwitchingLuarRencana = useCallback(async (payload: any) => {
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
    switchingLuarRencana,
    loading,
    countData,
    getSwitchingLuarRencanaList,
    createSwitchingLuarRencana,
    updateSwitchingLuarRencana,
    deleteSwitchingLuarRencana,
    getReport,
    loadingDownload
  }
}

export default switchingLuarRencanaApi