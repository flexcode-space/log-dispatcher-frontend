import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

const endpoint = '/defense/ufr'

const defenseUFRApi = () => {
  const [defenseUFRList, setDefenseUFRList] = useState<[]>([])
  const [tahapList, setTahapList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getDefenseUFRList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setDefenseUFRList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getTahapList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get('defense/tahap')
      setTahapList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createDefenseUFR = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Defense UFR')
    } catch (error) {
      toast.error('Gagal menambahkan Defense UFR')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateDefenseUFR = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Defense UFR')
    } catch (error) {
      toast.error('Gagal mengubah Defense UFR')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    defenseUFRList,
    tahapList,
    loading,
    getDefenseUFRList,
    createDefenseUFR,
    updateDefenseUFR,
    getTahapList
  }
}

export default defenseUFRApi