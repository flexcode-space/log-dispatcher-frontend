import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  date?: string
}

const endpoint = '/defense'

const defenseApi = () => {
  const [defenseList, setDefenseList] = useState<[]>([])
  const [tahapList, setTahapList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getDefenseList = useCallback(async (path: string, params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(`${endpoint}/${path}`, { params })
      setDefenseList(data || [])
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

  const createDefense = useCallback(async (path: string, payload: any) => {
    setLoading(true)

    try {
      await Axios.post(`${endpoint}/${path}`, payload)
      toast.success('Berhasil menambahkan Defense Schema')
    } catch (error) {
      toast.error('Gagal menambahkan Defense Schema')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateDefense = useCallback(async (path: string, payload: any) => {
    setLoading(true)

    try {
      await Axios.put(`${endpoint}/${path}`, payload)
      toast.success('Berhasil mengubah Defense Schema')
    } catch (error) {
      toast.error('Gagal mengubah Defense Schema')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    defenseList,
    tahapList,
    loading,
    getDefenseList,
    createDefense,
    updateDefense,
    getTahapList
  }
}

export default defenseApi