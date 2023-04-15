import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/penghantar'

const penghantarApi = () => {
  const [penghantarList, setPenghantarList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const getPenghantarList = useCallback(async (id?: string, params: Params = {}) => {
    setLoading(true)

    try {
      const { path = 'sub-sistem', ...restParams } = params

      const url = !!id ? `${endpoint}/${path}/${id}` : endpoint
      const { data: { data, total } } = await Axios.get(url, { params: restParams })
      setPenghantarList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const getPenghantarDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const createPenghantar = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan penghantar')
    } catch (error) {
      toast.error('Gagal menambahkan penghantar')
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePenghantar = useCallback(async (payload: any, preventToast: boolean = false) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      if (!preventToast) {
        toast.success('Berhasil mengubah penghantar')
      }
    } catch (error) {
      if (!preventToast) {
        toast.error('Gagal mengubah penghantar')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePenghantar = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus penghantar')
    } catch (error) {
      toast.error('Gagal menghapus penghantar')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    penghantarList,
    loading,
    totalData,
    getPenghantarList,
    getPenghantarDetail,
    createPenghantar,
    updatePenghantar,
    deletePenghantar
  }
}

export default penghantarApi