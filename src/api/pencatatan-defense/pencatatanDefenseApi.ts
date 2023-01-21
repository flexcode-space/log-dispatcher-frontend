import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  limit?: number
  page?: number
  search?: string;
  date?: string
}

const endpoint = '/defense'

const pencatatanDefenseApi = () => {
  const [pencatatanDefenseList, setPencatatanDefenseList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)

  const getPencatatanDefenseList = useCallback(async (path: string, params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(`${endpoint}/${path}/pencatatan`, { params })
      setPencatatanDefenseList(data || [])
      setCountData(total || 0)
    } finally {
      setLoading(false)
    }
  }, [])

  const createPencatanDefense = useCallback(async (path: string, payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/${path}/pencatatan`, payload)
      toast.success('Berhasil menambahkan pencatatan Defense Schema')
    } catch (error) {
      toast.error('Gagal menambahkan pencatatan Defense Schema')
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePencatanDefense = useCallback(async (path: string, payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(`${endpoint}/${path}/pencatatan`, { data: payload })
      toast.success('Berhasil menghapus')
    } catch (error) {
      toast.error('Gagal menghapus')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    pencatatanDefenseList,
    loading,
    countData,
    getPencatatanDefenseList,
    createPencatanDefense,
    deletePencatanDefense,

  }
}

export default pencatatanDefenseApi