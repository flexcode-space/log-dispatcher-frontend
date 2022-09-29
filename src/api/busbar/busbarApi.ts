import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/busbar'

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

  const getBusbarBySubsistemId = useCallback(async (id: string) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(`${endpoint}/sub-sistem/${id}`)
      setBusbarList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    busbarList,
    loading,
    getBusbarList,
    getBusbarBySubsistemId
  }
}

export default busbarApi