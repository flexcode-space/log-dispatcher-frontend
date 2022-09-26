import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/pembangkit'

const pembangkitApi = () => {
  const [pembangkitList, setPembangkitList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getPembangkitList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setPembangkitList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getPembangkitBySubsistemId = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const { data: { data } } = await Axios.get(`${endpoint}/sub-sistem/${id}`)
      setPembangkitList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    pembangkitList,
    loading,
    getPembangkitList,
    getPembangkitBySubsistemId
  }
}

export default pembangkitApi