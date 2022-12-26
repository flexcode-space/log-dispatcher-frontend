import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  gangguan_id: string
}

const endpoint = '/gangguan/manuver'

const manuverApi = () => {
  const [manuverList, setManuverList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getManuverList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setManuverList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createManuver = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Manuver')
    } catch (error) {
      toast.error('Gagal menambahkan Manuver')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateManuver = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Manuver')
    } catch (error) {
      toast.error('Gagal mengubah Manuver')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    manuverList,
    loading,
    getManuverList,
    createManuver,
    updateManuver
  }
}

export default manuverApi