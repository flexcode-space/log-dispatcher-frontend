import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  limit?: number
  page?: number
}

interface ParamsReport {
  tanggal_start: string
  tanggal_end: string
}

const endpoint = '/gangguan'

const gangguanApi = () => {
  const [gangguanList, setGangguanList] = useState<[]>([])
  const [jenisGangguanList, setJenisGangguanList] = useState<[]>([])
  const [releGangguanList, setReleGangguanList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)
  const [loadingDownload, setLoadingDownload] = useState<boolean>(false);

  const getGangguanList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setGangguanList(data || [])
      setCountData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const getJenisGangguanList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/jenis`)
      setJenisGangguanList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getReleGangguanList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/rele-announciator`)
      setReleGangguanList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createGangguan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Laporan Gangguan')
    } catch (error) {
      toast.error('Gagal menambahkan Laporan Gangguan')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateGangguan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Laporan Gangguan')
    } catch (error) {
      toast.error('Gagal mengubah Laporan Gangguan')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteGangguan = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus Laporan Gangguan')
    } catch (error) {
      toast.error('Gagal menghapus Laporan Gangguan')
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

  const createReleGangguan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/rele-announciator`, payload)
      toast.success('Berhasil menambahkan Rele')
    } catch (error) {
      toast.error('Gagal menambahkan Rele')
    } finally {
      setLoading(false)
    }
  }, [])

  const createJenisGangguan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/jenis`, payload)
      toast.success('Berhasil menambahkan Jenis Gangguan')
    } catch (error) {
      toast.error('Gagal menambahkan Jenis Gangguan')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    releGangguanList,
    gangguanList,
    jenisGangguanList,
    loading,
    countData,
    getReport,
    getGangguanList,
    getJenisGangguanList,
    getReleGangguanList,
    createGangguan,
    updateGangguan,
    deleteGangguan,
    loadingDownload,
    createReleGangguan,
    createJenisGangguan
  }
}

export default gangguanApi