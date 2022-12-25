import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
}

const endpoint = '/gangguan'

const gangguanApi = () => {
  const [gangguanList, setGangguanList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getGangguanList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setGangguanList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createGangguan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Gangguan')
    } catch (error) {
      toast.error('Gagal menambahkan Gangguan')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateGangguan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Gangguan')
    } catch (error) {
      toast.error('Gagal mengubah Gangguan')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    gangguanList,
    loading,
    getGangguanList,
    createGangguan,
    updateGangguan
  }
}

export default gangguanApi