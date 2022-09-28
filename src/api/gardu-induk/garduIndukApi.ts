import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/gardu-induk'

const garduIndukApi = () => {
  const [garduIndukList, setGarduIndukList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getGarduIndukList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setGarduIndukList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    garduIndukList,
    loading,
    getGarduIndukList
  }
}

export default garduIndukApi