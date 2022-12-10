import { useCallback, useState } from 'react'
import { toast } from 'src/components/toast'
import { Axios } from '../axios'

export type Params = {
  search?: string;
}

const endpoint = '/kit-lur/energize-peralatan'

const energizePeralatanApi = () => {
  const [energizePeralatanList, setEnergizePeralatanList] = useState<[]>([])
  const [peralatanList, setPeralatanList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getEnergizePeralatanList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setEnergizePeralatanList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getPeralatanByPath = useCallback(async (path: string) => {
    const { data: { data } } = await Axios.get(`/peralatan/${path}`)
    setPeralatanList(data || [])
  }, [])

  const createEnergizePeralatan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
      toast.success('Berhasil menambahkan Energize Peralatan')
    } catch (error) {
      toast.error('Gagal menambahkan Energize Peralatan')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateEnergizePeralatan = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
      toast.success('Berhasil mengubah Energize Peralatan')
    } catch (error) {
      toast.error('Gagal mengubah Energize Peralatan')
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    energizePeralatanList,
    peralatanList,
    loading,
    getEnergizePeralatanList,
    getPeralatanByPath,
    createEnergizePeralatan,
    updateEnergizePeralatan
  }
}

export default energizePeralatanApi