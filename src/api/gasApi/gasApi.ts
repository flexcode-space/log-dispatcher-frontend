import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal?: string
}

const endpoint = '/primer/gas'

const gasApi = () => {
  const [gasList, setGasList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getGasList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setGasList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createGas = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Energi Primer Gas')
    } catch (error) {
      toast.error('Gagal menambahkan Energi Primer Gas')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    gasList,
    loading,
    getGasList,
    createGas,
  }
}

export default gasApi