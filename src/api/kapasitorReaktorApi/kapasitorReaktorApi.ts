import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

const endpoint = '/dispatch/kapasitor-reaktor'

const kapasitorReaktorApi = () => {
  const [kapasitorReaktorList, setKapasitorReaktorList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getKapasitorReaktorList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setKapasitorReaktorList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createKapasitorReaktor = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Kapsitor Reaktor')
    } catch (error) {
      toast.error('Gagal menambahkan Kapsitor Reaktor')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateKapasitorReaktor = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Kapsitor Reaktor')
    } catch (error) {
      toast.error('Gagal mengubah Kapsitor Reaktor')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    kapasitorReaktorList,
    loading,
    getKapasitorReaktorList,
    createKapasitorReaktor,
    updateKapasitorReaktor
  }
}

export default kapasitorReaktorApi