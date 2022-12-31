import { useCallback, useState } from 'react'
import { Axios } from '../axios'

export type Params = {
  search?: string;
  tanggal: string
}

const endpoint = '/primer/total-produksi'

const produksiKwhApi = () => {
  const [produksiKwhList, setProduksiKwhList] = useState<{}>({})
  const [loading, setLoading] = useState<boolean>(false);

  const getProduksiKwhList = useCallback(async (params: Params) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint, { params })
      setProduksiKwhList(data || {})
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    produksiKwhList,
    loading,
    getProduksiKwhList,
  }
}

export default produksiKwhApi