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

  const getIbtDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
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

  const createIbt = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateIbt = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteIbt = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    ibtList,
    loading,
    getIbtList,
    getIbtBySubsistemId,
    createIbt,
    updateIbt,
    deleteIbt,
    getIbtDetail
  }
}

export default ibtApi