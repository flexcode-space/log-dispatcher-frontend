import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/penghantar'

const busbarApi = () => {
  const [busbarList, setBusbarList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getBusbarList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setBusbarList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    busbarList,
    loading,
    getBusbarList
  }
}

export default busbarApi