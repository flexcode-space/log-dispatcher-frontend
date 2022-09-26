import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/trafo'

const trafoApi = () => {
  const [trafoList, setTrafoList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getTrafoList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setTrafoList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    trafoList,
    loading,
    getTrafoList
  }
}

export default trafoApi