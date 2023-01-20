import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  limit?: number
  page?: number
}

const endpoint = '/gangguan'

const gangguanApi = () => {
  const [gangguanList, setGangguanList] = useState<[]>([])
  const [jenisGangguanList, setJenisGangguanList] = useState<[]>([])
  const [releGangguanList, setReleGangguanList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)

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


  return {
    releGangguanList,
    gangguanList,
    jenisGangguanList,
    loading,
    countData,
    getGangguanList,
    getJenisGangguanList,
    getReleGangguanList,
    createGangguan,
    updateGangguan,
    deleteGangguan
  }
}

export default gangguanApi