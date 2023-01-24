import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

interface ParamsReport {
  tanggal_start: string
  tanggal_end: string
}

const endpoint = '/kit-lur/catatan-penyaluran'

const catatanPenyaluranApi = () => {
  const [catatanPenyaluranList, setCatatanPenyaluran] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDownloadLur, setLoadingDownload] = useState<boolean>(false);

  const getCatatanPenyaluranList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setCatatanPenyaluran(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createCatatanPenyaluran = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Catatan Penyaluran')
    } catch (error) {
      toast.error('Gagal menambahkan Catatan Penyaluran')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCatatanPenyaluran = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Catatan Penyaluran')
    } catch (error) {
      toast.error('Gagal mengubah Catatan Penyaluran')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteCatatanPenyaluran = useCallback(async (payload: any) => {
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

  const getReportCatatanPenyaluran = useCallback(async (params: ParamsReport) => {
    setLoadingDownload(true);

    try {
      const { data } = await Axios.get(`/beban/lur/report`, { params });
      return data
    } finally {
      setLoadingDownload(false);
    }
  }, []);


  return {
    catatanPenyaluranList,
    loading,
    loadingDownloadLur,
    getCatatanPenyaluranList,
    createCatatanPenyaluran,
    updateCatatanPenyaluran,
    deleteCatatanPenyaluran,
    getReportCatatanPenyaluran
  }
}

export default catatanPenyaluranApi