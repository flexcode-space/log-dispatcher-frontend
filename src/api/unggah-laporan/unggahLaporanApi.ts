import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/laporan'

const unggahLaporanApi = () => {
  const [unggahLaporanList, setUnggahLaporanList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getUnggahLaporanList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setUnggahLaporanList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    unggahLaporanList,
    loading,
    getUnggahLaporanList,
  }
}

export default unggahLaporanApi