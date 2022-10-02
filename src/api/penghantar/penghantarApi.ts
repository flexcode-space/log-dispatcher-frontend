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

  const getPenghantarDetail = useCallback(async (id: String) => {
    setLoading(true)

    try {
      const { data } = await Axios.get(`${endpoint}/${id}`)
      return data
    } finally {
      setLoading(false)
    }
  }, [])

  const getPenghantarBySubsistemId = useCallback(async (id: string) => {
    setLoading(true)

    try {
      const { data: { data } } = await Axios.get(`${endpoint}/sub-sistem/${id}`)
      setPenghantarList(data || [])
    } finally {
      setLoading(false)
    }
  }, [])

  const createPenghantar = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.post(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePenghantar = useCallback(async (payload: any) => {
    setLoading(true)

    try {
      await Axios.put(endpoint, payload)
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePenghantar = useCallback(async (payload: any) => {
    setLoading(true)
    try {
      await Axios.delete(endpoint, { data: payload })
    } finally {
      setLoading(false)
    }
  }, [])


  return {
    penghantarList,
    loading,
    getPenghantarList,
    getPenghantarBySubsistemId,
    getPenghantarDetail,
    createPenghantar,
    updatePenghantar,
    deletePenghantar
  }
}

export default penghantarApi