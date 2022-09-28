import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/ibt'

const ibtApi = () => {
  const [ibtList, setIbtList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getIbtList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setIbtList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  const getIbtBySubsistemId = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const { data: { data } } = await Axios.get(`${endpoint}/sub-sistem/${id}`)
      setIbtList(data || [])
    } catch (error) { }
    finally {
      setLoading(false)
    }
  }, [])


  return {
    ibtList,
    loading,
    getIbtList,
    getIbtBySubsistemId,
  }
}

export default ibtApi