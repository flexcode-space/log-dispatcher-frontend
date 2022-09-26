import { useCallback, useState } from 'react'
import { Axios } from '../axios'
import { Params } from '../types'

const endpoint = '/peralatan/reaktor'

const reaktorApi = () => {
  const [reaktorList, setReaktorList] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  const getReaktorList = useCallback(async (params: Params = {}) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(endpoint, { params })
      setReaktorList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const getReaktorBySubsistemId = useCallback(async (id: string) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(`${endpoint}/sub-sistem/${id}`)
      setReaktorList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    reaktorList,
    loading,
    getReaktorList,
    getReaktorBySubsistemId
  }
}

export default reaktorApi