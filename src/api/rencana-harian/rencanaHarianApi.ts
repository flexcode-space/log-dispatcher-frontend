import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/laporan/rencana'

const rencanaHarianApi = () => {
  const [rencanaHarianList, setRencanaHarianList] = useState([])
  const [totalData, setTotalData] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const getRencanaHarianList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data, total } } = await Axios.get(endpoint, { params })
      setRencanaHarianList(data || [])
      setTotalData(total)
    } finally {
      setLoading(false)
    }
  }, [])

  const unggahRencanaHarian = useCallback(async (payload = {}) => {
    await Axios.post(endpoint, payload)
  }, [])


  return {
    rencanaHarianList,
    totalData,
    loading,
    getRencanaHarianList,
    unggahRencanaHarian,
  }
}

export default rencanaHarianApi