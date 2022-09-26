import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/sub-sistem'

const subsistemApi = () => {
  const [subsistemList, setSubsistemList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getSubsistemList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setSubsistemList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    subsistemList,
    loading,
    getSubsistemList
  }
}

export default subsistemApi