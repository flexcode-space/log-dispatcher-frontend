import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
  tipe: string
}

const endpoint = '/primer/air'

const airApi = () => {
  const [airList, setAirList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getAirList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setAirList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createAir = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Energi Primer Air')
    } catch (error) {
      toast.error('Gagal menambahkan Energi Primer Air')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateAir = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Energi Primer Air')
    } catch (error) {
      toast.error('Gagal mengubah Energi Primer Air')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    airList,
    loading,
    getAirList,
    createAir,
    updateAir
  }
}

export default airApi