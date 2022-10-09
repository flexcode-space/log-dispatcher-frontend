import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/trafo'

const trafoApi = () => {
  const [trafoList, setTrafoList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const getTrafoList = useCallback(async (id?: string, params: Params = {}) => {
    setLoading(true)

    try {
      const url = !!id ? `${endpoint}/sub-sistem/${id}` : endpoint
      const { data: { data, total } } = await Axios.get(url, { params })
      setTrafoList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const getTrafoDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const createTrafo = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan trafo')
    } catch (error) {
      toast.error('Gagal menambahkan trafo')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateTrafo = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah trafo')
    } catch (error) {
      toast.error('Gagal mengubah trafo')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteTrafo = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus trafo')
    } catch (error) {
      toast.error('Gagal menghapus trafo')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    trafoList,
    loading,
    totalData,
    getTrafoList,
    getTrafoDetail,
    createTrafo,
    updateTrafo,
    deleteTrafo
  }
}

export default trafoApi