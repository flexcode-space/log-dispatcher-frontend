import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  limit?: number
  page?: number
  search?: string;
  jam?: string
  tanggal?: string
}

const endpoint = '/defense'

const defenseApi = () => {
  const [defenseList, setDefenseList] = useState<[]>([])
  const [tahapList, setTahapList] = useState<[]>([])
  const [ampList, setAmpList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [countData, setCountData] = useState<number>(0)

  const getDefenseList = useCallback(async (path: string, params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(`${endpoint}/${path}`, { params })
      setDefenseList(data || [])
      setCountData(total || 0)
    } finally {
      setLoading(false)
    }
  }, [])

  const getTahapList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/tahap`)
      setTahapList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getAmpList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/amp`)
      setAmpList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createDefense = useCallback(async (path: string, payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/${path}`, payload)
      toast.success('Berhasil menambahkan Defense Scheme')
    } catch (error) {
      toast.error('Gagal menambahkan Defense Scheme')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateDefense = useCallback(async (path: string, payload: any) => {
    setLoading(true)

    try {
      await Axios.put(`${endpoint}/${path}`, payload)
      toast.success('Berhasil mengubah Defense Scheme')
    } catch (error) {
      toast.error('Gagal mengubah Defense Scheme')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteDefense = useCallback(async (path: string, payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(`${endpoint}/${path}`, { data: payload })
      toast.success('Berhasil menghapus')
    } catch (error) {
      toast.error('Gagal menghapus')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    defenseList,
    tahapList,
    ampList,
    loading,
    getDefenseList,
    createDefense,
    updateDefense,
    getTahapList,
    getAmpList,
    deleteDefense,
    countData
  }
}

export default defenseApi