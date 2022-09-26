import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/penghantar'

const penghantarApi = () => {
  const [penghantarList, setPenghantarList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getPenghantarList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setPenghantarList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    penghantarList,
    loading,
    getPenghantarList
  }
}

export default penghantarApi