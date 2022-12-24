import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

const endpoint = '/piket'

const piketApi = () => {
  const [piketList, setPiketList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getPiketList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setPiketList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createPiket = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Piket')
    } catch (error) {
      toast.error('Gagal menambahkan Piket')
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePiket = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Piket')
    } catch (error) {
      toast.error('Gagal mengubah Piket')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    piketList,
    loading,
    getPiketList,
    createPiket,
    updatePiket
  }
}

export default piketApi