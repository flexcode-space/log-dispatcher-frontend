import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  gangguan_id: string
}

const endpoint = '/gangguan/data-padam'

const dataPadamApi = () => {
  const [dataPadamList, setDataPadamList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getDataPadamList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setDataPadamList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createDataPadam = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Data Padam')
    } catch (error) {
      toast.error('Gagal menambahkan Data Padam')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateDataPadam = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Data Padam')
    } catch (error) {
      toast.error('Gagal mengubah Data Padam')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteDataPadam = useCallback(async (payload: any) => {
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


  return {
    dataPadamList,
    loading,
    getDataPadamList,
    createDataPadam,
    updateDataPadam,
    deleteDataPadam
  }
}

export default dataPadamApi