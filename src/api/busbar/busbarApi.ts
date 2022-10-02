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

  const getBusbarDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
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

  const createBusbar = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateBusbar = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteBusbar = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    busbarList,
    loading,
    getBusbarList,
    getBusbarBySubsistemId,
    getBusbarDetail,
    createBusbar,
    updateBusbar,
    deleteBusbar
  }
}

export default busbarApi