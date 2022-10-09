import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/reaktor'

const reaktorApi = () => {
  const [reaktorList, setReaktorList] = useState<[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const getReaktorList = useCallback(async (id?: string, params: Params = {}) => {
    setLoading(true)

    try {
      const url = !!id ? `${endpoint}/sub-sistem/${id}` : endpoint
      const { data: { data } } = await Axios.get(url, { params })
      setReaktorList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getReaktorDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const createReaktor = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan reaktor')
    } catch (error) {
      toast.error('Gagal menambahkan reaktor')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateReaktor = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah reaktor')
    } catch (error) {
      toast.error('Gagal mengubah reaktor')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteReaktor = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
      toast.success('Berhasil menghapus reaktor')
    } catch (error) {
      toast.error('Gagal menghapus reaktor')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    reaktorList,
    loading,
    totalData,
    getReaktorList,
    getReaktorDetail,
    createReaktor,
    updateReaktor,
    deleteReaktor
  }
}

export default reaktorApi