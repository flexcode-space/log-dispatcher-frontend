import { useCallback, useState } from 'react'
import { Axios } from '../axios'

const endpoint = '/gardu-induk/upt'

const uptApi = () => {
  const [uptList, setUptList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getUPTList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await Axios.get(endpoint)
      setUptList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    uptList,
    loading,
    getUPTList,
  }
}

export default uptApi